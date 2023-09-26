locals {
  lambda_src_path = "${var.lambda_relative_path}/apis"
}

resource "null_resource" "build" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = <<EOT
export AWS_PROFILE=$PROFILE
cd $SRC_PATH
rm -rf .serverless
npm install
npx sls package --stage $STAGE --verbose
unzip -o .serverless/$LAMBDA_NAME.zip -d .serverless/src
EOT
    environment = {
      SRC_PATH      = local.lambda_src_path
      PROFILE       = var.profile_name
      LAMBDA_NAME   = var.function_name
      STAGE         = var.environment
    }
  }
}

data "archive_file" "lambda_package" {
  type        = "zip"
  source_dir  = "${local.lambda_src_path}/.serverless/src"
  output_path = "${local.lambda_src_path}/.serverless/${var.function_name}.zip"
  depends_on = [ null_resource.build ]
}

resource "aws_lambda_function" "lambda" {
  function_name    = "${var.project}-${var.environment}-${var.function_name}"
  role             = var.role
  filename         = data.archive_file.lambda_package.output_path
  source_code_hash = data.archive_file.lambda_package.output_base64sha256
  timeout          = var.timeout
  memory_size      = var.memory_size
  handler          = "src/functions/${var.function_name}/main.default"
  runtime          = var.runtime

  package_type = "Zip"

  tracing_config {
    mode = "PassThrough"
  }

  environment {
    variables = var.environment_variables
  }

  depends_on = [
    data.archive_file.lambda_package,
    null_resource.build
  ]
}

resource "aws_api_gateway_rest_api" "api" {
  count = var.enable_api_gateway ? 1 : 0
  name  = "${var.project}-${var.environment}-${var.function_name}-api"
  description = "API for ${var.function_name} lambda function"
  
  endpoint_configuration {
    types = ["EDGE"]
  }
}

resource "aws_api_gateway_resource" "resource" {
  count = var.enable_api_gateway ? 1 : 0
  rest_api_id = aws_api_gateway_rest_api.api[0].id
  parent_id   = aws_api_gateway_rest_api.api[0].root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  count = var.enable_api_gateway ? 1 : 0
  rest_api_id = aws_api_gateway_rest_api.api[0].id
  resource_id = aws_api_gateway_resource.resource[0].id
  http_method = var.api_method
  authorization = var.api_gateway_authorization
}

resource "aws_api_gateway_integration" "lambda" {
  count = var.enable_api_gateway ? 1 : 0
  rest_api_id = aws_api_gateway_rest_api.api[0].id
  resource_id = aws_api_gateway_resource.resource[0].id
  http_method = aws_api_gateway_method.proxy[0].http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn

  depends_on = [
    aws_lambda_function.lambda
  ]
}

resource "aws_lambda_permission" "apigw" {
  count = var.enable_api_gateway ? 1 : 0
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account_id}:${aws_api_gateway_rest_api.api[0].id}/*/${aws_api_gateway_method.proxy[0].http_method}${aws_api_gateway_resource.resource[0].path}"
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.api[0].id
  stage_name  = var.environment

  depends_on = [
    aws_api_gateway_method.proxy,
    aws_api_gateway_integration.lambda
  ]
}

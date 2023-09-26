terraform {
  source = "../../../../../common/modules//lambda_function"
}

locals {
  env_vars      = yamldecode(file(find_in_parent_folders("env.yaml")))
  account_vars  = yamldecode(file(find_in_parent_folders("account.yaml")))
  region_vars   = yamldecode(file(find_in_parent_folders("region.yaml")))
}

dependency "iam_role" {
  config_path = "../iam_role"
}

inputs = {
  function_name      = "say-hello"
  project            = local.env_vars.project
  environment        = local.env_vars.env
  role               = dependency.iam_role.outputs.role_arn
  enable_api_gateway = true
  region             = local.region_vars.aws_region
  account_id         = local.account_vars.aws_account_id
  api_method         = "POST"
  lambda_relative_path = "../../../../../../../../../../.."
  
  environment_variables = {
    "ENV": local.env_vars.env,
    "LOG_LEVEL": local.env_vars.env == "prod" ? "INFO" : "DEBUG",
  }
}

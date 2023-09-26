variable "project" {
  description = "The name of the project"
  type        = string
}

variable "function_name" {
  description = "The name of the Lambda function"
  type        = string
}

variable "role" {
  description = "IAM role attached to the Lambda Function"
  type        = string
}

variable "timeout" {
  description = "The amount of time your Lambda Function has to run in seconds"
  type        = number
  default     = 3
}

variable "runtime" {
  description = "The identifier of the function's runtime"
  type        = string
  default     = "nodejs18.x"
}

variable "memory_size" {
  description = "Amount of memory in MB your Lambda Function can use at runtime"
  type        = number
  default     = 128
}

# Optional API Gateway configuration
variable "enable_api_gateway" {
  description = "Whether to enable API Gateway integration"
  type        = bool
  default     = false
}

variable "api_method" {
  description = "The HTTP method to use for the API Gateway endpoint"
  type        = string
  default     = "ANY"
}

variable "api_gateway_authorization" {
  description = "The authorization type for the API Gateway method (e.g., NONE, AWS_IAM, CUSTOM, etc.)"
  type        = string
  default     = "NONE"
}

variable "region" {
  description = "The AWS region"
  type        = string
  default     = "us-east-1"
}

variable "account_id" {
  description = "The AWS account ID"
  type        = string
}

variable "environment" {
  description = "The environment (e.g., dev, prod)"
  type        = string
}

variable "environment_variables" {
  description = "Environment variables for the Lambda function"
  type        = map(string)
  default     = {}
}

variable "lambda_relative_path" {
  description = "The relative path to the Lambda function"
  type        = string
  default     = ""
}

variable "profile_name" {
  description = "The AWS profile name"
  type        = string
  default     = "personal"
}
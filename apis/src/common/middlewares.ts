import middy from '@middy/core'
import { Logger } from '@aws-lambda-powertools/logger'
import {
  type APIGatewayProxyEvent,
  type APIGatewayProxyResult,
  type Context
} from 'aws-lambda'

export const setLoggerContext = (
  logger: Logger
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before = (request: middy.Request): void => {
    const { context }: { context: Context } = request;
    logger.addContext(context)
  }

  return {
    before
  }
}

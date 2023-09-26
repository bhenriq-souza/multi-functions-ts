import { type APIGatewayProxyEvent, type APIGatewayProxyResult, type Context } from 'aws-lambda'

export interface IBaseHandler<THandlerProps> {
  props?: THandlerProps
  handler: (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult>
}

export abstract class BaseHandler<THandlerProps> implements IBaseHandler<THandlerProps> {
  props?: THandlerProps

  abstract handler (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>

  getHandler (): (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult> {
    return this.handler.bind(this)
  }
}

export interface IBaseController<TRequest, TResponse, TControllerProps> {
  props: TControllerProps
  handle: (request: TRequest) => Promise<TResponse>
}

import { type APIGatewayProxyEvent, type APIGatewayProxyResult } from 'aws-lambda'
import { type ISayHelloHandlerProps } from './interfaces'
import { BaseHandler } from '../../common'

export class SayHelloHandler extends BaseHandler<ISayHelloHandlerProps> {
  props: ISayHelloHandlerProps

  constructor (props: ISayHelloHandlerProps) {
    super()
    this.props = props
  }

  public async handler (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      if (event.body === null || event.body === undefined) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: 'Missing body'
          })
        }
      }
      
      const body = JSON.parse(event.body)

      this.props.logger?.info('Say Hello Function invoked', { body })

      this.props.logger?.debug('Calling Say Hello Controller')
      
      const response = await this.props.sayHelloController.handle(body)

      this.props.logger?.info(`Saying ${response.message}`)

      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        body: JSON.stringify(error)
      }
    }
  }
}

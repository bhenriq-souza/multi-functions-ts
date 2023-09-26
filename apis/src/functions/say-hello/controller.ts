import { type IBaseController } from '../../common'
import {
  type ISayHelloControllerProps,
  type ISayHelloRequest,
  type ISayHelloResponse
} from './interfaces'

export class SayHelloController implements IBaseController<
ISayHelloRequest,
ISayHelloResponse,
ISayHelloControllerProps
> {
  props: ISayHelloControllerProps

  constructor (props: ISayHelloControllerProps) {
    this.props = props
  }

  public async handle (request: ISayHelloRequest): Promise<ISayHelloResponse> {
    return await this.props.sayHelloService.sayHello(request)
  }
}

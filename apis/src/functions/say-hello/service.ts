import {
  type ISayHelloServiceProps,
  type ISayHelloRequest,
  type ISayHelloResponse
} from './interfaces'

export class SayHelloService {
  props: ISayHelloServiceProps
  
  constructor(props: ISayHelloServiceProps) {
    this.props = props
  }

  public async sayHello (request: ISayHelloRequest): Promise<ISayHelloResponse> {
    return {
      message: `Hello ${request.name}`
    }
  }
}

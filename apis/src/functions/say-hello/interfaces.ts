import { Logger } from '@aws-lambda-powertools/logger'
import type { SayHelloController } from './controller'
import type { SayHelloService } from './service'

export interface ISayHelloRequest {
  name: string
}

export interface ISayHelloResponse {
  message: string
}

export interface ISayHelloHandlerProps {
  sayHelloController: SayHelloController
  logger?: Logger
}

export interface ISayHelloControllerProps {
  sayHelloService: SayHelloService
  logger?: Logger
}

export interface ISayHelloServiceProps {
  logger?: Logger
}

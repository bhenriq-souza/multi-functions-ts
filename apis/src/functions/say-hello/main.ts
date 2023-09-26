import middy from '@middy/core'
import { SayHelloHandler } from './handler'
import { SayHelloService } from './service'
import { SayHelloController } from './controller'
import { CustomLogger, setLoggerContext } from '../../common'

const logger = new CustomLogger('say-hello').getLogger()

const controller = new SayHelloController({
  sayHelloService: new SayHelloService({
    logger
  })
})

const handler = new SayHelloHandler({
  sayHelloController: controller,
  logger
})

export default middy(handler.getHandler())
  .use(setLoggerContext(logger))

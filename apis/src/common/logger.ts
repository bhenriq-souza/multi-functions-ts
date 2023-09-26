import { LogFormatter, Logger } from '@aws-lambda-powertools/logger';
import { UnformattedAttributes } from '@aws-lambda-powertools/logger/lib/types';

function isLocal() {
  return process.env.IS_OFFLINE === 'true';
}

class LocalLogFormatter extends LogFormatter {
  public formatAttributes(attr: UnformattedAttributes) {
    return {
      logLevel: attr.logLevel,
      message: attr.message,
    };
  }
}

export class CustomLogger {
  logger: Logger | undefined = undefined;

  constructor(private readonly serviceName: string) {
    this.serviceName = serviceName;
  }
  
  getLogger(): Logger {
    if (!this.logger) {
      this.logger = new Logger({
        logFormatter: isLocal() ? new LocalLogFormatter() : undefined,
        serviceName: this.serviceName,
      })
    }

    return this.logger;
  }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
const logger_1 = require("@aws-lambda-powertools/logger");
function isLocal() {
    return process.env.IS_OFFLINE === 'true';
}
class LocalLogFormatter extends logger_1.LogFormatter {
    formatAttributes(attr) {
        return {
            logLevel: attr.logLevel,
            message: attr.message,
        };
    }
}
class CustomLogger {
    serviceName;
    logger = undefined;
    constructor(serviceName) {
        this.serviceName = serviceName;
        this.serviceName = serviceName;
    }
    getLogger() {
        if (!this.logger) {
            this.logger = new logger_1.Logger({
                logFormatter: isLocal() ? new LocalLogFormatter() : undefined,
                serviceName: this.serviceName,
            });
        }
        return this.logger;
    }
}
exports.CustomLogger = CustomLogger;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLoggerContext = void 0;
const setLoggerContext = (logger) => {
    const before = (request) => {
        const { context } = request;
        logger.addContext(context);
    };
    return {
        before
    };
};
exports.setLoggerContext = setLoggerContext;

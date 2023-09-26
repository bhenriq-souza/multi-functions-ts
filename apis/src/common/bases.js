"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandler = void 0;
class BaseHandler {
    props;
    getHandler() {
        return this.handler.bind(this);
    }
}
exports.BaseHandler = BaseHandler;

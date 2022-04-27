"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
class Container {
    constructor() {
        this.bindMap = new Map();
    }
    bind(identifier, classDefinition, constructorArgs) {
        this.bindMap.set(identifier, { classDefinition, constructorArgs });
    }
    get(identifier) {
        const target = this.bindMap.get(identifier);
        const { classDefinition, constructorArgs } = target;
        const instance = Reflect.construct(classDefinition, constructorArgs || {});
        return instance;
    }
    static instance() {
        if (!this._instance) {
            this._instance = new Container();
        }
        return this._instance;
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map
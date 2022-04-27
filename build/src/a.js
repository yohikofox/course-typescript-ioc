"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
const container_1 = require("./container");
class A {
    constructor() {
        const container = container_1.Container.instance();
        this.b = container.get('b');
    }
}
exports.A = A;
//# sourceMappingURL=a.js.map
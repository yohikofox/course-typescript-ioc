"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
const b_1 = require("./b");
const container_1 = require("./container");
const container = container_1.Container.instance();
container.bind('a', a_1.A);
container.bind('b', b_1.B, [10]);
const a = container.get('a');
console.log(a);
//# sourceMappingURL=index.js.map
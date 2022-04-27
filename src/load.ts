import * as fs from "fs";
import { ContainerInterface } from "./container";
import { CLASS_KEY } from "./provider";

export const load = (container: ContainerInterface) => {
    const list = fs.readdirSync("./src");
    for (const file of list) {
        if (/\.ts$/.test(file)) {
            const exports = require(`./${file}`);
            for (const m in exports) {
                const module = exports[m];
                if (typeof module === 'function') {
                    const metadata = Reflect.getMetadata(CLASS_KEY, module);
                    //Register module
                    if (metadata) {
                        container.bind(metadata.id, module, metadata.args);
                    }
                }
            }
        }
    }
}
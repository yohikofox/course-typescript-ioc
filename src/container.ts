import { PROPS_KEY } from "./inject";

export interface ContainerInterface {
    bind: (identifier: string, classDefinition: any, constructorArgs?: Array<any>) => void;
    get: <T>(identifier: string) => T
}

export class Container implements ContainerInterface {
    bindMap = new Map();
    static _instance: Container;

    bind(identifier: string, classDefinition: any, constructorArgs?: Array<any>) {
        this.bindMap.set(identifier, { classDefinition, constructorArgs });
    }

    get<T>(identifier: string): T {
        const target = this.bindMap.get(identifier);
        const { classDefinition, constructorArgs } = target;
        const props = Reflect.getMetadata(PROPS_KEY, classDefinition);
        const instance = Reflect.construct(classDefinition, constructorArgs || {});

        for (const property in props) {
            const identifier = props[property].value;
            instance[property] = this.get(identifier);
        }

        return instance as T;
    }

    static instance(): Container {
        if (!this._instance) {
            this._instance = new Container();
        }

        return this._instance;
    }
}
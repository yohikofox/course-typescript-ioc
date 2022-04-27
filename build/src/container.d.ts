export declare class Container {
    bindMap: Map<any, any>;
    static _instance: Container;
    bind(identifier: string, classDefinition: any, constructorArgs?: Array<any>): void;
    get<T>(identifier: string): T;
    static instance(): Container;
}

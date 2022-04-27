import 'reflect-metadata';

export const CLASS_KEY = 'ioc::tagged_class';

export const Provider = (identifier: string, args?: Array<any>) => {
    return (target: any) => {
        Reflect.defineMetadata(CLASS_KEY, {
            id: identifier,
            args: args || []
        }, target);
        return target;
    }
}
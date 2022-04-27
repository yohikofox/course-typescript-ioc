# How to setup

```bash
$ yarn init -y
$ yarn add typescript -D
$ yarn add gts
$ npx gts init
$ yarn add ts-node nodemon -D
```


Add a `nodemon.json` file : 

```json
{
    "watch": [
        "*.ts"
    ],
    "ext": "ts",
    "ignore": [
        "*.test.ts"
    ],
    "execMap": {
        "ts": "ts-node"
    }
}
```

Add to package.json the line below :

```json
{
    "script" : {
        "dev": "nodemon src/index.ts"
    }
}
```

Add to tsconfig.json the lines below : 
```json
{
    "compilerOptions": {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "strictPropertyInitialization": false
    }
}
```

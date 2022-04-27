Dans ce cours, vous allez apprendre les concepts de base de l'inversion de contrôle en `typescript`.


Mais avant, tout, quelques concepts de base :

## IoC

Selon wikipedia, l'inversion du contrôle, également connue sous le nom d'**IoC**, est un principe de conception dans la programmation orientée objet, qui est utilisée pour découpler le code.

Dans la programmation orientée objet traditionnelle, lorsqu'une classe dépend d'une autre classe, l'instance de l'autre classe est généralement créée à l'intérieur de cette classe. 

Ce faisant, cela conduit à des classes couplées (voir [le couplage](#le-couplage)) les unes aux autres, et plus les dépendances sont complexes, plus les couplages sont étroits, et par conséquent plus difficiles pour les modifications et les tests unitaires pour le code étroitement couplé. 

Les IoC sont dédiés à la création et à la recherche d'objets dépendants en fournissant un conteneur, et transmettent le contrôle des objets dépendants de l'intérieur de la classe au conteneur, donc, les classes sont découplées et garantissent que toutes les classes sont faciles à modifier.

## Le couplage

Qu'est-ce que le couplage ? Il est possible de l'expliquer par un simple exemple.

Prenons comme hypothèse de départ, deux classes `Service` et `Repository`, leurs relations de dépendance sont que `Service` dépend de `Repository`, noté `Service ⊥ Repository`.

Ce scénario est un classique au quotidien dans le développement. Nous pourrions implémenter cela comme ci-dessous :


```typescript
// src/repository.ts
export class Repository {}
```

```typescript
// src/service.ts
import { Repository } from "./repository";

export class Service {
    repository: Repository;
    constructor(){
        this.repository = new Repository();
    }
}
```

```typescript
// src/main.ts
import { Service } from "./service";

const service = new Service();
```


Par cet exemple, aucun souci d'algorithme, tout semble être bon. 

Mais que se passe-t'il si nous ajoutons un paramètre dans le constructor de Repository ?

```typescript
// src/repository.ts
export class Repository {
    private _connectionString: string;
    constructor(connectionString: string){
        this._connectionString = connectionString
    }
}
```

Si vous tentez de transpiler le code avec cette modification, vous aurez une erreur car lors de l'instanciation de Service, vous ne passerez plus les paramètres nécessaire à l'instanciation de Repository. La modification adéquat serait : 

```typescript
// src/service.ts
import { Repository } from "./repository";

export class Service {
    repository: Repository;
    constructor(connectionString: string){
        this.repository = new Repository(connectionString);
    }
}

// src/main.ts
import { Service } from "./service";

const service = new Service("mongodb://<username>:<password>@<host>:<port>");
```

Que se passe-t'il si nous nous rendons compte que le paramètre passé à Repository ne peut être un string mais un number ? Cela peut vite devenir fastidieux ! Imaginons ce problème dans des cas plus complexes et vous en conviendrez, cela devient très vite ingérable. C'est dans ce genre de cas que nous devons penser au découplage.

## Le découplage

Le découplage consiste justement à retirer les adhérences entre les objets. Le but recherché est d'éviter de donner, à une classe, la responsabilité d'instanciation de ses dépendances.

Pour notre cas, nous aurions :


```typescript
// src/service.ts
import { Repository } from "./repository";

export class Service {
    repository: Repository;
    constructor(repository: Repository){
        this.repository = repository;
    }
}
```

```typescript
// src/main.ts
import { Service } from "./service";
import { Repository } from "./repository";

const repository = new Repository("mongodb://<username>:<password>@<host>:<port>");
const service = new Service(repository);
```

Ici, c'est beaucoup mieux car Service n'a plus la responsabilité de l'instanciation de Repository. Nous sommes découplé.

Le problème qui se pose ici est que maintenant, toute la responsabilité se pose pour la fameuse classe Main, qui ne devrait pas connaître les instanciation de tous les objets.

Pour plus de clareté et de responsabilisation, il est d'usage de dédier cela à un Container.

## Conteneur

La notion de conteneur a ici pour but de référencer les informations nécessaires à instancier une dépendance.

```ts

export interface IContainer {
    bind: (identifier: string, classDefinition: function, constructorArgs: any[]) => void;
    get: <T>(identifier: string) => T;
}

export class Container implements IContainer {
    bindMap = new Map();

    /*
    *   Register instances
    */
    bind(identifier: string, classDefinition: function, constructorArgs: any[]){
        this.bindMap.set(identifier, {classDefinition, constructorArgs});
    }


    /*
    *   Retrieve an instance
    */
    get<T>(identifier: string): T {
        const {classDefinition, constructorArgs} = this.bindMap.get(identifier);
        return Reflect.construct(classDefinition, constructorArgs) as T;        
    }
}
```
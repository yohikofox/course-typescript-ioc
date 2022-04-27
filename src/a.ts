import { B } from "./b";
import { Inject } from "./inject";
import { Provider } from "./provider";

@Provider('a')
export class A {
    @Inject()
    private b: B;
}
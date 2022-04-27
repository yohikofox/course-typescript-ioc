import { Container } from "./container";
import { load } from "./load";

const container = Container.instance();
load(container);

const a = container.get('a');

console.log(a)
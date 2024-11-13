import { getContext, onDestroy, setContext } from "svelte";

type Nil = null | undefined;

function isNil(v: unknown): v is Nil {
  return v == null;
}

function never(msg = ""): never {
  throw new Error(msg || "Unexpected state encountered");
}

export interface Class<T> extends Function {
  new (...args: any[]): T;
}

type ValueProvider<T> = { token: Class<T>; value: T };
type ClassProvider<T> = { token: Class<T>; class?: Class<T> };
type FactoryProvider<T> = { token: Class<T>; factory: () => T };

function isValueProvider<T>(p: Provider<T>): p is ValueProvider<T> {
  return !!("value" in p);
}

function isFactoryProvider<T>(p: Provider<T>): p is FactoryProvider<T> {
  return !!("factory" in p);
}

export type Provider<T> =
  | ValueProvider<T>
  | ClassProvider<T>
  | FactoryProvider<T>;

class Injector<T> {
  private instance: T | Nil = void 0;
  private live = 0;

  constructor(readonly provider: Provider<T>) {}

  getInstance(): T {
    if (!this.instance) {
      if (isValueProvider(this.provider)) {
        this.instance = this.provider.value;
      } else if (isFactoryProvider(this.provider)) {
        this.instance = this.provider.factory();
      } else {
        this.instance = new this.provider.token();
      }
      this.live = 0;
    }
    this.live++;
    return this.instance;
  }

  destroyInstance() {
    if (this.live === 1) {
      this.instance = void 0;
    }
    this.live--;
  }
}

export function provide<T>(provider: Provider<T>): void {
  const token = provider.token;
  let injector = getContext(token) as Injector<T> | Nil;
  if (!isNil(injector)) {
    never(`Dependency "${token.name}" is already registered`);
  }
  setContext(token, new Injector(provider));
}

export function inject<T>(token: Class<T>): T {
  const injector = getContext(token) as Injector<T> | Nil;

  if (isNil(injector)) {
    never(`Dependency "${token.name}" was not provided`);
  }

  onDestroy(() => injector.destroyInstance());

  return injector.getInstance();
}

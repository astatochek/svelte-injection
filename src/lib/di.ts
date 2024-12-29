import { getContext, onDestroy, setContext } from "svelte";

type Nil = null | undefined;

class None {
  static isNone(v: unknown): v is None {
    return v instanceof None;
  }
}

function isNil(v: unknown): v is Nil {
  return v == null;
}

function never(msg = ""): never {
  throw new Error(msg || "Unexpected state encountered");
}

export class Token<T> {
  constructor(private factory: () => T) {}

  createInjecor(): Injector<T> {
    return new Injector(this.factory);
  }
}

export function injectable<T>(factory: () => T): Token<T> {
  return new Token(factory);
}

class Injector<T> {
  private instance: T | None = new None();
  private count = 0;
  constructor(private factory: () => T) {}

  inject(): T {
    if (None.isNone(this.instance)) {
      this.instance = this.factory();
      this.count = 0;
    }

    this.count++;

    onDestroy(() => {
      this.count--;
      if (this.count === 0) {
        this.instance = new None();
      }
    });
    return this.instance;
  }
}

export function inject<T>(token: Token<T>): T {
  const injector = getContext(token) as Injector<T> | Nil;

  if (isNil(injector)) {
    never(`Dependency was not provided`);
  }

  return injector.inject();
}

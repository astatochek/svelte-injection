import { injectable } from "./di";

export class Counter {
  private value = $state(0);

  getValue() {
    return this.value;
  }

  increment = () => {
    this.value++;
  };

  decrement = () => {
    this.value--;
  };
}

export const CounterToken1 = injectable(() => new Counter());
export const CounterToken2 = injectable(() => new Counter());

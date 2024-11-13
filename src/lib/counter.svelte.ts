export class Counter {
  private value = $state(0)

  getValue() {
    return this.value
  }

  increment = () => {
    this.value++
  }

  decrement = () => {
    this.value--
  }
}

<script lang="ts">
  import { inject } from "$lib";
  import { CounterToken2, CounterToken1 } from "$lib/counter.svelte";

  const counter1 = inject(CounterToken1);
  const counter2 = inject(CounterToken2);
</script>

<button onclick={counter1.increment}>{counter1.getValue()}</button>
<button onclick={counter2.increment}>{counter2.getValue()}</button>

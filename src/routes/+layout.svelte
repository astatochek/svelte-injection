<script lang="ts">
  import { Provide } from "$lib";
  import { CounterToken1, CounterToken2 } from "$lib/counter.svelte";
  import "../app.css";
  let { children } = $props();
</script>

<Provide for={CounterToken2}>
  <Provide for={CounterToken1}>
    {@render children()}
  </Provide>
</Provide>

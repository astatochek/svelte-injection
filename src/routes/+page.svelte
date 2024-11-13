<script lang="ts">
    import { inject } from "$lib";
    import { Counter } from "$lib/counter.svelte";

  const counter = inject(Counter)
</script>

<button onclick={counter.increment}>{counter.getValue()}</button>

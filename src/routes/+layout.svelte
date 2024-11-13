<script lang="ts">
    import { Provide } from "$lib";
    import { Counter } from '$lib/counter.svelte';
    import '../app.css';
	let { children } = $props();

</script>

<Provide token={Counter} value={new Counter()}>
    {@render children()}
</Provide>

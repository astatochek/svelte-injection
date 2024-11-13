<script lang='ts' generics="T extends any">
    import type { Snippet } from "svelte";
    import { type Provider, provide } from "./di";

  let {children, ...provider}: Provider<T> & { children: Snippet }  = $props()

  provide(provider)
</script>

{@render children()}

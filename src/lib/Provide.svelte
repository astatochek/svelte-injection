<script lang="ts" generics="T extends any">
  import { setContext, type Snippet } from "svelte";
  import { type Token } from "./di";

  let { children, for: token }: { for: Token<T> } & { children: Snippet } =
    $props();

  setContext(token, token.createInjecor());
</script>

{@render children()}

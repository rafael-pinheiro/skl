<script lang="ts">
  import { onMount } from "svelte";
  import List from "./List.svelte";
  import { getQuery, setup } from "./editor";
  import { send } from "../../framework/data-server";

  const handleClick = () => {
    send("sql/run", getQuery());
  };

  onMount(setup);
</script>

<div class="flex flex-col p-5 h-screen gap-4">
  <div
    class="relative bg-white border-2 border-10 rounded h-40 overflow-y-auto"
  >
    <div id="editor" class="h-full cursor-text" />
    <button
      class="absolute bottom-2 right-2 bg-10 text-white px-2 py-1 rounded"
      on:click={handleClick}>Send</button
    >
  </div>
  <List />
</div>

<style>
  :global(.cm-editor) {
    height: 100%;
  }
</style>

<script lang="ts">
  import type { WritableAtom } from "nanostores";
  import { JSONEditor } from "svelte-jsoneditor";
  import { listen } from "../../framework/data-server";
  import Database from "../icons/Database.svelte";

  const data = listen("sql/run", []) as WritableAtom<unknown[]>;
</script>

<section class="relative flex flex-col h-5/6">
  <div
    class="absolute bottom-0 left-0 right-0 text-[500px] text-10 flex justify-center items-center opacity-10 -z-10"
  >
    <Database />
  </div>
  <div class="flex flex-col h-full overflow-y-scroll gap-6">
    {#each $data as row}
      <article class="json-viewer">
        <JSONEditor
          readOnly
          content={{
            json: row,
          }}
        />
      </article>
    {/each}
  </div>
</section>

<style>
  .json-viewer {
    --jse-theme-color: theme(colors.30);
    --jse-theme-color-highlight: theme(colors.10);
    --jse-button-primary-background: theme(colors.10);
    --jse-button-primary-background-highlight: theme(colors.10);
  }
</style>

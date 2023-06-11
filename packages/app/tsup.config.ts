import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/bootstrap/main.ts", "src/bootstrap/renderer.ts"],
  external: ["electron", "data-server"],
});

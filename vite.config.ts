import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import tsconfigPaths from "vite-tsconfig-paths"

import { tanstackRouter } from "@tanstack/router-plugin/vite"

import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const config = defineConfig({
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    viteReact(),
  ],
  optimizeDeps: {
    include: ["use-sync-external-store/shim", "use-sync-external-store/shim/with-selector"],
  },
})

export default config

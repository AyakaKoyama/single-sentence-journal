import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import env from "vite-plugin-env-compatible";
import { defaultConfig, getColorModeScript } from "@yamada-ui/react";

//プラグイン追加
function injectScript(): Plugin {
  return {
    name: "vite-plugin-inject-scripts",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transformIndexHtml(html, ctx) {
      const content = getColorModeScript({
        initialColorMode: defaultConfig.initialColorMode,
      });

      return html.replace("<body>", `<body><script>${content}</script>`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    env({ prefix: "VITE", mountedPath: "process.env" }),
    injectScript(),
  ],
});

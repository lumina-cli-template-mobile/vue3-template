import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), commonjs()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/scss/common.scss";',
      },
    },
  },
});

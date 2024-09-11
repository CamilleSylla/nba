import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const prod = command === "build";
  return {
    plugins: [react()],
    base: !prod ? "/" : "/nba/",
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
  };
});

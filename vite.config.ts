import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        onSuccess: ({ page }) => {
          console.log(`Rendered ${page.path}!`);
        },
      },
      pages: [
        {
          path: "/",
          prerender: {
            enabled: true,
            outputPath: "/index.html",
          },
        },
      ],
      react: {
        babel: {
          plugins: [
            [
              "babel-plugin-react-compiler",
              {
                target: "19",
              },
            ],
          ],
        },
      },

      tsr: {
        quoteStyle: "double",
        semicolons: true,
        // verboseFileRoutes: false,
      },

      // https://tanstack.com/start/latest/docs/framework/react/hosting#deployment
      target: "netlify",
    }),
  ],
});

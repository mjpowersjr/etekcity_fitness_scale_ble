import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/etekcity-scale-card.ts",
  output: {
    file: "../custom_components/etekcity_fitness_scale_ble/frontend/etekcity-scale-card.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json",
      clean: true,
    }),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};

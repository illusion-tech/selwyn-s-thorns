import { nodeResolve } from "@rollup/plugin-node-resolve";
import { swc } from "rollup-plugin-swc3";
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
    input: "src/main.ts",
    plugins: [swc(), nodeResolve()],
    output: {
        file: "dist/bundle.rollup.js",
    },
};
export default config;

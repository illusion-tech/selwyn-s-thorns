// import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
    input: "src/main.ts",
    plugins: [typescript() /*, nodeResolve() */],
    output: {
        file: "dist/bundle.rollup.js",
    },
};
export default config;

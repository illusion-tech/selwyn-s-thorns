import { swc } from "rollup-plugin-swc3";
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
    input: "src/main.ts",
    plugins: [swc()],
    output: {
        file: "dist/bundle.rollup.js",
    },
};
export default config;

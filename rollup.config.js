import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";

const config = {
    input: "src/index.js",
    external: ["react"],
    output: {
        format: "cjs",
        name: "index",
        globals: {
            react: "React"
        }
    },
    plugins: [
        resolve({
            browser: true
        }),
        babel({
            exclude: "node_modules/**",
        }),
        commonjs({
            include: "node_modules/**",
        }),
        json()
    ],
};

export default config;

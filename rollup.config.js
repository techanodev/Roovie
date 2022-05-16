import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

export default {
    entry: "./src/scripts/scripts.js",
    dest: "server_production.js",
    plugins: [babel(babelrc())],
};

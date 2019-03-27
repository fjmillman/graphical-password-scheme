import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'es',
        sourceMap: true,
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        externalHelpers: false,
        runtimeHelpers: true,
      }),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
    ],
  },
];

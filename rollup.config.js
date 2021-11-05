import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';

const pkg = require('./package.json');

const internals = ['prismjs', 'commonmark'];

const primsending = `Prism.plugins.fileHighlight.highlight.apply(this, arguments);
};

}());`;

export default {
  input: `src/index.ts`,
  output: [{ dir: 'dist', format: 'es', sourcemap: true }],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash-es')
  external: [
    ...Object.keys(pkg.dependencies).filter(d => !internals.includes(d)),
    /lit/
  ],
  watch: {
    include: 'src/**',
    clearScreen: false,
  },
  plugins: [
    replace({
      'window.customElements.define': '',
      delimiters: ['', ''],
    }),
    typescript({
      target: 'es6',
    }),
    resolve({
      browser: true,
      exportConditions: ['require', 'default'],
    }),
    commonjs(),
  ],
};

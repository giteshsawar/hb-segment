const { build } = require('estrella');

build({
  entry: './src/index.ts',
  outfile: './build/index.js',
  platform: 'node',
  bundle: true,
  minify: true,
  run: false
});

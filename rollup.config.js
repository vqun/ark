import babel from 'rollup-plugin-babel'

module.exports = [{
  input: 'src/Ark.js',
  output: [{
    file: 'lib/index.js',
    format: 'umd',
    name: 'Ark'
  }],
  plugins: [babel()]
}]
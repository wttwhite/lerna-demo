import fs from 'fs';
import generateConfig from './generate-config.js';
const packList = []

export default () => {
  // input: 'src/index.js',
  // output: {
  //   file: 'dist/bundle.js', // rollup支持的多种输出格式(有amd,cjs, es, iife 和 umd)
  //   format: 'iife',
  // },
  let configs =[];
  for (const name of fs.readdirSync('packages')) {
    if (packList.length) {
      if (!packList.includes(name)) continue;
    }
    configs = configs.concat(generateConfig(name));
  }
  return configs;
}
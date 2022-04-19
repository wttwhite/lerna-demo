/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import fs from 'fs';
import { terser } from 'rollup-plugin-terser'; // 压缩 js 代码
import VuePlugin from 'rollup-plugin-vue2'; //要用rollup-plugin-vue2，rollup-plugin-vue引用报错
import babel from 'rollup-plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const generateConfig = name => {
  let config = [];

  // 判断是否存在 ts 入口文件
  if (fs.existsSync(`packages/${name}/src/index.js`)) {
    config = genereteJsConfig(name);
  }

  return config;
};

const genereteJsConfig = name => {
  const paths = {
    input: `packages/${name}/src/index.js`,
    output: `packages/${name}/lib`
  };
  // 不需要提示的警告码
  const unwarnCode = [
    'CIRCULAR_DEPENDENCY', // 循环依赖
    'UNRESOLVED_IMPORT', // 未解析的依赖项（https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency）
    'THIS_IS_UNDEFINED', // 引用未定义（https://rollupjs.org/guide/en/#error-this-is-undefined）
    'EMPTY_BUNDLE' // scss 必定会报的警告，不知道什么问题
  ];

  // 拦截警告信息
  const onwarn = (warning, rollupWarn) => {
    // 跳过不需要提示的警告
    if (!unwarnCode.includes(warning.code)) {
      // console.warn(warning.code);
      rollupWarn(warning);
    }
  };
  // plugins 需要注意引用顺序
  const getPlugins = format => {
    // 是否为 umd 打包方式
    const isUmd = format === 'umd';
    return [
      isUmd && terser(),
      VuePlugin({
        cssModulesOptions: {
          generateScopedName: '[local]___[hash:base64:5]'
        },
        compileTemplate: true
      }),
      babel({
        runtimeHelpers: true,
        // 只转换源代码，不运行外部依赖
        exclude: 'node_modules/**',
        // babel 默认不支持 ts 需要手动添加
        extensions: [...DEFAULT_EXTENSIONS, '.ts']
      }),
    ];
  };

  // rollup 配置项
  const rollupConfig = [
    {
      input: paths.input,
      // 输出 es 规范的代码
      output: {
        file: path.join(paths.output, name+'.js'),
        format: 'es',
        name,
        globals: {
          vue: 'vue',
          axios: 'axios'
        }
      },
      external: ['vue', 'axios'], // 指出应将哪些模块视为外部模块
      plugins: getPlugins(),
      onwarn
    },
    {
      input: paths.input,
      // umd 打包
      output: {
        file: path.join(paths.output, 'index.umd.min.js'),
        format: 'umd',
        name,
        globals: {
          vue: 'vue',
          axios: 'axios'
        }
      },
      external: ['vue', 'axios'], // 指出应将哪些模块视为外部模块
      plugins: getPlugins('umd'),
      onwarn
    }
  ];
  return rollupConfig;
};

export default generateConfig;

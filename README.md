# lerna-demo
`npm install -g @vue/cli`
`vue create vue2-cli-lerna`
`npm i lerna --save-dev`
新建packages文件夹
新建lerna.json
```json
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0",
  "useWorkspaces": true
}
```
package.json中增加
```json
"workspaces": [
    "packages/*"
  ],
```
`lerna create demoComponent`

增加rollup打包配置

下载`npm i rollup-plugin-vue2  rollup-plugin-babel @babel/core  @vue/compiler-sfc -S`


https://www.jianshu.com/p/464e2bb58eda

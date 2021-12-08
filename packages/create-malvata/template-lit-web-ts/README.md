# template



### 开始
> npm i

> npm run build
### 关于多语言

多语言基于lit的多语言插件@lit/localize-tools，流程如下

- 如果代码中有多语言标记变更
npm run local-xliff，否则跳过

- 首次构建执行 npm run local-build，生成多语言脚本，否则跳过

- 构建执行 npm run build
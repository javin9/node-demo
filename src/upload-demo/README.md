
## Koa+Element-ui基于stream进行文件上传和下载

### Demo
```bash
#启动
node ./src/upload-demo/index.js

# 访问
# http://localhost:3000
```

### 上传文件
要实现文件上传或下载肯定是需要使用post请求，以前我们使用 `koa-bodyparser`这个插件来解析post请求的。另一个插件 `koa-body`  
插件
- koa
- koa-body    解析Post请求
- koa-static  解析静态目录资源
- koa-router  解析路由
- fs-extra    
- element-ui  上传组件el-upload

经历一下步骤
-  上传页面
-  上传接口
-  读取文件流
-  生成文件保存路径
-  创建写文件流
-  检查目标文件夹存在
-  写入文件流 piple


### 下载文件（未完待续）
插件
- koa-send

### 参考文献
[koa2基于stream(流)进行文件上传和下载](https://www.cnblogs.com/tugenhua0707/p/10828869.html)
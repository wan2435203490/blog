# wan blog
# [个人博客](https://2fun.top)

## 本地测试
```shell
npm run serve
```

## 打包
```shell
npm run build

tar -zcvf blog-front.tar.gz ./dist
```

## 部署
```shell
#压缩文件上传到服务器配置的nginx目录
cd /var/www/blog/html

tar -zxvf blog-front.tar.gz

#自己修改nginx重启命令
ng restart
```


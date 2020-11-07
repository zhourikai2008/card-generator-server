1.安装项目node依赖包
```shell
npm install
```

2.全局安装pkg
```shell
npm install pkg -g
```

3.项目打包
```shell
pkg -t linux package.json
````
3.1.项目打包若提示错误
Error! No available node version satisfies 'node11'

3.2.执行脚本
```shell
pkg -t node8-linux package.json
```

4.mongodb 配置
```mongo
#创建iv数据库
use iv
db.createCollection("files")
db.files.save({"name" : "local", "type": "local", "dir": true, "output": true, "_id": "local"})
#创建user集合
db.createCollection("user")
#添加账号密码
db.user.insert({"username": "admin", "password" : "admin"})
db.user.insert({"username": "root", "password" : "www.imperial-vision.com"})
#创建version集合
db.createCollection("version")
db.getCollection("version").insert({"_id": 1, "value" : "V1.0.1"})
```
4.1 mongodb远程连接失败
```
1) 在mongodb配置文件中将bind_ip值由127.0.0.1设为0.0.0.0表示由只允许本地连接改为允许所有连接。
2) 重启mongo服务
```
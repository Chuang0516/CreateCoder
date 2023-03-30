FROM node:16-slim

# 定义工作目录
WORKDIR /user/src/app

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/

# 将本地代码复制到工作目录内
COPY ./ ./

# npm 安装依赖
RUN npm install

# 安装 pm2
RUN npm install pm2 -g

# 启动服务
CMD pm2-runtime 'npm start'
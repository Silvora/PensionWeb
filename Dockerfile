# 使用 Node.js 18 的官方镜像作为基础镜像
FROM node:18 as build-stage


# 设置工作目录
WORKDIR /PensionWeb


# 复制项目文件到工作目录
COPY . .

RUN npm cache clean --force

#docker push your-username/vue-app
# 安装项目依赖
RUN npm install .


# 构建 Vue 项目
RUN npm run build 


# 阶段 2: 以构建产物为基础，运行 Nginx 服务器
# 使用 Nginx 镜像作为生产阶段的基础镜像
FROM nginx:stable-alpine as production-stage



# 从构建阶段拷贝构建产物到 Nginx 服务器的服务目录
COPY --from=build-stage /PensionWeb/dist /usr/share/nginx/html

# 替换默认的 Nginx 配置文件
COPY --from=build-stage /PensionWeb/nginx.conf /etc/nginx/conf.d/default.conf


# 暴露80端口
EXPOSE 12233

# 启动Nginx服务器
CMD ["nginx", "-g", "daemon off;"]


# docker build -t registry.ap-southeast-1.aliyuncs.com/whispora/pension:latest .






FROM node:current-alpine
COPY . /data
WORKDIR /data/
RUN npm prune && npm install && npm run build && find ! -regex ^\.\/dist.* -delete

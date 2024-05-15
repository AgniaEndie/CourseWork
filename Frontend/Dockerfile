FROM node:latest as development
LABEL authors="agniaendie"

COPY . tmp
WORKDIR /tmp

COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json

RUN npm install

ENV CI=true
ENV PORT=3000

FROM development AS build

RUN npm run build

FROM development AS dev-envs
RUN <<EOF
apt-get update
apt-get install -y git
EOF

RUN <<EOF
useradd -s /bin/bash
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

FROM nginx:1.13-alpine
RUN rm -R /usr/share/nginx/html
COPY --from=build /tmp/dist /usr/share/nginx/html
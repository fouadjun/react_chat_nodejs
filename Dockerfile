FROM node:12-alpine
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
#COPY . /home/node/app
RUN apk --no-cache add python make g++
RUN npm install

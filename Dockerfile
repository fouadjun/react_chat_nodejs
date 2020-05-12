FROM node:12-alpine
WORKDIR /home/node/app
COPY . /home/node/app
RUN ls -al
RUN apk --no-cache add python make g++ && apk add bash
#RUN npm install

FROM node:16.17.1

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install

CMD "node" "sqsDispatch.js"
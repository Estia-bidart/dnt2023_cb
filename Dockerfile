FROM node:16

ADD . /app
WORKDIR /app

RUN npm install

EXPOSE 12000
CMD npm run start
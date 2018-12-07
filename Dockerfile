FROM node:dubnium

WORKDIR /nest-server

COPY . .

RUN yarn install


CMD ["yarn", "start"]

FROM node:9

WORKDIR /nest-server

COPY . .

RUN yarn install \


CMD ["yarn", "server:start"]
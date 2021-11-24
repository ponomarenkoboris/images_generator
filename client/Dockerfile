FROM node:lts

WORKDIR /client
COPY package.json /client/
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:server"]
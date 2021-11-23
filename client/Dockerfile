FROM node:lts

WORKDIR /client

COPY . /client/
RUN yarn && yarn build

EXPOSE 3000

CMD ["node", "clientServer.js"]
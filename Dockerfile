FROM node:latest

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /src

RUN yarn build

EXPOSE 8000

ENTRYPOINT ["yarn"]

CMD ["start"]
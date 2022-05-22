FROM node:latest

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn javascript
RUN yarn gulp

EXPOSE 3000

ENTRYPOINT ["yarn"]

CMD ["start"]
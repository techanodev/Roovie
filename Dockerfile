FROM node:latest

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn sass
RUN yarn javascript
RUN yarn build
RUN cp -r ./src/views ./build/views

EXPOSE 8000

ENTRYPOINT ["yarn"]

CMD ["start"]
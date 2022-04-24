FROM node:17-alpine as build
WORKDIR /app
COPY package*.json yarn.lock .env ./
RUN yarn install
COPY . .
RUN yarn build
# production:  && yarn install --production

FROM node:17-alpine as main
WORKDIR /app
COPY --from=build /app /app
ENV PORT=8080 NODE_ENV=production
EXPOSE 8080
CMD [ "node", "dist/bootstrap.js", "--server" ]
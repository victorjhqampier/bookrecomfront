#FROM node:16.15.1
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
# COPY package.json ./
RUN npx browserslist@latest --update-db
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "serve" ]

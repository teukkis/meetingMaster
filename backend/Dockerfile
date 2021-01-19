FROM node:14

WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8111
CMD [ "node", "src/index.js" ]

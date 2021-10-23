FROM node:14.18.1 AS development

WORKDIR /app/client
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/client/package.json
RUN npm install --only=development
COPY . /app/client
RUN npm run build

CMD ["npm", "start"]
FROM node:14.18.1 AS development

WORKDIR /app
COPY ./package.json ./
RUN npm install --only=development
COPY . .
RUN npm run build
  
CMD ["node", "dist/main"]
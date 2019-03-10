FROM node:latest

WORKDIR /app

COPY ./ /app 

RUN npm install

RUN ls -al

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:docker" ]
FROM node:12.18.1
EXPOSE 3000

WORKDIR /home/ltdat6499/tvn-learning

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ]
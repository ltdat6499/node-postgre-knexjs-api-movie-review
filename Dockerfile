FROM node:12
WORKDIR /home/ltdat6499/tvn-learning
COPY package*.json ./
RUN npm install

EXPOSE 3000	
CMD [ "node", "index.js" ]		

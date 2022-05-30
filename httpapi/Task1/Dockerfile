FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

RUN npm install


# Bundle app source
COPY . .
# To open the Specific port for the http
EXPOSE 8080 
# command to activate the api server.
CMD [ "node", "server.js" ]
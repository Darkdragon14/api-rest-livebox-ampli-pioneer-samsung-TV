FROM hypriot/rpi-node
RUN apt-get update
RUN apt-get install -y telnet
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
#Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]



FROM hypriot/rpi-node
RUN apt-get update
RUN apt-get install -y libusb-dev libdbus-1-dev libglib2.0-dev libudev-dev libical-dev libreadline-dev bluez
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
#Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]
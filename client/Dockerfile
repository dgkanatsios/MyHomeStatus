FROM resin/raspberrypi3-node
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN chmod +x start.sh
RUN npm install -g forever
CMD ["./start.sh"]
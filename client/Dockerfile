FROM hypriot/rpi-node:8.1
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN chmod +x start.sh
CMD ["./start.sh"]
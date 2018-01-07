[![unofficial Google Analytics for GitHub](https://gaforgithub.azurewebsites.net/api?repo=MyHomeStatusClient)](https://github.com/dgkanatsios/gaforgithub)
# MyHomeStatus Client

Node.js script for MyHomeStatus client. 

If you want to run the app standalone

```bash
npm install -g forever
npm install
export DEVICE_CREDENTIAL=<your device credential>
export SERVER_URL=<your url>
chmod +x start.sh
./start.sh
```

If you want to use Hue related sensors, do not forget to set HUE_HOST and HUE_USER environmental variables.

Also, if you want this to run at boot, use [crontab](https://www.raspberrypi.org/documentation/linux/usage/cron.md).

However, I'd recommend to run this via Docker image. To accomplish this, follow the instructions

Build Docker image from your development machine
```bash
export DOCKERUSERNAME=<your Docker Hub username>
export CLIENT_VERSION=<your image version>
docker build -t $DOCKERUSERNAME/myhomestatusclient:$VERSION .
docker push $DOCKERUSERNAME/myhomestatusclient:$VERSION
```

To have env variables set automatically at boot, create a new file in /etc/profile.d/

Install [Docker for Raspberry Pi](https://www.raspberrypi.org/blog/docker-comes-to-raspberry-pi/)

Run these commands on your Raspberry Pi
```bash
export DEVICE_CREDENTIAL=<your device credential>
export SERVER_URL=<url where your server app/container is set up>
export HUE_USER=<Philips Hue user>
export HUE_HOST=<Philips Hue Host IP>
export HUE_GROUPID=<Philips Hue Group ID>
docker run -d --restart always --privileged -e DEVICE_CREDENTIAL=$DEVICE_CREDENTIAL -e HUE_USER=$HUE_USER -e HUE_HOST=$HUE_HOST -e HUE_GROUPID=$HUE_GROUPID -e SERVER_URL=$SERVER_URL --name myhomestatusclient $DOCKERUSERNAME/myhomestatusclient:$CLIENT_VERSION
```

To use /dev (and see I2C devices), you need to run with --privileged [link](https://stackoverflow.com/questions/40265984/i2c-inside-a-docker-container)

If you want the env variables to be set at boot in your Raspberry Pi, write a shell script and place it on /etc/profile.d/ directory.
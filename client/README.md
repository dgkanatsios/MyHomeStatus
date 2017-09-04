# MyHomeStatus Client

Node.js script for MyHomeStatus client. 

Install [Docker for Raspberry Pi](https://www.raspberrypi.org/blog/docker-comes-to-raspberry-pi/)

```bash
npm install -g forever
npm install
export DEVICE_CREDENTIAL=<your device credential>
export SERVER_URL=<your url>
chmod +x start.sh
./start.sh
```

If you want to use Hue related sensors, do not forget to set HUE_HOST and HUE_USER environmental variables.

If you want this to run at boot, use [crontab](https://www.raspberrypi.org/documentation/linux/usage/cron.md).

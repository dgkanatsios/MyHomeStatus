#!/bin/bash
#needed to set up environment variables if running locally
#source ~pi/.bash_profile 

#running in the background
#forever start -o /app/out.log -e /app/err.log /app/index.js

#Docker needs this to run in the foreground
forever -o /app/out.log -e /app/err.log /app/index.js
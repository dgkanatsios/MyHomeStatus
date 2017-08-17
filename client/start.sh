#!/bin/bash
source ~pi/.bash_profile
forever start -o /app/out.log -e /app/err.log -l /app/log.log /app/index.js

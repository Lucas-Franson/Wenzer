#!/bin/bash
set -e
cd /home/ec2-user/Wenzer_Project/wenzer_back
git pull https://github.com/Lucas-Franson/Wenzer.git
npm install
ENV_PROD=somethingnew pm2 restart server --update-env
pm2 save


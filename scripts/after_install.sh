#!/bin/bash
set -e
cd /home/ec2-user/Wenzer_Project/wenzer_back
git pull https://github.com/Lucas-Franson/Wenzer.git
npm install
pm2 restart $home/Wenzer_Project/wenzer_back/src/server.js --update-env
pm2 save


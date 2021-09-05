#!/bin/bash
set -e
cd /home/ec2-user/Wenzer_Project/wenzer_back
git pull https://github.com/Lucas-Franson/Wenzer.git
npm install
pm2 start /home/ec2-user/Wenzer_Project/wenzer_back/src/server.js
pm2 save


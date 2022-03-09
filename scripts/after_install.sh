#!/bin/bash
set -e
cd /home/ec2-user/Wenzer_Project/wenzer_back
npm install
pm2 start /home/ec2-user/Wenzer_Project/wenzer_back/dist/src/server.js -f
pm2 save
pm2 restart 0
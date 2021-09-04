#!/bin/bash
set -e
cd /home/ec2-user/Wenzer_Project/wenzer_back
git pull
npm install
pm2 restart server


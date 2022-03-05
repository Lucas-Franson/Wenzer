#!/bin/bash
set -e
#yum update -y
pm2 update
cd /home/ec2-user/Wenzer_Project/wenzer_back
git pull https://github.com/Lucas-Franson/Wenzer.git
sudo rm -rf node_modules

#!/bin/sh
set -e
sed -i "s#http://localhost:8043#${PUBLISHER_ADDR}#" demo/bigbuckbunny/demo.js
exec npm start

# example.sh

# this shell script will download and run a web-demo of uglifyjs-lite as a standalone app

# 1. download standalone app
curl -O https://kaizhu256.github.io/node-uglifyjs-lite/build..beta..travis-ci.org/app/assets.app.js
# 2. run standalone app
PORT=8081 node ./assets.app.js
# 3. open a browser to http://127.0.0.1:8081 and play with the web-demo
# 4. edit file assets.app.js to suit your needs

#!/bin/sh

# Function that (re)starts Mockoon with demo.json
start_server() {
  kill -9 $(lsof -ti :3000)
  NODE_OPTIONS="--require $(pwd)/mockoon-hbs-preload.js" \
  npx mockoon-cli start -d demo.json -p 3000 &
  pid="$!"
}

# First launch
start_server

# Now watch demo.json; when it’s modified, kill/restart
while inotifywait -e modify demo.json; do
  echo "[watcher] demo.json changed; restarting Mockoon…"
  kill "$pid"
  start_server
done

kill -9 $(lsof -ti :3001)
NODE_OPTIONS="--require $(pwd)/mockoon-hbs-preload.js" \
npx mockoon-cli start -d demo.json -p 3001
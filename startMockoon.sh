kill -9 $(lsof -ti :3000)
NODE_OPTIONS="--require $(pwd)/mockoon-hbs-preload.js" \
npx mockoon-cli start -d demo.json -p 3000
NODE_OPTIONS="--require $(pwd)/mockoon-hbs-preload.js" \
node -e "const H = require('handlebars'); \
console.log('add(2,3) =', H.helpers.add(2,3)); \
console.log('hello() =', H.helpers.hello());"
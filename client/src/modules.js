// index.js

const fs = require('fs');
const path = require('path');

const modules = {};

// Зчитати всі файли в поточній директорії
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    const moduleName = path.basename(file, '.js');
    modules[moduleName] = require(`./${file}`);
  }
});

export default modules;

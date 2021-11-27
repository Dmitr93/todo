const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  // ...
  webpack: {
    alias: {
      '@components': resolvePath('./src/components'),
      '@img': resolvePath('./src/assets/img'),
      '@utilities': resolvePath('./src/utilities'),
    },
  },
  // ...
};

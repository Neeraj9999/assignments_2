const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@routes": "src/routes",
    "@pages": "src/pages",
    "@utils": "src/utils",
  })(config);

  return config;
};

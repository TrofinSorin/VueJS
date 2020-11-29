const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "./src/styles/_1variables.scss"),
        path.resolve(__dirname, "./src/styles/_colors.scss"),
        path.resolve(__dirname, "./src/styles/_2mixins.scss"),
        path.resolve(__dirname, "./src/styles/_flex.scss"),
        path.resolve(__dirname, "./src/styles/_global.scss"),
        path.resolve(__dirname, "./src/styles/typography.scss"),
      ],
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set(
      "@components",
      path.resolve(__dirname, "src/components")
    );
    config.resolve.alias.set(
      "@services",
      path.resolve(__dirname, "src/services")
    );
  },
};

const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/styles/_1variables.scss";
        @import "@/styles/_colors.scss";
        @import "@/styles/_2mixins.scss";
        @import "@/styles/_flex.scss";
        @import "@/styles/_global.scss";
        @import "@/styles/typography.scss";
        `,
      },
      // by default the `sass` option will apply to both syntaxes
      // because `scss` syntax is also processed by sass-loader underlyingly
      // but when configuring the `prependData` option
      // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
      // in that case, we can target the `scss` syntax separately using the `scss` option
    },
  },
  // pluginOptions: {
  //   "style-resources-loader": {
  //     preProcessor: "scss",
  //     patterns: [
  //       path.resolve(__dirname, "./src/styles/_1variables.scss"),
  //       path.resolve(__dirname, "./src/styles/_colors.scss"),
  //       path.resolve(__dirname, "./src/styles/_2mixins.scss"),
  //       path.resolve(__dirname, "./src/styles/_flex.scss"),
  //       path.resolve(__dirname, "./src/styles/_global.scss"),
  //       path.resolve(__dirname, "./src/styles/typography.scss"),
  //     ],
  //   },
  // },
  chainWebpack: (config) => {
    config.resolve.alias.set("@shared", path.resolve(__dirname, "src/shared"));
    config.resolve.alias.set(
      "@components",
      path.resolve(__dirname, "src/components")
    );
    config.resolve.alias.set(
      "@services",
      path.resolve(__dirname, "src/services")
    );
    config.resolve.alias.set("@", path.join(__dirname, "./src"));
  },
};

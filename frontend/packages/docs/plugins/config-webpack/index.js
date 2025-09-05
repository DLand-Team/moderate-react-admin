const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function (context, options) {
  return {
    name: 'config-webpack',
    configureWebpack(config, isServer) {
      return {
        plugins: [
          new MonacoWebpackPlugin({
            languages: ["typescript", "javascript", "css", "html", "json"],
            features: ["coreCommands", "find"]
          })
        ]
      };
    },
  };
};
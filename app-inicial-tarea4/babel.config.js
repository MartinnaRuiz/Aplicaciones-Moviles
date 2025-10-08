// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ...otros plugins si tuvieras
      'react-native-reanimated/plugin', // ← último
    ],
  };
};


// eslint-disable-next-line @typescript-eslint/no-var-requires
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const config = {};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  return {
    ...defaultConfig,
    resolver: {
      sourceExts: [
        ...defaultConfig.resolver.sourceExts,
        'jsx',
        'js',
        'ts',
        'tsx',
      ],
    },
  };
})();

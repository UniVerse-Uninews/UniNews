module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      'plugins': [
        ['@babel/plugin-transform-private-methods', { 'loose': true }]
      ]
    }
  ],
  plugins: [
    [
      'react-native-reanimated/plugin'
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx'
        ],
        root: ['.'],
        alias: {
          '@hooks': './src/hooks',
          '@assets': './assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@services': './src/services',
          '@types': './src/types',
          '@styles': './src/styles'
        },
      },
    ],
  ],
};

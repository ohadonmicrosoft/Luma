module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': false,
      },
    },
    'postcss-nested': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

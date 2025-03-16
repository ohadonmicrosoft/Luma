module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/nesting': {},
    'postcss-nested': {},
    'postcss-flexbugs-fixes': {},
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
      stage: 3,
      features: {
        'nesting-rules': false,
        'custom-properties': false,
      },
    },
  },
};

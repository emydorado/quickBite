const autoprefixer = require('autoprefixer');
const purgecssLib = require('@fullhuman/postcss-purgecss').default;

const purgecss = purgecssLib({
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  safelist: [],
});

module.exports = {
  plugins: [
    autoprefixer,
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
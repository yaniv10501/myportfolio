require('@babel/register')({
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: [
    [
      'transform-assets',
      {
        extensions: ['webm', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'],
        name: 'static/media/[name].[hash].[ext]',
      },
    ],
    [
      'css-modules-transform',
      {
        generateScopedName: '[hash:base64:5]',
        extensions: ['.css'],
      },
    ],
  ],
});

const { initServer } = require('./server');

initServer();

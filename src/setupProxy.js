const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://oversee-back.vercel.app',
      changeOrigin: true,
    })
  );
};
//https://mern-back-ten.vercel.app
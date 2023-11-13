const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/src/pages/testApi',  // Se a sua API estiver em /api
    createProxyMiddleware({
      target: 'http://localhost:3000',  // Aponte para a porta da sua API
      changeOrigin: true,
    })
  );
};

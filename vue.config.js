const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        'target': 'http://localhost:9981',
        changeOrigin: true
      }
    }
  },
})

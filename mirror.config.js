module.exports = {
  // Server setup
  port: 8080,
  address: '127.0.0.1',
  ipWhitelist: ['127.0.0.1', '::ffff:127.0.0.1', '::1'],
  electron: {
    options: {},
    fullscreen: true,
    autoHideMenuBar: true,
    zoom: 1
  }
}

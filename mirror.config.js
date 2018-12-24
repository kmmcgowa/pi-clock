module.exports = {
  // Server setup
  serverPort: 3000,
  address: '127.0.0.1',
  ipWhitelist: ['127.0.0.1', '::ffff:127.0.0.1', '::1'],
  electron: {
    devTools: true,
    // will open devtools
    debug: process.env.NODE_ENV === 'production'
  }
}

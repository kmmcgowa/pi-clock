const electron = require('electron')
const Server = require('../server')
const globalConfig = require('../mirror.config')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
// We must make a global var for the window to assure it does not get garbage collected
let mainWindow
let server
let reloadInterval

const createWindow = config => {
  const defaults = {
    width: 800,
    height: 480,
    x: 0,
    y: 0,
    darkTheme: true,
    fullscreen: !config.electron.debug,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      zoomFactor: 1,
      devTools: config.electron.devTools
    },
    backgroundColor: '#000'
  }

  const address = (config.address === void 0) || (config.address === '') ? (config.address = 'localhost') : config.address

  mainWindow = new BrowserWindow(defaults)
  mainWindow.loadURL(`http://${address}:${config.serverPort}`)

  if (config.electron.debug) {
    mainWindow.webContents.openDevTools()
  }

  reloadInterval = setInterval(() => {
    mainWindow.reload()
  }, 1000 * 60 * 60 * 2)
}

// This method will be called when Electron has finished
app.on('ready', () => {
  console.log('Launching application.')
  createWindow(globalConfig)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  clearInterval(reloadInterval)
  createWindow(globalConfig)
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    clearInterval(reloadInterval)
    createWindow(globalConfig)
  }
})

/* This method will be called when SIGINT is received and will call
 * each node_helper's stop function if it exists. Added to fix #1056
 *
 * Note: this is only used if running Electron. Otherwise
 * init.stop() is called by process.on("SIGINT"... in `app.js`
 */
app.on('before-quit', (event) => {
  event.preventDefault()
  setTimeout(() => {
    process.exit(0)
  }, 3000) // Force-quit after 3 seconds.
  clearInterval(reloadInterval)
  server = null
  process.exit(0)
})

// Start the server
if (['localhost', '127.0.0.1', '::1', '::ffff:127.0.0.1', undefined].indexOf(globalConfig.address) > -1) {
  server = new Server(globalConfig)
}

const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // 1. Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   // so you can load your local index.html
    //   preload: path.join(__dirname, 'preload.js'),
    // }
  })

  // 2. Load your index.html
  win.loadFile(path.join(__dirname, '../../www/index.html'))

  // 3. (optional) Open DevTools:
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

// Quit when all windows are closed (Windows & Linux).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// (macOS) re-open window on dock-click.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

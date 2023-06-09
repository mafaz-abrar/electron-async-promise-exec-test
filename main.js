// main.js
const volumeSystemTools = require('./volume-system-tools');

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // For debugging.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('volumeSystemTools:getPartitions', (e, ...args) => {
  
    // Adds a handler for an invokeable IPC. This handler will be called whenever a renderer
    // calls ipcRenderer.invoke(channel, ...args).

    // If listener returns a Promise, the eventual result of the promise will be returned as a
    // reply to the remote caller. Otherwise, the return value of the listener will be used as
    // the value of the reply.

    // This is important - getPartitionsAsync returns the actual data and not a Promise.
    // Therefore, the actual data is passed to ipcRenderer. 

    // NOTE: Even if getPartitionsWithPromises() was used, and a Promise was
    // returned, the code would be the same as ipcMain passes the value of a
    // Promise to ipcRenderer (see above)

    return volumeSystemTools.getPartitionsAsync(...args);
  })

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // For simple local apps; allows basic interactions
    },
    title: "Renova Recycle Center",
    // icon: path.join(__dirname, '../public/icon.png') // Uncomment if you add an icon
  });

  // In development, we load the Vite dev server
  // In production (built app), we load the index.html from the dist folder
  const isDev = !app.isPackaged;

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools(); // Open DevTools for debugging
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
  
  // Remove the default menu bar for a cleaner "Kiosk" look
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
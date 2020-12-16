import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import url from 'url';
import contextMenu from 'electron-context-menu';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

declare global {
  interface Window {
    api: any,
  }
}

contextMenu({
  prepend: (defaultActions, params, browserWindow) => [
    {
      label: 'Open Document',
      // Only shows it when right-clicking images, pdf, doc, epub
      visible: params.mediaType === 'image' || 
               params.mediaType === 'pdf' || 
               params.mediaType === 'doc' || 
               params.mediaType === 'docx' || 
               params.mediaType === 'epub' || 
               params.mediaType === 'mp3' ||
               params.mediaType === 'mp4'
      click: () => {
        //mainWindow2.loadURL(path.join('file://', process.cwd(), 'src/index-2.html'));
        //mainWindow2.show();
      }
    },
    {
      label: 'Insert Document into InfoBasket',
      // Only shows it when right-clicking images, pdf, doc, epub
      visible: params.mediaType === 'image' || params.mediaType === 'pdf' || params.mediaType === 'doc' || params.mediaType === 'docx' || params.mediaType === 'epub'
    },
    {
      label: 'Remove Document from the InfoBasket',
     // Only shows it when right-clicking images, pdf, doc, epub
      visible: params.mediaType === 'image' || params.mediaType === 'pdf' || params.mediaType === 'doc' || params.mediaType === 'docx' || params.mediaType === 'epub'
    },
    {
      label: 'Extract Information and Knowledge',
     // Only shows it when right-clicking images, pdf, doc, epub
      visible: params.mediaType === 'image' || params.mediaType === 'pdf' || params.mediaType === 'doc' || params.mediaType === 'docx' || params.mediaType === 'epub'
    }
  ]
});

const dispose = contextMenu();

let mainWindow;
let mainWindow2;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#242424',
    show: false,
    webPreferences: {
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.webContents.openDevTools();
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  dispose();

  // Show window when its ready to
  mainWindow.on('ready-to-show', () => mainWindow.show());

 mainWindow2 = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#242424',
    show: false,
    webPreferences: {
      enableRemoteModule: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


ipcMain.handle("open-second-window", (IpcMainEvent, file) => {
  mainWindow2.loadURL(path.join('file://', process.cwd(), 'src/index-2.html'));
  mainWindow2.show();
});


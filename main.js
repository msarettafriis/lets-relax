const electron = require('electron')
const url = require('url')
const path = require('path')

process.env.NODE_ENV = 'production'

const { app, BrowserWindow, Menu } = electron

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({ icon: './icon/icon.png' })
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
})

const versionNumber = '1.0.0'
const authorsCredit =
  'Most of the code was done by Brad Traversy as part of a tutorial' +
  ' series.\nThe original background was made by Shella Sund, and was' +
  ' released under the Creative Commons Attribution 2.0 license.\nM. Sara' +
  ' Friis ported the code to Electron, modified the background, and made ' +
  'some design tweaks.'

app.setAboutPanelOptions({
  applicationName: 'Lets Relax',
  applicationVersion: versionNumber,
  version: versionNumber,
  credits: authorsCredit,
  authors: authorsCredit
})

const viewMenu = {
  label: 'View',
  submenu: [
    { role: 'resetZoom' },
    { role: 'zoomIn' },
    { role: 'zoomOut' },
    { type: 'separator' },
    { role: 'togglefullscreen' }
  ]
}

const mainMenuTemplate = [viewMenu, { role: 'windowMenu' }]

if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({ role: 'appMenu' })
} else {
  mainMenuTemplate.unshift({ role: 'fileMenu' })
}

if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' }
    ]
  })
}

const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow; 
let addWindow

//Listen for app to be ready.

//process.env.NODE_ENV = 'production';

app.on('ready', function(){
    //Create new window 
    mainWindow = new BrowserWindow({frame:false}); //Pass empty object as we dont need window configuration 
    // Load html into window 

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //quit entire application on closing mainWindow
    mainWindow.on('close', function(){
        app.quit();
    })

    //Build Menu from template 
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
})

//handle createAddWindows

function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 500,
        height: 200,
        title: 'Add item to ToDo List',
        frame: false
    });
    // Load html into window 

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //garbage collection;
    addWindow.on('close', function(){
        addWindow = null;
    })
}

//catch item:add
ipcMain.on('item:add', function(e, item){
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
})


//Create Menu Template 
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                },
                accelerator: 'Alt+A'
            },
            {
                label: 'Empty ToDo List',
                click(){
                    mainWindow.webContents.send('item:clear');
                },
                accelerator: 'Alt+Q'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]

if(process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

//add develop tools item if not in production 

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:  'Develop Tools',
        submenu: [{
            label: 'Toggle DevTools',
            accelerator: process.platform == 'darwin' ? 'Command+I': 'Ctrl+I',
            click(item, focusedWindow){
                focusedWindow.toggleDevTools();
            }
        },
        {
            role: 'reload'
        }]
    })
}
const electron = require('electron');
const { ipcRenderer } = electron;
const ul = document.querySelector('ul');
const colors = ['CRIMSON', 'RED', 'FIREBRICK', 'DARKRED', 'DEEPPINK', 'MEDIUMVIOLETRED', 'PALEVIOLETRED', 'TOMATO', 'ORANGERED', 'DARKORANGE', 'ORANGE', 'GOLD', 'DARKKHAKI', 'VIOLET', 'ORCHID', 'FUCHSIA', 'MAGENTA', 'MEDIUMORCHID', 'MEDIUMPURPLE', 'REBECCAPURPLE', 'BLUEVIOLET', 'DARKVIOLET', 'DARKORCHID', 'DARKMAGENTA', 'PURPLE', 'INDIGO', 'SLATEBLUE', 'DARKSLATEBLUE', 'MEDIUMSLATEBLUE', 'GREENYELLOW', 'CHARTREUSE', 'LAWNGREEN', 'LIME', 'LIMEGREEN', 'SPRINGGREEN', 'MEDIUMSEAGREEN', 'SEAGREEN', 'FORESTGREEN', 'GREEN', 'DARKGREEN', 'YELLOWGREEN', 'OLIVEDRAB', 'OLIVE', 'DARKOLIVEGREEN', 'MEDIUMAQUAMARINE', 'DARKSEAGREEN', 'LIGHTSEAGREEN', 'DARKCYAN', 'TEAL', 'DARKTURQUOISE', 'CADETBLUE', 'STEELBLUE', 'MEDIUMSLATEBLUE', 'ROYALBLUE', 'BLUE', 'MEDIUMBLUE', 'DARKBLUE', 'NAVY', 'MIDNIGHTBLUE', 'SADDLEBROWN', 'SIENNA', 'BROWN', 'MAROON', 'GRAY', 'DIMGRAY', 'LIGHTSLATEGRAY', 'SLATEGRAY', 'DARKSLATEGRAY']

//catch add item
ipcRenderer.on('item:add', function (e, item) {
    const li = document.createElement('li');
    const div = document.createElement('div');

    div.classList.add('valign-wrapper', 'circle', 'to-do-container');

    div.style.backgroundColor = colors[getRandomInt(0, 67)];
    div.textContent = ul.children.length + 1;

    li.classList.add('collection-item', 'to-do-item');
    li.appendChild(div);
    li.appendChild(document.createTextNode(item));

    ul.appendChild(li);
    ul.className = 'collection';
})

//catch clear all element 
ipcRenderer.on('item:clear', function () {
    ul.innerHTML = '';
    ul.className = '';
})

//remove elements
ul.addEventListener('dblclick', removeItem);
function removeItem(e) {
    e.target.remove();
    if (ul.children.length == 0) {
        ul.className = '';
    }
    updateToDoItemIndexes();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateToDoItemIndexes() {

    const ul = document.querySelector('ul');
    for (var i = 0; i < ul.childNodes.length; i++) {
        var curChild = ul.childNodes[i];
        curChild.firstChild.textContent = i + 1;
    }
}

(function () {
    // Retrieve remote BrowserWindow
    const { BrowserWindow } = require('electron').remote

    function init() {
        // Minimize task
        document.getElementById("min-btn").addEventListener("click", (e) => {
            var window = BrowserWindow.getFocusedWindow();
            window.minimize();
        });

        // Maximize window
        document.getElementById("max-btn").addEventListener("click", (e) => {
            var window = BrowserWindow.getFocusedWindow();
            if (window.isMaximized()) {
                window.unmaximize();
            } else {
                window.maximize();
            }
        });

        // Close app
        document.getElementById("close-btn").addEventListener("click", (e) => {
            var window = BrowserWindow.getFocusedWindow();
            window.close();
        });
    };

    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };
})();
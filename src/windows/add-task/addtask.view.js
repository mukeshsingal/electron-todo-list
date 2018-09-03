(function () {
    // Retrieve remote BrowserWindow
    const { BrowserWindow } = require('electron').remote

    function init() {
    
        // Close app
        document.getElementById("add-close-btn").addEventListener("click", (e) => {
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

const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    const item = document.querySelector("#item").value;
    ipcRenderer.send('item:add', item);
}


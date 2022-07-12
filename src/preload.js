// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { ipcRenderer, contextBridge } = require("electron");
const { platform } = require("os");
// can be accessed through window.app
contextBridge.exposeInMainWorld('myApp', {
    platform: platform(), // create a property oj the app object for platform
    fetchGalleryImages: (arg) => ipcRenderer.invoke("fetch-images", arg),
    fetchFileExplorer: (arg) => ipcRenderer.invoke("fetch-file-explorer", arg),
    validateCopyFile: (arg) => ipcRenderer.invoke("validate-copy-file", arg),
    copyFileExplorer: (arg) => ipcRenderer.invoke("copy-file-explorer", arg),
});
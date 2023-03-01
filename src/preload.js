const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
	getExpressAppUrl: () => ipcRenderer.invoke("get-express-app-url"),
});

contextBridge.exposeInMainWorld("ipcRenderer", {
	on: (channel, listener) => {
		ipcRenderer.on(channel, listener);
	},
});

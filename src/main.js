const { app, globalShortcut, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const fetch = require("node-fetch");
const trayWindow = require("./electron-tray-window");

const expressAppUrl = "http://localhost:14175";
let mainWindow = null;

const start = path.join(__dirname, path.join("..", "/start.js"));

function redirectOutput(x) {
	x.on("data", function (data) {
		data
			.toString()
			.split("\n")
			.forEach((line) => {
				if (line !== "") {
					// regex from: http://stackoverflow.com/a/29497680/170217
					// REGEX to Remove all ANSI colors/styles from strings
					let serverLogEntry = line.replace(
						/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
						""
					);

					mainWindow.webContents.send("server-log-entry", serverLogEntry);
				}
			});
	});
}

function registerGlobalShortcuts() {
	globalShortcut.register("CommandOrControl+Shift+L", () => {
		mainWindow.webContents.send("show-server-log");
	});
}

function createWindow() {
	const expressAppProcess = spawn("node", [start], {
		shell: true,
		env: {
			ELECTRON_RUN_AS_NODE: "1",
		},
	});
	redirectOutput(expressAppProcess.stdout);
	redirectOutput(expressAppProcess.stderr);

	mainWindow = new BrowserWindow({
		autoHideMenuBar: true,
		frame: false,
		width: 240,
		height: 280,
		icon: path.join(__dirname, path.join("..", "favicon.ico")),
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	trayWindow.setOptions({
		trayIconPath: path.join(__dirname, path.join("..", "favicon.ico")),
		window: mainWindow,
	});

	mainWindow.on("closed", () => {
		mainWindow = null;
		expressAppProcess.kill();
	});
	mainWindow.on("focus", () => {
		registerGlobalShortcuts();
	});

	mainWindow.on("blur", () => {
		globalShortcut.unregisterAll();
	});

	ipcMain.handle("get-express-app-url", () => {
		return expressAppUrl;
	});

	//mainWindow.webContents.openDevTools();
	mainWindow.loadURL(`file://${__dirname}/../index.html`);
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.whenReady().then(() => {
	registerGlobalShortcuts();
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

	let checkServerRunning = setInterval(() => {
		fetch(expressAppUrl)
			.then((response) => {
				if (response.status === 200) {
					clearInterval(checkServerRunning);
					mainWindow.webContents.send("server-running");
				}
			})
			.catch((err) => {
				// swallow exception
			});
	}, 1000);
});

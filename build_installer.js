// ./build_installer.js

// 1. Import Modules
const { MSICreator } = require("electron-wix-msi");
const path = require("path");
const pkg =require('./package.json')

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64",
const APP_DIR = path.join(__dirname, "dist/pack/srwui-scr-driver-win32-x64");
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer",
const OUT_DIR = path.join(__dirname, "dist/windows_installer");
const ICON_DIR = path.join(__dirname, "favicon.ico");

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
	appDirectory: APP_DIR,
	outputDirectory: OUT_DIR,
	icon: ICON_DIR,
	// Configure metadata
	description: pkg.description,
	exe: pkg.name,
	name: "Smart Card Reader Driver",
	manufacturer: "SRW Upgrade International.CO.,LTD",
	version: pkg.version,

	// Configure installer User Interface
	ui: {
		chooseDirectory: true,
	},
});

// 4. Create a .wxs template file
msiCreator.create().then(function () {
	// Step 5: Compile the template to a .msi file
	msiCreator.compile();
});

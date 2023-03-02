const electronInstaller = require("electron-winstaller");
const path = require("path");

const ico = path.join(__dirname, "favicon.ico");
// NB: Use this syntax within an async function, Node does not have support for
//     top-level await as of Node 12.
async function setup() {
	try {
		await electronInstaller.createWindowsInstaller({
			appDirectory: path.join(
				__dirname,
				"/dist/pack/srwui-scr-driver-win32-x64"
			),
			outputDirectory: path.join(__dirname, "/dist/installer64"),
			authors: "Smart Card Reader.",
			exe: "srwui-scr-driver.exe",
			iconUrl: ico,
			setupIcon: ico,
		});
		console.log("It worked!");
	} catch (e) {
		console.log(`No dice: ${e.message}`);
	}
}

setup();

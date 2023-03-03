const { spawn } = require("child_process");
const os = require("os");

const path = require("path");
const pm2_config = path.join(__dirname, "ecosystem.config.js");
var hostname = os.hostname();

const node_gyp = spawn("npm", [`config`,'set','python',`C:/Users/${hostname}/AppData/Local/Programs/Python/Python38`], { shell: true });

node_gyp.stdout.on("data", (data) => {
	console.log("node_v =>", `${data}`);
});

node_gyp.stderr.on("data", (data) => {
	console.error("node_v err =>", `${data}`);
});

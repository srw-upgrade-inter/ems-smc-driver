const path = require("path");

const server = path.join(__dirname, "src/express-app.js");
module.exports = {
	apps: [
		{
			name: "app1",
			script: server,
		},
	],
};

const path = require("path");
// const { publicDir } = require("./helper/path");
const express = require("express");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
	cors: {
		origin: ["http://localhost:3000", "https://ems-client.vercel.app","https://www.swrupgradeinternational.com"],
	},
});
const smc = require("./smc");

const PORT = process.env.SMC_AGENT_PORT || 14175;

// if (app.env === "production") {
//   io.origins([`localhost:${PORT}`]);
// }

// if (app.env !== "production") {
//   app.get("/", (req, res) => {
//     res.sendFile(path.join(publicDir, "example.html"));
//   });
// }

app.set("views", path.join(__dirname, path.join("..", "views")));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, path.join("..", "public"))));

app.get("/", (req, res) => {
	res.render("index", { title: "Home" })
});

io.on("connection", (socket) => {
	console.log(`New connection from ${socket.id}`);

	socket.on("set-query", (data = {}) => {
		const { query = undefined } = data;
		console.log(`set-query: ${query}`);
		smc.setQuery(query);
	});

	socket.on("set-all-query", (data = {}) => {
		smc.setAllQuery();
	});

	socket.on("disconnect", () => {
		console.log("client disconnected");
	});
});

server.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
	// connect to smart card reader after server started.
	// delay because if restart by pm2, need to wait connection from client to set query
	setTimeout(async () => {
		smc.init(io);
	}, 1500);
});

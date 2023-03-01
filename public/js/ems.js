window.onload = function () {
	const cards = document.getElementById('cards');
	const insertCard = document.getElementById('insert-card');
	const wCard = document.getElementById('w-card');
	const errorCard = document.getElementById('error-card');
	const checkedCard = document.getElementById('checked-card');
	const socketImg = document.getElementById('socket');
	const loading = document.getElementById('loading');

	var socket = io.connect("http://localhost:14175");
	const dataEl = document.getElementById("data");
	socket.on("connect", function () {
		socket.emit("set-query", {
			query: [
				"cid",
				"name",
				"nameEn",
				"dob",
				"gender",
				"issuer",
				"issueDate",
				"expireDate",
				"address",
				"photo",
				"nhso",
				"laserId",
			],
		});
	});
	socket.on("data", function (data) {
		console.log(data);
		// dataEl.innerHTML = JSON.stringify(data);
		loading.style.display = "none";
		cards.style.display = "none";
		insertCard.style.display = "none";
		wCard.style.display = "none";
		errorCard.style.display = "none";
		checkedCard.style.display = "block";
		socketImg.style.display = "none";
	});
	socket.on("error", function (data) {
		console.log(data);
		// dataEl.innerHTML = JSON.stringify(data);
		loading.style.display = "none";
		cards.style.display = "none";
		insertCard.style.display = "none";
		wCard.style.display = "none";
		errorCard.style.display = "block";
		checkedCard.style.display = "none";
		socketImg.style.display = "none";
	});
	socket.on("card-removed", function (data) {
		console.log(data);
		// dataEl.innerHTML = JSON.stringify(data);
		loading.style.display = "none";
		cards.style.display = "block";
		insertCard.style.display = "none";
		wCard.style.display = "none";
		errorCard.style.display = "none";
		checkedCard.style.display = "none";
		socketImg.style.display = "none";
	});
	socket.on("device-deactivated", function (data) {
		console.log(data);
		// dataEl.innerHTML = JSON.stringify(data);
		loading.style.display = "block";
		cards.style.display = "none";
		insertCard.style.display = "none";
		wCard.style.display = "none";
		errorCard.style.display = "none";
		checkedCard.style.display = "none";
		socketImg.style.display = "block";
	});
	socket.on("device-error", function (data) {
		console.log(data);
		// dataEl.innerHTML = JSON.stringify(data);
		loading.style.display = "none";
		cards.style.display = "none";
		insertCard.style.display = "none";
		wCard.style.display = "block";
		errorCard.style.display = "none";
		checkedCard.style.display = "none";
		socketImg.style.display = "none";
	});

	socket.on("smc-inserted", function (data) {
		console.log(data);
		// dataEl.innerHTML = JSON.stringify(data);
		loading.style.display = "block";
		cards.style.display = "none";
		insertCard.style.display = "block";
		wCard.style.display = "none";
		errorCard.style.display = "none";
		checkedCard.style.display = "none";
		socketImg.style.display = "none";
	});

	socket.on("command-issued", function (data) {
		console.log(data);
		// dataEl.innerHTML = JSON.stringify(data);
		loading.style.display = "block";
		cards.style.display = "none";
		insertCard.style.display = "block";
		wCard.style.display = "none";
		errorCard.style.display = "none";
		checkedCard.style.display = "none";
		socketImg.style.display = "none";
	});

	socket.on("response-received", function (data) {
		console.log(data);
		// dataEl.innerHTML = JSON.stringify(data);
		loading.style.display = "block";
		cards.style.display = "none";
		insertCard.style.display = "block";
		wCard.style.display = "none";
		errorCard.style.display = "none";
		checkedCard.style.display = "none";
		socketImg.style.display = "none";
	});
};

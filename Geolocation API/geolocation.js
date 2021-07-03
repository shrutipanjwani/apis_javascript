if ("geolocation" in navigator) {
	console.log("geolocation available");
} else {
	console.log("geolocation not available");
}

var getLocation = document.querySelector("#btn");
var show = document.querySelector(".show");
show.style.display = "none";

getLocation.addEventListener("click", function () {
	show.style.display = "block";
	navigator.geolocation.getCurrentPosition((position) => {
		console.log(position);

		const lat = position.coords.latitude;
		const long = position.coords.longitude;
		document.querySelector("#latitude").textContent = lat;
		document.querySelector("#longitude").textContent = long;
	});
});

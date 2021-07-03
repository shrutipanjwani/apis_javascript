const file = document.getElementById("fileupload");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audioSource;
let analyser;

file.addEventListener("change", function () {
	const files = this.files;
	const audio = document.getElementById("audio");
	audio.src = URL.createObjectURL(files[0]);
	audio.load();
	const audioContext = new AudioContext();
	audio.play();
	audioSource = audioContext.createMediaElementSource(audio);
	analyser = audioContext.createAnalyser();
	audioSource.connect(analyser);
	analyser.connect(audioContext.destination);
	analyser.fftSize = 32;
	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);

	const barWidth = canvas.width / 2 / bufferLength;
	let barHeight;
	let x;

	function animate() {
		x = 0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		analyser.getByteFrequencyData(dataArray);
		drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
		requestAnimationFrame(animate);
	}
	animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
	for (let i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i] * 2;
		const red = (i * barHeight) / 20;
		const green = i * 4;
		const blue = barHeight / 2;
		// ctx.fillStyle = "white";
		// ctx.fillRect(
		// 	canvas.width / 2 - x,
		// 	canvas.height - barHeight - 30,
		// 	barWidth,
		// 	15
		// );
		ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
		ctx.fillRect(
			canvas.width / 2 - x,
			canvas.height - barHeight,
			barWidth,
			barHeight
		);
		x += barWidth;
	}
	for (let i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i] * 2;
		const red = (i * barHeight) / 20;
		const green = i * 4;
		const blue = barHeight / 2;
		// ctx.fillStyle = "white";
		// ctx.fillRect(x, canvas.height - barHeight - 30, barWidth, 15);
		ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
		ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
		x += barWidth;
	}
}

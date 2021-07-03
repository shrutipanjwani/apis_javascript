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
	analyser.fftSize = 512;
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
		barHeight = dataArray[i] * 1.5;
		ctx.save();
		ctx.translate(canvas.width / 2, canvas.height / 2);
		ctx.rotate((i * Math.PI * 4) / bufferLength);
		// const red = (i * barHeight) / 20;
		// const green = i / 2;
		// const blue = barHeight;
		// ctx.fillStyle = "white";
		// ctx.fillRect(0, 0, barWidth, 15);
		const hue = i * 4;
		ctx.fillStyle = "hsl(" + hue + ",100%," + barHeight / 3 + "%)";
		// ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
		ctx.fillRect(0, 0, barWidth, barHeight);
		x += barWidth;
		ctx.restore();
	}
}

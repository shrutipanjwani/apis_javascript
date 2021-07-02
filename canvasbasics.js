const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const particlesArray = [];
let hue = 0;

// window.addEventListener('resize', function(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// });

//Creating a circle on click of screen
const mouse = {
	x: undefined,
	y: undefined,
};

canvas.addEventListener("click", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	drawCircle();
	// for(let i = 0; i < 3; i++){
	//     particlesArray.push(new Particle());
	// }
});

canvas.addEventListener("mousemove", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	drawCircle();
	// for (let i = 0; i < 3; i++) {
	// 	particlesArray.push(new Particle());
	// }
});

function drawCircle() {
	// Creating a filled circle
	ctx.fillStyle = "hsl(" + hue + ", 100% ,50%)";
	ctx.beginPath();
	// (x, y, radius, start angle, end angle)
	ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
	ctx.fill();
}

class Particle {
	constructor() {
		//this.x = mouse.x;
		//this.y = mouse.y;
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.size = Math.random() * 15 + 1;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
		this.color = "hsl(" + hue + ", 100% ,50%)";
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		// For not making a circle with negative radius
		if (this.size > 0.2) this.size -= 0.1;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		// (x, y, radius, start angle, end angle)
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function init() {
	for (let i = 0; i < 100; i++) {
		particlesArray.push(new Particle());
	}
}

init();

function handleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw();

		for (let j = i; j < particlesArray.length; j++) {
			const dx = particlesArray[i].x - particlesArray[j].x;
			const dy = particlesArray[i].y - particlesArray[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = particlesArray[i].color;
				ctx.lineWidth = 0.2;
				ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
				ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
				ctx.stroke();
				ctx.closePath();
			}
		}
		if (particlesArray[i].size <= 0.3) {
			particlesArray.splice(i, 1);
			console.log(particlesArray.length);
			i--;
		}
	}
}

function animate() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "rgba(0,0,0,0.05)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	handleParticles();
	hue += 1;
	requestAnimationFrame(animate);
}
animate();

// Creating a stroked circle
// ctx.strokeStyle = "red";
// ctx.beginPath();
// ctx.lineWidth = 5;
// (x, y, radius, start angle, end angle)
// ctx.arc(100, 100, 50, 0, Math.PI * 2);
// ctx.stroke();

// Holds all the images in the document
let imgs = [];
// Holds the time when the animation started
let start = 0;

// Animation loop, runs every frame while active
function loop() {
	// Get the time since the animation was activated
	let time = new Date().getTime() / 1000 - start;
	// Calculate the overall scale to be applied to images
	let scale = (5 - time) / 5;
	// Calculate the y scale modifier to make images spin in (sorta) 3D
	let scaleY = Math.sin((time + 1.57) * 5);
	// The images oscillate horizontally in unison
	let offX = Math.round(Math.sin(time) * 100);
	for(let i = 0; i < imgs.length; i++) {
		// The images oscillate vertically with an offset
		let offY = Math.round(Math.sin(time * 2 + i) * Math.min(time * 100, 100));
		// Set all the transformations that have been calculated
		imgs[i].style["transform"] = `translateX(${offX}px) translateY(${offY}px) scaleX(${scale}) scaleY(${scaleY * scale})`;
	}
	// Loop if the animation ain't done
	if(time < 5) {
		window.requestAnimationFrame(loop);
	}
}

// Checks to see if the user is done, and responds accordingly
function maybeDone() {
	if(confirm("Are you done?")) {
		// Start the animation
		start = new Date().getTime() / 1000;
		window.requestAnimationFrame(loop);
	} else {
		// Ask again in X seconds
		let sec = parseInt(prompt("How long should I wait before asking again? (seconds)", 30));
		setTimeout(function() {
			maybeDone();
		}, sec * 1000);
	}
}

// Main function, runs once the DOM content has actually loaded
function main() {
	// Grab all the images in the document
	imgs = document.getElementsByTagName("img");
	// Ask if the user is done looking at the grid
	setTimeout(function() {
		maybeDone();
	}, 3000);
}

// Runs the main function when the DOM content has loaded
document.addEventListener("DOMContentLoaded", main);
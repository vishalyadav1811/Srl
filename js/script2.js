// *** VARIABLES *** //
const autoBox = document.querySelector("input[name=autoplay]"),
	autoDir = "left", // left or right
	btnLeft = document.querySelector(".button-left"),
	btnRight = document.querySelector(".button-right"),
	loader = document.createElement("div"),
	counter = document.querySelector(".slide_counter"),
	slider = document.querySelector(".slides"),
	slides = document.querySelectorAll(".slides img"),
	SPEED = 2000; // = 2s

let count = 0,
    autoplay = null;

// *** Create loader *** //
loader.classList.add("loader");
slider.appendChild(loader);
// *** Hide loader when everything is loaded *** //
document.onreadystatechange = () => {
	if (document.readyState === "complete") {
		loader.hidden = true;
	}
};

// *** Initialize counter *** //
updateCounter();

// *** Start slideshow if hardcoded -checked- *** //
if (autoBox.checked) {
	autoplay = setInterval(slide.bind(this, "auto"), SPEED);
}

// *** Listen buttons for call *** //
btnLeft.addEventListener("click", () => slide("right"));
btnRight.addEventListener("click", () => slide("left"));

autoBox.addEventListener("change", () => {
	// *** If autoplay is checked then play slides, if not then stop *** //
	if (autoBox.checked) {
		autoplay = setInterval(() => slide("auto"), SPEED);
	} else {
		stopInterval();
	}
});

// *** Change slide *** //
function slide(direction) {
	// *** If left or right button were clicked, stop autoplay *** //
	if (direction === "right" || direction === "left") {
		stopInterval();
	}
	// *** If direction is 'auto' then slide to 'autoDir' - variable at the top, otherwise swipe in choosen direction *** //
	direction = direction == "auto" ? autoDir : direction;
	// *** Clear all previously added classes from every photo. *** //
	[].forEach.call(slides, (photo) => {
		photo.classList.remove("outleft", "outright");
	});
	slides[count].classList.remove("inleft", "inright");
	// *** Add class from sliding out photo *** //
	slides[count].classList.add("out" + direction);

	// *** Update counter - if clicked right button count -1, else count +1 *** //
	count = direction == "right" ? count - 1 : count + 1;
	// *** Looping slides *** //
	// *** if reached end go to first slide *** //
	if (count > slides.length - 1) {		
		count = count % slides.length;
	} 
	// *** if reached first go to last one *** //
	if (count < 0) {
		count = slides.length - 1;	
	} 

	// *** Add class for sliding in photo *** //
	slides[count].classList.add("in" + direction);
	// *** Update counter *** //
	updateCounter();
}
// *** counter *** //
function updateCounter(){
	counter.innerText = count + 1 + " of " + slides.length;
}

// *** Stop slideshow *** //
function stopInterval() {
	clearInterval(autoplay);
	autoplay = null;
	autoBox.checked = false;
}
// *** The End *** //

	//Slider nav with arrows
let slider = document.querySelector(".slider");
let sliderWrapper = document.querySelector(".sliderWrapper");
let navSliderButtons = document.querySelectorAll(".navSlider");
let sliderSlides = document.querySelectorAll(".lien");
let sliderWidth = document.querySelector(".listeLien").offsetWidth;
let slideAmount = sliderSlides.length;
let slideWidth = sliderSlides[0].offsetWidth;
let trueSliderWidth = slideAmount * slideWidth;
let screenWidth = window.innerWidth;
let sliderMarksWrapper = document.querySelector(".sliderMarks");

let supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;


for (let i = 0; i < slideAmount; i++) {
	sliderMarksWrapper.innerHTML += "<div></div>";
}

let sliderMarks = sliderMarksWrapper.querySelectorAll(".sliderMarks div");


if (trueSliderWidth >= screenWidth) {
	slider.classList.add("overflowSlider");
}

for (let i = 0; i < navSliderButtons.length; i++) {
	let nav = navSliderButtons[i];
	let isRight = nav.classList.contains("navSliderRight");


	nav.addEventListener("click", function() {
		let currentScroll = sliderWrapper.scrollLeft;
		let nearestSlide = Math.floor(currentScroll / slideWidth);
		let posTargetOffset = 0;
		let scrollLeftpx = 0;


		if (isRight) {
			posTargetOffset = 1;
		} else {
			if (
				currentScroll % slideWidth == 0 ||
				slideWidth % currentScroll == 0
			)
				posTargetOffset = -1;
		}

		scrollLeftpx = (nearestSlide + posTargetOffset) * slideWidth;

		if (supportsNativeSmoothScroll) {
			sliderWrapper.scrollTo(scrollLeftpx, 300);
		} else {
			scrollTo_poly(sliderWrapper, scrollLeftpx, 300);
		}
	});
}


// Detect slider scroll
// Display or not arrows and gradient
// Update slider points
sliderWrapper.addEventListener('scroll', function() {
	let distanceToRight = (trueSliderWidth - screenWidth - (sliderWidth - screenWidth) / 2) - this.scrollLeft;
	let currentSlide = Math.floor((this.scrollLeft + screenWidth / 2) / 250);

	for (let i = 0; i < sliderMarks.length; i++) {
		sliderMarks[i].classList[(i != currentSlide ? "remove" : "add")]("active");
	}

	slider.classList[(this.scrollLeft == 0 ? "add" : "remove")]("leftLocked");
	slider.classList[(distanceToRight <= 1 ? "add" : "remove")]("rightLocked");

});

window.addEventListener('resize', function() {
	slider = document.querySelector(".slider");
	screenWidth = sliderWrapper.offsetWidth;
	slideAmount = sliderSlides.length;
	slideWidth = sliderSlides[0].offsetWidth;
	trueSliderWidth = slideAmount * slideWidth;
	screenWidth = window.innerWidth;
	sliderWrapper.scroll();

	if (trueSliderWidth >= screenWidth) {
		slider.classList.add("overflowSlider");
	}
});

sliderWrapper.scroll();


function scrollTo_poly(element, to = 0, duration = 1000, scrollToDone = null) {
	const start = element.scrollLeft;
	const change = to - start;
	const increment = 20;
	let currentTime = 0;

	const animateScroll = (() => {

		currentTime += increment;

		const val = Math.easeInOutQuad(currentTime, start, change, duration);

		element.scrollLeft = val;

		if (currentTime < duration) {
			setTimeout(animateScroll, increment);
		} else {
			if (scrollToDone) scrollToDone();
		}
	});

	animateScroll();
};

Math.easeInOutQuad = function(t, b, c, d) {

	t /= d / 2;
	if (t < 1) return c / 2 * t * t + b;
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
};
/*

This js file is created by:

	ITConsulting24 AG
	Oerlikonerstrasse 50
	CH-8057 Zürich
	SWITZERLAND

	Phone: +41 44 382 88 88
	info(at)itconsulting24.com
	www.itconsulting24.com

*/
$(document).ready(function () {

	var spotTog = $('.spot .toggle');
	var sectionUpTag = $('.fp-up');
	var sectionDownTag = $('.fp-down');

	// clicking the up arrow button, 
	// section moves one to upward
	$(sectionUpTag).click(function (e) {
		e.preventDefault();
		$.fn.fullpage.moveSectionUp();
	});
	// clicking the down arrow button, 
	// section moves one to downward
	$(sectionDownTag).click(function (e) {
		e.preventDefault();
		$.fn.fullpage.moveSectionDown();
	});

	// used to fly in and fly out the textbox with default icon
	$(spotTog).click(function (e) {
		var spotPrnt = $(this).closest('.spot');
		if ($(spotPrnt).hasClass('open')) {
			$(spotPrnt).removeClass('open');
		} else {
			$(spotPrnt).addClass('open');
		}
		e.preventDefault();
	});

	// full page initialization
	$('#mytemplate').fullpage({
		anchors: ['Slide1', 'Slide2', 'Slide3', 'Slide4'],
		slidesNavigation: true,
		scrollingSpeed: 300,
		resize: false,
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ['Unternehmen', 'Freelancer', 'Rezension', 'Kontakt'],
		showActiveTooltip: true,
		continuousVertical: false, // for continuous vertical navigation 
		responsive: 0,
		loopBottom: false,
		loopTop: false,
		loopHorizontal: false,
		slideMoving: false,
		credits: { enabled: false},
		afterSlideLoad: function (section, origin, destination, direction, trigger) {
			var loadedSlide = $(this);
			// the loaded slide has bright background
			if ($(loadedSlide[0]).hasClass('background-type-white') || $(loadedSlide[0]).hasClass('background-type-gray')) {
				showBlackLogo();
			}
			// the loaded section has dark/other background
			else {
				showWhiteLogo();
			}

			// check for video in the loaded slide (mixed slide)
			var activeSlide = destination.item;
			var videoElement = $(activeSlide).find('video');
			var videoPlayButton = $('.video-play_button');
			var placeholderImage = $(activeSlide).find('.video-bg');
			// If the videoElement length is > 0, the section has video element
			if (videoElement.length > 0) {
				var placeholderImage = $(activeSlide).find('.video-bg');
				videoElement.get(0).play();
				setTimeout(() => {
					placeholderImage.css({
						'opacity': 0,
						'visibility': 'hidden'
					})
				}, 100);

				setTimeout(() => {
					placeholderImage.css({
						'display': 'none',
					})
				}, 3000);
				videoPlayButton.click(() => {
					videoPlayButton.css('display', 'none');
					videoElement.get(0).play();
				});
			}

			$('.swipe-sensitive').on('touchstart', function(event) {
				event.stopPropagation();
			});
		},
		onSlideLeave: function (section, origin, destination, direction, trigger) {
			var leavingSlide = $(this);
			// make faster horizontal (slide) navigation
			$.fn.fullpage.setScrollingSpeed(300);

			// check for video in the leaving section
			var videoElement = $(destination.item).find('video');
			var videoPlayButton = $('.video-play_button');

			// If the videoElement length is > 0, the slide has video element
			if (videoElement.length > 0) {
				var placeholderImage = $(destination.item).find('.video-bg');
				videoElement.get(0).pause();
				setTimeout(() => {
					placeholderImage.css({
						'display': 'block',
						'opacity': 1,
						'visibility': 'visible'
					})
				}, 100);
				videoPlayButton.css('display', 'block');
			}
		},
		// Callback fired once the sections have been loaded, after the scrolling has ended.
		afterLoad: function (origin, destination, direction, trigger) {
			var loadedSection = $(this);
			// Hide navigation arrow if first or last horisontal slide
			if (destination.index == 0) {
				$('.fp-up').css({
					'opacity' : '0',
					'visibility' : 'hidden'
				});
			} else {
				$('.fp-up').css({
					'opacity' : '1',
					'visibility' : 'visible'
				});
			}

			if (destination.index == $('#mytemplate .section').length - 1) {
				$('.fp-down').css({
					'opacity' : '0',
					'visibility' : 'hidden'
				});
			} else {
				$('.fp-down').css({
					'opacity' : '1',
					'visibility' : 'visible'
				});
			}

			
			// Hide slide navigation if slide less than two
			/*if ($(loadedSection).find('.slide').length >= 2) {
				$(loadedSection).find('.fp-slidesNav').css({
					'opacity' : '1',
					'visibility' : 'visible'
				});
			}

			console.log($(loadedSection).find('.slide').length);*/

			// check for video in the loaded section
			// if section has no slides, then the video starts from section 
			// else, it will start from slide

			var activeSlide = destination.item;
			var videoElement = $(activeSlide).find('.active video');
			var videoPlayButton = $('.video-play_button');

			// If the videoElement length is > 0, the section has video element
			if (videoElement.length > 0) {
				var placeholderImage = $(activeSlide).find('.video-bg');

				videoElement.get(0).play();

				setTimeout(() => {
					placeholderImage.css({
						'opacity': 0,
						'visibility': 'hidden'
					})
				}, 100);

				setTimeout(() => {
					placeholderImage.css({
						'display': 'none',
					})
				}, 300);

				videoPlayButton.click(() => {
					videoPlayButton.css('display', 'none');
					videoElement.get(0).play();
				});
			}
		},
		// index: index of the leaving section. Starting from 1.
		// nextIndex: index of the destination section. Starting from 1.
		// direction: it will take the values up or down depending on the scrolling direction.
		onLeave: function (origin, destination, direction, trigger) {
			var leavingSection = $(this);

			// make faster vertical (section) navigation
			$.fn.fullpage.setScrollingSpeed(300);


			// check for video in the leaving section
			var activeSlide = leavingSection[0].item;
			var videoElement = $(activeSlide).find('.active video');
			var videoPlayButton = $('.video-play_button');

			// If the videoElement length is > 0, the slide has video element
			if (videoElement.length > 0) {
				var placeholderImage = $(activeSlide).find('.video-bg');
				videoElement.get(0).pause();

				setTimeout(() => {
					placeholderImage.css({
						'display': 'block',
						'opacity': 1,
						'visibility': 'visible'
					})
				}, 100);

				videoPlayButton.css('display', 'block');
			}
		}
	});
});

function showBlackLogo() {
	var logoDivWhite = document.getElementById('divLogoWhite');
	logoDivWhite.style['display'] = 'none';
	var logoDivBlack = document.getElementById('divLogoBlack');
	logoDivBlack.style['display'] = 'inline';
}

function showWhiteLogo() {
	var logoDivBlack = document.getElementById('divLogoBlack');
	logoDivBlack.style['display'] = 'none';
	var logoDivWhite = document.getElementById('divLogoWhite');
	logoDivWhite.style['display'] = 'inline';
}

//Change background image when breakpoint is changed

let currentBreakpoint = '';

function changeBackground() {
	const newWidth = window.innerWidth;
	let newBreakpoint = '';

	if (newWidth <= 1023 && newWidth >= 768) {
		newBreakpoint = '-768';
	} else if (newWidth <= 767) {
		newBreakpoint = '-360';
	} else {
		newBreakpoint = '';
	}

	if (newBreakpoint !== currentBreakpoint) {
		const slides = document.querySelectorAll('.slide');

		slides.forEach(slide => {
			const style = slide.style.backgroundImage;
			const imageUrl = style.match(/url\(["']?([^"']*)["']?\)/)[1];
			const regex = /\.(jpg|png)$/;
			let imageUrlWithoutExtension = imageUrl.replace(regex, '');
			const imageExtension = imageUrl.match(regex)[1];

			imageUrlWithoutExtension = imageUrlWithoutExtension.replace(`${currentBreakpoint}`, '');
			slide.style.backgroundImage = `url(${imageUrlWithoutExtension}${newBreakpoint}.${imageExtension})`;
		});

		currentBreakpoint = newBreakpoint;
	}
}

changeBackground();
window.addEventListener('resize', changeBackground);
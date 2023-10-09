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
		scrollingSpeed: 700,
		resize: false,
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ['Unternehmen', 'Freelancer', 'Rezension', 'Kontakt'],
		showActiveTooltip: true,
		continuousVertical: false, // for continuous vertical navigation 
		responsive: 0,
		afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
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
			var videoElement = $(loadedSlide).find('video');

			// If the videoElement length is > 0, the section has video element
			if (videoElement.length > 0) {
				videoElement.get(0).play();
			}
		},
		onSlideLeave: function (anchorLink, index, slideIndex, direction) {
			var leavingSlide = $(this);
			// make faster horizontal (slide) navigation
			$.fn.fullpage.setScrollingSpeed(700);

			// check for video in the leaving section
			var videoElement = $(leavingSlide[0]).find('video');

			// If the videoElement length is > 0, the slide has video element
			if (videoElement.length > 0) {
				videoElement.get(0).pause();
			}
		},
		// Callback fired once the sections have been loaded, after the scrolling has ended.
		afterLoad: function (anchorLink, index) {
			var loadedSection = $(this);
			// Hide navigation arrow if first or last horisontal slide
			if (index == 1) {
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

			if (index == $('#mytemplate .section').length) {
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
			if ($(loadedSection).find('.fp-slidesNav ul li').length >= 2) {
				$(loadedSection).find('.fp-slidesNav').css({
					'opacity' : '1',
					'visibility' : 'visible'
				});
			}

			// check for video in the loaded section
			// if section has no slides, then the video starts from section 
			// else, it will start from slide

			var videoElement = $(loadedSection).find('.active video');

			// If the videoElement length is > 0, the section has video element
			if (videoElement.length > 0) {
				videoElement.get(0).play();
			}
		},
		// index: index of the leaving section. Starting from 1.
		// nextIndex: index of the destination section. Starting from 1.
		// direction: it will take the values up or down depending on the scrolling direction.
		onLeave: function (index, nextIndex, direction) {
			var leavingSection = $(this);

			// make faster vertical (section) navigation
			$.fn.fullpage.setScrollingSpeed(700);


			// check for video in the leaving section
			var videoElement = $(leavingSection[0]).find('video');

			// If the videoElement length is > 0, the section has video element
			if (videoElement.length > 0) {
				videoElement.get(0).pause();
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
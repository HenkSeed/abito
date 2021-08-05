let swiper = new Swiper('.mySwiper', {
	loop: false,
	spaceBetween: 10,
	slidesPerView: 5,
	freeMode: true,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
});
let swiper2 = new Swiper('.mySwiper2', {
	loop: true,
	spaceBetween: 10,
	// navigation: {
	// 	nextEl: '.swiper-button-next',
	// 	prevEl: '.swiper-button-prev',
	// },
	thumbs: {
		swiper: swiper,
	},
});

const menuBtn = document.querySelector('.menu-button');
const navbarPanel = document.querySelector('.navbar-panel');
const menuCloseBtn = document.querySelector('.close-menu');
menuBtn.addEventListener('click', () => {
	navbarPanel.classList.add('is-open');
});
menuCloseBtn.addEventListener('click', () => {
	navbarPanel.classList.remove('is-open');
});

// import 'swiper/css'
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import Swiper, {Grid, Navigation, Pagination, Virtual} from 'swiper';

const swiper = new Swiper(".publications__slider", {
  // modules: [Navigation, Pagination, Grid, Virtual],
  // Optional parameters
  slideClass: "card-article",
  // loop: true,
  spaceBetween: 8,
  slidesPerView: "auto",
  centeredSlides: true,
  initialSlide: 1,
  slidesPerGroup: 1,
  breakpoints: {
    768: {
      // loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 30,
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 2,
      },
    },
    1440: {
      // loop: false,
      centeredSlides: false,
      initialSlide: 1,
      spaceBetween: 33,
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 2,
      },
    },
  },

  // If we need pagination
  pagination: {
    el: ".publications__slider-pagination",
    bulletActiveClass: "publications__slider-bullet-active",
    bulletElement: "div",
    bulletClass: "publications__slider-bullet",
    // dynamicBullets: true,
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

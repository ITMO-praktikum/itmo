const swiper = new Swiper(".about-us__slider", {
  loop: true,
  loopedSlides:1,
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 10,


  breakpoints: {
    768: {
      loopedSlides:2,
      spaceBetween: 16,
      centeredSlides: false,
      // slidesPerView: 2,
      slidesPerGroup: 2,
      initialSlide: 0,
    },
    1440: {
      loopedSlides:3,
      slidesPerView: 3,
      slidesPerGroup: 3,
      centeredSlides: false,
    },
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".about-us__slider-button_type_next",
    prevEl: ".about-us__slider-button_type_prev",
  },
});


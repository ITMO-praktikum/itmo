const swiper = new Swiper(".about-us__slider", {
  loop: true,
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 10,

  breakpoints: {
    768: {
      spaceBetween: 16,
      centeredSlides: false,
    },
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

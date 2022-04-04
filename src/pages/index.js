import "./index.css";

const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  centeredSlides: true,
  slidesPerView: 1.1,
  spaceBetween: 10,
  breakpoints: {
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

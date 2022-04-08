import "./index.css";

const swiper = new Swiper('.swiper', {
  loop: true,
  // slidesOffsetBefore: 80
  slidesPerView: "auto",
  centeredSlides: true,
  // initialSlide: 0,
  spaceBetween: 10,
  breakpoints: {
    768: {
      spaceBetween:16,
      centeredSlides: false,
    },
  },

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

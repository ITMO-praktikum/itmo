import "./index.css";

const swiper = new Swiper('.swiper', {
  // loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  initialSlide: 0,
  spaceBetween: 10,
  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

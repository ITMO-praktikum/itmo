import { f } from 'core-js/modules/_object-dp';
import './index.css';

//Burder menu
const burgerMenu = {
  burgerBtn: document.querySelector('.header__menu-burger'),
  menuContainer: document.querySelector('.burger-menu'),
  menuCloseBtn: document.querySelector('.burger-menu__close'),
}


burgerMenu.burgerBtn.addEventListener('click', () => {
  console.log('Я бургер буттон')
  burgerMenu.menuContainer.classList.toggle('burger-menu_active')
});

burgerMenu.menuCloseBtn.addEventListener('click', () => {
  console.log('я кнопка закрытия')
  burgerMenu.menuContainer.classList.toggle('burger-menu_active')
});




//preventDefault
// const linkArray = Array.from()
function addPreventDefault(e){
  e.forEach((el) => {
    el.addEventListener('click', (ev) => {
      ev.preventDefault();
    })
  })
}



// addPreventDefault()

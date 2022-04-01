import { f } from 'core-js/modules/_object-dp';
import './index.css';
// Header
const headerSelector = {
  header: document.querySelector('.header__wrap'),
  logo: document.querySelector('.header__logo'),
  btnOpenMenu: document.querySelector('.header__menu-burger'),
  btnCloseMenu: document.querySelector('.header__menu-exit'),
}

//Burder menu
const burgerMenu = {
  menu: document.querySelector('.header__menu'),
  submenu: document.querySelector('.header__menu-title'),
  submenuContainer: document.querySelector('.header__menu-items_submenu'),
  link: document.querySelectorAll('.header__menu-link'),
}

//preventDefault
const linkArray = Array.from(burgerMenu.link)
function addPreventDefault(e){
  e.forEach((el) => {
    el.addEventListener('click', (ev) => {
      ev.preventDefault();
    })
  })
}
addPreventDefault(linkArray)

function setHeaderState() {
  headerSelector.btnOpenMenu.classList.toggle('header__menu-burger_active');
  headerSelector.btnCloseMenu.classList.toggle('header__menu-exit_active');
  headerSelector.logo.classList.toggle('header__logo_active');
  console.log('setHeaderState')
}

function openBurgerMenu() {
  burgerMenu.menu.classList.toggle('header__menu_active');
  console.log('openBurgerMenu')
}

function openSubMenu() {
  burgerMenu.submenuContainer.classList.toggle('header__menu-items_submenu-active');
}

headerSelector.btnOpenMenu.addEventListener('click', () => {
  setHeaderState();
  openBurgerMenu();
});

headerSelector.btnCloseMenu.addEventListener('click', () => {
  setHeaderState();
  openBurgerMenu();
  closeSubMenu(); 
});

function closeSubMenu(){
  burgerMenu.submenuContainer.classList.remove('header__menu-items_submenu-active');
}

burgerMenu.submenu.addEventListener('click', () => {
  openSubMenu();
});
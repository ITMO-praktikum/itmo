import './index.css';
//Burger menu
const burgerMenu = {
  burgerBtn: document.querySelector('.header__menu-burger'),
  menuContainer: document.querySelector('.burger-menu'),
  menuCloseBtn: document.querySelector('.burger-menu__close'),
  submenuTitle: document.querySelector('.burger-menu__submenu-title'),
  submenuContainer: document.querySelector('.burger-menu__submenu-items'),
  link: document.querySelectorAll('.burger-menu__link'),
}

//preventDefault
const linkArray = Array.from(burgerMenu.link)

function addPreventDefault(e){
  console.log(e.length)
  
  if (e.length == null ) {
    e.addEventListener('click', (ev) => {
      ev.preventDefault();
    })
  }
  else {
    e.forEach((el) => {
      el.addEventListener('click', (ev) => {
        ev.preventDefault();
      })
    })
  }

}

addPreventDefault(linkArray);
addPreventDefault(burgerMenu.submenuTitle);

burgerMenu.burgerBtn.addEventListener('click', () => {
  console.log('Я бургер буттон')
  burgerMenu.menuContainer.classList.toggle('burger-menu_active')
});

burgerMenu.menuCloseBtn.addEventListener('click', () => {
  console.log('я кнопка закрытия')
  burgerMenu.menuContainer.classList.toggle('burger-menu_active');
  burgerMenu.submenuContainer.classList.remove('burger-menu__submenu-items_active');
});

burgerMenu.submenuTitle.addEventListener('click', () => {
  console.log('Я субменю');
  burgerMenu.submenuContainer.classList.toggle('burger-menu__submenu-items_active');
})


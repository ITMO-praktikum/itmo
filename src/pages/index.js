import './index.css';

import CardProject from '../components/CardProject';
import Section from '../components/Section';
import Page from '../components/Page';
import { projectsList } from '../utils/constants';

// our-projects
const filterButtonAll = document.querySelector('.filter__item_all');
const filterButtonSpecial = document.querySelector('.filter__item_special');
const filterButtonNational = document.querySelector('.filter__item_national');
const filterButtonDevelopment = document.querySelector('.filter__item_development');
const cardProjectsContainer = document.querySelector('.our-projects__projects-list');
const filterListContainer = document.querySelector('.filter');
const buttonExpandFilter = document.querySelector('.our-projects__button-chevron-down');
const filterItemsList = Array.from(filterListContainer.querySelectorAll('.filter__item'));
const filterContainer = document.querySelector('.our-projects__filter');
const leftArrowPagination = document.querySelector('.our-projects__button-arrow_direction_left');
const rightArrowPagination = document.querySelector('.our-projects__button-arrow_direction_right');
const pageListContainer = document.querySelector('.our-projects__page-list');

// функция создания карточки
function createCardProject(dataCard, selectorCard) {
  const card = new CardProject(dataCard, selectorCard);
  
  return card.generateElementCard();
}

// функция фильтрации карточек проектов
function filterCardProject(dataCard, filterName) {
	return dataCard.filter(card => card.typeProject === filterName);
}

// обработчик фильтрации карточек проектов
function handleFilterCardProject(buttonName, dataCard, evt) {
	const target = evt.target;
	const newCardsList = target.closest(`.filter__item_${buttonName}`) ? filterCardProject(dataCard, buttonName) : dataCard;
	
	cardProjectsContainer.innerHTML = '';
	const cardProjectsList = new Section({
		list: newCardsList,
		renderer: item => {
			const card = createCardProject(item, '.project');
	
			cardProjectsList.addItem(card);
			}
		},
		'.our-projects__projects-list'
	);
	cardProjectsList.renderItems();
}

// функция добавления стиля выбранному фильтру
function addStyleFilter(button) {
	const buttonChecked = filterListContainer.querySelector('.filter__item_selected');
	buttonChecked.classList.remove('filter__item_selected');
	button.classList.add('filter__item_selected');
}

// слушатель событий для фильтров
function eventListenerFilter(button, typeProject, projectsList) {
	button.addEventListener('click', evt => {
		if (document.documentElement.clientWidth < 768) {
			hendleselectFilterByMobile(evt);
		}
		addStyleFilter(button);
		handleFilterCardProject(typeProject, projectsList, evt);
		renderPagination();
	});
}

// обработчик разворачивания фильтров в mobile
function expandFilter() {
	filterItemsList.forEach(item => {
		if (item.closest('.filter__item_hidden')) {
			item.classList.remove('filter__item_hidden');
		}
	});
	filterContainer.classList.add('our-projects__filter_hidden-bottom');
	buttonExpandFilter.classList.add('our-projects__button-chevron-down_hidden');
}

// обработчик выбора фильтра для экранов меньше 768
function hendleselectFilterByMobile(evt) {
	const target = evt.target;

	filterItemsList.forEach(item => {
		if (target !== item) {
			item.classList.add('filter__item_hidden');
		}
	});
	filterContainer.classList.remove('our-projects__filter_hidden-bottom');
	buttonExpandFilter.classList.remove('our-projects__button-chevron-down_hidden');
}

// функция создная страницы в our-progects
function createPage(number, containerSelector) {
  const page = new Page(number, containerSelector, renderPaginationAfterClick);
  
  return page.generatePage();
}

// функция подсчета числа страниц
function getArrayPages(amountPages) {
	const arrayPages = [];

	let i = 1;
	while (i <= amountPages) {
		arrayPages.push(i);
		i++;
	}

	return arrayPages;
}

// функция создания пагинатора
function createPagination(arrayPages) {
	pageListContainer.innerHTML = '';
	const pagination = new Section({
		list: arrayPages,
		renderer: item => {
			const page = createPage(item, '.our-projects__page');
			pagination.addItem(page);
			}
		},
	'.our-projects__page-list'
	);
	pagination.renderItems();
}

// функция отображения пагинатора на странице
function showPagination() {
	const pagesList = Array.from(document.querySelectorAll('.our-projects__page'));
	const ellipsis = document.createElement('li');
	ellipsis.innerHTML = '...';
	ellipsis.classList.add('our-projects__ellipsis');
	

	if (pagesList.length > 6) {
		/* const numberEllipsis = pagesList.length - 6;
		pagesList[numberEllipsis].after(ellipsis); */
		pagesList[3].after(ellipsis);
	}
	
	pagesList.forEach(page => {
		if ((Number(page.innerHTML) > 4) && (Number(page.innerHTML) < pagesList.length)) {
			page.classList.add('our-projects__page_hidden');
		}
	});
}

// функция рендера пагинатора
function renderPagination() {
	if (document.documentElement.clientWidth < 768) {
		const cardsList = Array.from(document.querySelectorAll('.project'));
		const amountPages = cardsList.length / 2;
		const arrayPages = getArrayPages(amountPages);
		createPagination(arrayPages);
		showPagination();	
	}
	if (document.documentElement.clientWidth < 1440 && document.documentElement.clientWidth >= 768) {
		const cardsList = Array.from(document.querySelectorAll('.project'));
		const amountPages = cardsList.length / 4;
		const arrayPages = getArrayPages(amountPages);
		createPagination(arrayPages);
		showPagination();
	}
	if (document.documentElement.clientWidth >= 1440) {
		const cardsList = Array.from(document.querySelectorAll('.project'));
		const amountPages = cardsList.length / 8;
		const arrayPages = getArrayPages(amountPages);
		createPagination(arrayPages);
		showPagination();
	}
}

// функция рендера пагинатора при клике на страницу
function renderPaginationAfterClick(page) {
	const pagesList = Array.from(document.querySelectorAll('.our-projects__page'));
	const cardsList = Array.from(document.querySelectorAll('.project'));
	const numberPage = Number(page.innerHTML)
	

	console.log(cardsList)
	//console.log(pagesList)
	//console.log(page)
	console.log(numberPage)

	if (document.documentElement.clientWidth < 768) {
		
	}
}

// добавление карточек из массива
const cardProjectsList = new Section({
  list: projectsList,
  renderer: item => {
    const card = createCardProject(item, '.project');

    cardProjectsList.addItem(card);
    }
  },
  '.our-projects__projects-list'
);
cardProjectsList.renderItems();

// фильтрация карточек проектов
eventListenerFilter(filterButtonAll, '', projectsList);
eventListenerFilter(filterButtonSpecial, 'special', projectsList);
eventListenerFilter(filterButtonNational, 'national', projectsList);
eventListenerFilter(filterButtonDevelopment, 'development', projectsList);

// разворачивание фильтров для mobile
buttonExpandFilter.addEventListener('click', _ => {
	expandFilter();
});

// рендер пагинатора
renderPagination();

// событие клика по левой стрелке пагинатора
leftArrowPagination.addEventListener('click', _ => {
	leftArrowPagination.classList.add('our-projects__button-arrow_pressed_left');
});

// событие клика по правой стрелке пагинатора
rightArrowPagination.addEventListener('click', _ => {
	rightArrowPagination.classList.add('our-projects__button-arrow_pressed_right');
});
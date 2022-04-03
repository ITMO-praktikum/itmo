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
		// рендер пагинатора
		if (document.documentElement.clientWidth < 768) {
			renderPagination(4);
		}
		if (document.documentElement.clientWidth < 1440 && document.documentElement.clientWidth >= 768) {
			renderPagination(6);
		}
		if (document.documentElement.clientWidth >= 1440) {
			renderPagination(8);
		}
		// отображение карточек, соответствующих номеру страницы
		showCardsList(1);
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

// функция отображения пагинатора
function showPagination(numberPage) {
	const pagesList = Array.from(document.querySelectorAll('.our-projects__page'));
	pagesList[0].classList.add('our-projects__page_selected');
	const ellipsis = document.createElement('li');
	ellipsis.innerHTML = '...';
	ellipsis.classList.add('our-projects__ellipsis');
	
	// отображение многоточия после каждого четвертого видимого элемента
	if (pagesList.length > 6 && numberPage < pagesList.length - 4) {
		pagesList[numberPage + 3].after(ellipsis);
	}

	// проверка на отображение первых элементов пагинатора
	if (numberPage < 5) {
		leftArrowPagination.setAttribute('disabled', true);
	}
	
	pagesList.forEach(page => {
		page.classList.add('our-projects__page_hidden');
		if (Number(page.innerHTML) >= numberPage && Number(page.innerHTML) < numberPage + 4) {
			page.classList.remove('our-projects__page_hidden');
		}
		if (Number(page.innerHTML) >= numberPage && numberPage + 4 > pagesList.length) {
			page.classList.remove('our-projects__page_hidden');
			rightArrowPagination.setAttribute('disabled', true);
		}
	});
	pagesList[pagesList.length - 1].classList.remove('our-projects__page_hidden');

	// проверка на отображение последних элементов пагинатора
	if(!document.querySelector('.our-projects__ellipsis')) {
		rightArrowPagination.setAttribute('disabled', true);
	}
} 

// функция рендера пагинатора
function renderPagination(step) {
	const cardsList = Array.from(document.querySelectorAll('.project'));
	const amountPages = cardsList.length / step;
	const arrayPages = getArrayPages(amountPages);
	createPagination(arrayPages);
	showPagination(1);
}

// функция выбора карточек для отображения
function selectCards(cardsList, numberPage, step) {
	for (let i = 0; i < cardsList.length; i++) {
		cardsList[i].classList.add('project_hidden');
		cardsList[i].id = i + 1;
		if (Number(cardsList[i].id) > numberPage * step - step && Number(cardsList[i].id) <= numberPage * step) {
			cardsList[i].classList.remove('project_hidden');
		}
	}
}

// функция отображения карточек на странице
function showCardsList(numberPage) {
	const cardsList = Array.from(document.querySelectorAll('.project'));

	if (document.documentElement.clientWidth < 768) {
		selectCards(cardsList, numberPage, 4);
	}
	if (document.documentElement.clientWidth < 1440 && document.documentElement.clientWidth >= 768) {
		selectCards(cardsList, numberPage, 6);
	}
	if (document.documentElement.clientWidth >= 1440) {
		selectCards(cardsList, numberPage, 8);
	}
}

// функция рендера пагинатора при клике на страницу
function renderPaginationAfterClick(page) {
	const beforePage = document.querySelector('.our-projects__page_selected');
	const numberPage = Number(page.innerHTML)
	
	beforePage.classList.remove('our-projects__page_selected');
	page.classList.add('our-projects__page_selected');
	showCardsList(numberPage);
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

// отображение карточек при загрузке страницы
showCardsList(1);

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
if (document.documentElement.clientWidth < 768) {
	renderPagination(4);
}
if (document.documentElement.clientWidth < 1440 && document.documentElement.clientWidth >= 768) {
	renderPagination(6);
}
if (document.documentElement.clientWidth >= 1440) {
	renderPagination(8);
}

// событие клика по левой стрелке пагинатора
leftArrowPagination.addEventListener('click', _ => {
	const pagesList = Array.from(document.querySelectorAll('.our-projects__page'));
	const filterPagesList = pagesList.filter(page => !page.closest('.our-projects__page_hidden'));
	const numberPage = Number(filterPagesList[0].innerHTML) - 4;
	const amountPages = getArrayPages(pagesList.length);

	leftArrowPagination.classList.remove('our-projects__button-arrow_pressed_left');
	rightArrowPagination.removeAttribute('disabled');
	createPagination(amountPages);
	showPagination(numberPage);
});
leftArrowPagination.addEventListener('mousedown', 
	_ => leftArrowPagination.classList.add('our-projects__button-arrow_pressed_left'));

// событие клика по правой стрелке пагинатора
rightArrowPagination.addEventListener('click', _ => {
	const pagesList = Array.from(document.querySelectorAll('.our-projects__page'));
	const filterPagesList = pagesList.filter(page => !page.closest('.our-projects__page_hidden'));
	const numberPage = Number(filterPagesList[3].innerHTML) + 1;
	const amountPages = getArrayPages(pagesList.length);

	rightArrowPagination.classList.remove('our-projects__button-arrow_pressed_right');
	leftArrowPagination.removeAttribute('disabled');
	createPagination(amountPages);
	showPagination(numberPage);
});
rightArrowPagination.addEventListener('mousedown', 
	_ => rightArrowPagination.classList.add('our-projects__button-arrow_pressed_right'));
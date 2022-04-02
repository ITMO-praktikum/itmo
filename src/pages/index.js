import './index.css';

import CardProject from '../components/CardProject';
import Section from '../components/Section';
import { projectsList } from '../utils/constants';

const filterButtonAll = document.querySelector('.filter__item_all');
const filterButtonSpecial = document.querySelector('.filter__item_special');
const filterButtonNational = document.querySelector('.filter__item_national');
const filterButtonDevelopment = document.querySelector('.filter__item_development');
const cardProjectsContainer = document.querySelector('.our-projects__projects-list');
const filterListContainer = document.querySelector('.filter');
const buttonExpandFilter = document.querySelector('.our-projects__button-chevron-down');
const filterItemsList = Array.from(filterListContainer.querySelectorAll('.filter__item'));
const filterContainer = document.querySelector('.our-projects__filter');

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

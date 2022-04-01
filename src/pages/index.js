import './index.css';

import CardProject from '../components/CardProject';
import Section from '../components/Section';
import { projectsList } from '../utils/constants';

const filterButtonAll = document.querySelector('.filter__item_all');
const filterButtonSpecial = document.querySelector('.filter__item_special');
const filterButtonNational = document.querySelector('.filter__item_national');
const filterButtonDevelopment = document.querySelector('.filter__item_development');
const cardProjectsContainer = document.querySelector('.our-projects__projects-list');
const filterContainer = document.querySelector('.filter');

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
	const newCardsList = target.closest(`.filter__item_${buttonName}`) ? filterCardProject(dataCard, buttonName) : [];
	
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
	const buttonChecked = filterContainer.querySelector('.filter__item_selected');
	buttonChecked.classList.remove('filter__item_selected');
	button.classList.add('filter__item_selected');
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
filterButtonAll.addEventListener('click', _ => {
	addStyleFilter(filterButtonAll);
	cardProjectsContainer.innerHTML = '';
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
});
filterButtonSpecial.addEventListener('click', evt => {
	addStyleFilter(filterButtonSpecial);
	handleFilterCardProject('special', projectsList, evt);
});
filterButtonNational.addEventListener('click', evt => {
	addStyleFilter(filterButtonNational);
	handleFilterCardProject('national', projectsList, evt);
});
filterButtonDevelopment.addEventListener('click', evt => {
	addStyleFilter(filterButtonDevelopment);
	handleFilterCardProject('development', projectsList, evt);
});

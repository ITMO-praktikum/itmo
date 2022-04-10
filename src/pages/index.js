import './index.css';

import Section from '../components/Section';
import Person from '../components/Person';

import { team } from '../utils/constants';

/* our-team */
// функция создания участника команды
function createPerson(data, selector) {
  const person = new Person(data, selector);

  return person.generateElementPerson();
}

// добавление участников команды из массива
const personsList = new Section({
  list: team,
  renderer: item => {
    const person = createPerson(item, '.person');

    personsList.addItem(person);
    }
  },
  '.our-team__persons'
);
personsList.renderItems();

/* swiper */
import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

const swiperOurTeam = new Swiper('.swiper', {
	cssMode: true,

  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 4,
    }
  },
  
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  
  mousewheel: true,
  keyboard: true,
});

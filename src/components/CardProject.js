export default class CardProject {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._logoLight = data.logoLight;
		this._logoDark = data.logoDark;
		this._backgroundImage = data.backgroundImage;
		this._deskription = data.deskription;
    this._cardSelector = cardSelector;
		this._typeProject = data.typeProject;
  }

	// метод, который получает шаблон карточки из разметки
  _getTemplateCard() {
  	const elementTemplate = document.querySelector('#card-project').content;
    const elementCard = elementTemplate.querySelector('.project').cloneNode(true);

    return elementCard;
  }

	// установка слушателей событий
  _setEventListeners() {
		// изменение при наведении
		this._element.addEventListener('mouseover', _ => {
			this._element.querySelector('.project__logo').src = this._logoDark;
			this._element.querySelector('.project__button-arrow-right').classList.add('project__button-arrow-right_hovered');
		});
		this._element.addEventListener('mouseout', _ => {
			!this._element.closest('.project_pressed') ?
				this._element.querySelector('.project__logo').src = this._logoLight :
				this._element.querySelector('.project__logo').src = this._logoDark;
			!this._element.closest('.project_pressed') ?
			this._element.querySelector('.project__button-arrow-right').classList.remove('project__button-arrow-right_hovered') :
				this._element.querySelector('.project__button-arrow-right').classList.add('project__button-arrow-right_hovered');
		});

		// обработчик клика по карточке
		this._element.addEventListener('click', _ => {
			this._element.querySelector('.project__logo').src = this._logoDark;
			this._element.querySelector('.project__button-arrow-right').classList.add('project__button-arrow-right_hovered');
			this._element.classList.add('project_pressed');
		});

	}

	// метод, который генерирует карточку
  generateElementCard() {
    this._element = this._getTemplateCard();
    this._setEventListeners();
		this._element.classList.add(`project__type_${this._typeProject}`);
    this._element.querySelector('.project__background-image').src = this._backgroundImage;
    this._element.querySelector('.project__logo').alt = `логотип ${this._name}`;
    this._element.querySelector('.project__logo').src = this._logoLight;
		this._element.querySelector('.project__description').innerHTML = this._deskription;

    return this._element;
  }
}
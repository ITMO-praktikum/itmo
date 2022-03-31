export default class CardProject {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._logoLight = data.logoLight;
		this._logoDark = data.logoDark;
		this._backgroundImage = data.backgroundImage;
		this._deskription = data.deskription;
    this._cardSelector = cardSelector;
		this._id = data.id;
  }

	// метод, который получает шаблон карточки из разметки
  _getTemplateCard() {
  	const elementTemplate = document.querySelector('#card-project').content;
    const elementCard = elementTemplate.querySelector('.project').cloneNode(true);

    return elementCard;
  }

	// установка слушателей событий
  _setEventListeners() {

	}

	// метод, который генерирует карточку
  generateElementCard() {
    this._element = this._getTemplateCard();
    this._setEventListeners();
    this._element.querySelector('.project__background-image').src = this._backgroundImage;
    this._element.querySelector('.project__logo').alt = `логотип ${this._name}`;
    this._element.querySelector('.project__logo').src = this._logoLight;
		this._element.querySelector('.project__description').innerHTML = this._deskription;

    return this._element;
  }
}
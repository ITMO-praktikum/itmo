export default class Page {
	constructor(number, containerSelector, render) {
    this._number = number;
		this._cardSelector = containerSelector;
    this._render = render;
  }

	// метод, который получает шаблон страницы из разметки
  _getTemplatePage() {
  	const elementTemplate = document.querySelector('#pagination').content;
    const elementCard = elementTemplate.querySelector('.our-projects__page').cloneNode(true);

    return elementCard;
  }

  // установка слушателей событий
  _setEventListeners() {
    // обработчик клика по номеру страницы
    this._element.addEventListener('click', _ => {
      this._render(this._element);
    });
  }  

	// метод, который генерирует номер страницы в пагинаторе
  generatePage() {
    this._element = this._getTemplatePage();
    this._setEventListeners();
    this._element.innerHTML = this._number;

    return this._element;
  }
}



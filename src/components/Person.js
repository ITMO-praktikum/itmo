export default class Person {
  constructor(data, personSelector) {
		this._lastName = data.lastName;
		this._firstName = data.firstName;
		this._position = data.position;
		this._academicTitle = data.academicTitle;
		this._academicDegree = data.academicDegree;
		this._photo = data.photo;
		this._personSelector = personSelector;
  }

	// метод, который получает шаблон из разметки
  _getTemplatePerson() {
  	const elementTemplate = document.querySelector('#team-person').content;
    const elementPerson = elementTemplate.querySelector(this._personSelector).cloneNode(true);

    return elementPerson;
  }

	// метод, который генерирует участника команды
  generateElementPerson() {
    this._element = this._getTemplatePerson();
		this._element.querySelector('.person__photo').src = this._photo; 
		this._element.querySelector('.person__photo').alt = `${this._lastName} ${this._firstName}`;
		this._element.querySelector('.person__name').innerHTML = `${this._lastName} <span class="person__span-transposition">${this._firstName}</span>`;
		this._academicTitle ?
			this._element.querySelector('.person__position').innerHTML = `${this._position}, <span class="person__span-position">${this._academicTitle},</span> ${this._academicDegree}` :
			this._element.querySelector('.person__position').innerHTML = `${this._position}, ${this._academicDegree}`;

    return this._element;
  }
}
export default class Section {
    constructor({ list, renderer }, selector) {
      this._renderedList = list;
      this._renderer = renderer;
      this._container = document.querySelector(selector);
    }
  
    renderItems() {
      this._renderedList.forEach(item => this._renderer(item));
    }
  
    addItem(item) {
      this._container.append(item);
    }
  }
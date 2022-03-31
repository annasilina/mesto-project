export default class Section {
    constructor({items, renderer}, selector) {
        this._container = document.querySelector(selector);
        this._renderer = renderer;
        this._initialItems = items;
    }

    setItem = (item) => {
        this._container.append(item);
    };

    renderItems = () => {
        this._initialItems.forEach((item) => this._renderer(item));
    };

    addItem = (item) => {
        this._container.prepend(item);
    };
}
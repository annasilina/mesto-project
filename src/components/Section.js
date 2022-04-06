export default class Section {
    constructor({renderer}, selector) {
        this._container = document.querySelector(selector);
        this._renderer = renderer;
    }

    setItem = (item) => {
        this._container.append(item);
    };

    renderItems = (items, currentUserId) => {
        items.forEach((item) => this._renderer(item, currentUserId));
    };

    addItem = (item) => {
        this._container.prepend(item);
    };
}
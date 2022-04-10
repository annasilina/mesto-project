export default class Section {
    constructor({renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    setItem = (item) => {
        this._container.append(item);
    };

    renderItems = (items, currentUserId) => {
        items.forEach((item) => this.setItem(this._renderer(item, currentUserId)));
    };

    addItem = (item, currentUserId) => {
        const card = this._renderer(item, currentUserId)
        this._container.prepend(card);
    };
}
export default class Popup {
    constructor(popupSelector) {
        this.selector = document.querySelector(popupSelector);
        console.log(popupSelector);
    }

    open() {
        this.selector.classList.add('popup_opened');
    }

    close() {
        this.selector.classList.remove('popup_opened');
    }

    _handleEscClose() {

    }

    setEventListeners() {

    }
    return
}
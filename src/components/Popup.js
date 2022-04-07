export default class Popup {
    constructor(popupSelector) {
        this._selector = document.querySelector(popupSelector);
    }

    open() {
        this._selector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose.bind(this));
    }

    close() {
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) { //оверлей
                this.close();
            }

            if (evt.target.classList.contains('popup__button-close')) { //оверлей
                this.close();
            }
        })
    }
}


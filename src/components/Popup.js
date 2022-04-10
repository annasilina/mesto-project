export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeHandleEsc = this._closeHandleEsc.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeHandleEsc);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeHandleEsc);
    }

    _closeHandleEsc(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) { //оверлей
                this.close();
            }

            if (evt.target.classList.contains('popup__button-close')) { //оверлей
                this.close();
            }
        })
    }
}


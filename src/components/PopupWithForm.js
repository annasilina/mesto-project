import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleSubmitForm}) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__form-input'));
        this._buttonSubmit = this._form.querySelector('.popup__button-save');
    }

    _getInputValues() {
        this._inputValues = {};

        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    open(inputValues) {
        super.open();
        this._inputList.forEach((input) => {
            inputValues ? input.value = inputValues[input.name] : input.value = "";
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const initialButtonText = this._buttonSubmit.textContent;

            this._handleSubmitForm(this._getInputValues())
              .then(() => this.close())
              .finally(() => this.renderLoading(false, initialButtonText));
        });
    }

    renderLoading(isLoading, text) {
        if (isLoading) {
            this._buttonSubmit.disabled = true;
            this._buttonSubmit.textContent = text;
        } else {
            this._buttonSubmit.disabled = false;
            this._buttonSubmit.textContent = text;
        }
    }
}
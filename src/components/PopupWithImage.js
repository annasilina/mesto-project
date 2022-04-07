import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._titlePopup = this._popup.querySelector('.popup__place-caption');
        this._link = this._popup.querySelector('.popup__place-photo');
    }

    open(name, link) {
        super.open();
        this._titlePopup.textContent = name;
        this._link.src = link;
        this._link.alt = name;
    }
}
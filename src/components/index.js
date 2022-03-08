import '../pages/index.css';
import { initialPlaces, gallery, createPlace } from './card.js';
import { formConfig } from './constants.js';
import { enableValidation } from './validate.js';
import {
	profile,
	formProfileEdit,
	formPlaceAdd,
	closePopup,
	openPopupProfileEdit,
	openPopupPlaceAdd,
	openPopupAvatarChange,
	submitFormProfileEdit,
	submitFormPlaceAdd, popups,
} from '/src/components/modal.js';


// находим кнопки открытия попапов с формами
const buttonOpenPopupProfileEdit = profile.querySelector('.profile__button-edit');
const buttonOpenPopupPlaceAdd = profile.querySelector('.profile__button-add');
const buttonOpenPopupAvatarChange = profile.querySelector('.profile__button');

// рендерим и вставляем элементы галереи по умолчанию
initialPlaces.forEach(place => {
	gallery.append(createPlace(place));
});

// обработчики кнопок открытия попапов редактирования профиля, аватарки и добавления места
buttonOpenPopupProfileEdit.addEventListener('click', openPopupProfileEdit);
buttonOpenPopupPlaceAdd.addEventListener('click', openPopupPlaceAdd);
buttonOpenPopupAvatarChange.addEventListener('click', openPopupAvatarChange)


//обработчик закрытия попапов по клику на кнопку закрытия и overlay
popups.forEach(popup => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup_opened')) {
			closePopup(popup);
		}

		if (evt.target.classList.contains('popup__button-close')) {
			closePopup(popup);
		}
	});
});


// обработчик отправки формы редактирования профиля
formProfileEdit.addEventListener('submit', submitFormProfileEdit);

// обработчик отправки формы добавления нового элемента в галерею
formPlaceAdd.addEventListener('submit', submitFormPlaceAdd);

// запускаем валидацию форм на странице
enableValidation(formConfig);
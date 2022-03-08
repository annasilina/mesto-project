import { initialPlaces, gallery, createPlace } from './card.js';
import { formConfig } from './constants.js';
import { enableValidation } from './validate.js';
import {
	openPopupProfileEdit,
	openPopupPlaceAdd,
	closePopupByEvents,
	profile,
	formProfileEdit,
	formPlaceAdd,
	submitFormProfileEdit,
	submitFormPlaceAdd,
} from './modal.js';


// находим кнопки открытия попапов с формами
const buttonOpenPopupProfileEdit = profile.querySelector('.profile__button-edit');
const buttonOpenPopupPlaceAdd = profile.querySelector('.profile__button-add');

// рендерим и вставляем элементы галереи по умолчанию
initialPlaces.forEach(place => {
	gallery.append(createPlace(place));
});

// обработчики кнопок открытия попапов редактирования профиля и добавления места
buttonOpenPopupProfileEdit.addEventListener('click', openPopupProfileEdit);
buttonOpenPopupPlaceAdd.addEventListener('click', openPopupPlaceAdd);


//обработчик закрытия попапов по клику на все возможные элементы: кнопка закрытия, escape, overlay
document.addEventListener('click', closePopupByEvents);

//обработчик закрытия попапов по нажатию кнопки escape
document.addEventListener('keyup', closePopupByEvents);


// обработчик отправки формы редактирования профиля
formProfileEdit.addEventListener('submit', submitFormProfileEdit);

// обработчик отправки формы добавления нового элемента в галерею
formPlaceAdd.addEventListener('submit', submitFormPlaceAdd);

// запускаем валидацию форм на странице
enableValidation(formConfig);
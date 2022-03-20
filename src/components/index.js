import '../pages/index.css';
import {getInitialPlaces, getUserInfo} from './api.js';
import {renderGallery} from './card.js';
import {profile, setProfileParams} from './profile.js';
import {formConfig} from './constants.js';
import {enableValidation} from './validate.js';
import {
	closePopup,
	formAvatarChange,
	formPlaceAdd,
	formProfileEdit,
	openPopupAvatarChange,
	openPopupPlaceAdd,
	openPopupProfileEdit,
	popups,
	submitFormAvatarChange,
	submitFormPlaceAdd,
	submitFormProfileEdit,
} from '/src/components/modal.js';

// получаем и присваиваем данные профиля
/*getUserInfo()
	.then(userData => {
		setProfileParams(userData)
		// получаем и вставляем элементы галереи по умолчанию
		getInitialPlaces()
			.then(places => {
				renderGallery(places)
			})
			.catch(err => console.log(err));
	})
	.catch(err => console.log(err));*/

Promise.all([getUserInfo(), getInitialPlaces()])
	.then(([userData, places]) => {
		setProfileParams(userData);
		renderGallery(places);
	})
	.catch(err => console.log(err));

// находим кнопки открытия попапов с формами
const buttonOpenPopupAvatarChange = profile.querySelector('.profile__button-edit_el_avatar');
const buttonOpenPopupProfileEdit = profile.querySelector('.profile__button-edit_el_info');
const buttonOpenPopupPlaceAdd = profile.querySelector('.profile__button-add');

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

// обработчик отправки формы обновления аватара
formAvatarChange.addEventListener('submit', submitFormAvatarChange);

// обработчик отправки формы редактирования профиля
formProfileEdit.addEventListener('submit', submitFormProfileEdit);

// обработчик отправки формы добавления нового элемента в галерею
formPlaceAdd.addEventListener('submit', submitFormPlaceAdd);

// запускаем валидацию форм на странице
enableValidation(formConfig);

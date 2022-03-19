import '../pages/index.css';
import { getInitialPlaces, getUserInfo } from './api.js';
import { gallery, createPlace } from './card.js';
import { profile, avatar, userBio, userName } from './profile.js';
import { formConfig } from './constants.js';
import { enableValidation } from './validate.js';
import {
	popups,
	formProfileEdit,
	formPlaceAdd,
	formAvatarChange,
	closePopup,
	openPopupProfileEdit,
	openPopupPlaceAdd,
	openPopupAvatarChange,
	submitFormProfileEdit,
	submitFormAvatarChange,
	submitFormPlaceAdd,
} from '/src/components/modal.js';

let currentUserId = {}

// получаем данные профиля
getUserInfo()
	.then(userData => {
		userName.textContent = userData.name;
		userBio.textContent = userData.about;
		avatar.src = userData.avatar;
		currentUserId = userData['_id'];
	})
	.catch((err) => console.log(err));

// получаем и вставляем элементы галереи по умолчанию
getInitialPlaces()
	.then(places => {
		places.forEach(place => {
			gallery.append(createPlace(place, currentUserId));
		})
	})
	.catch((err) => console.log(err));

/*Promise.all([getInitialPlaces, getUserInfo])
	.then(getInitialPlaces.userData => )*/

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

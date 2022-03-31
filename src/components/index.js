import '../pages/index.css';
// import {getInitialPlaces, getUserInfo} from './Api.js';
import Api from './Api.js';
import {renderGallery} from './card.js';
import {profile, setProfileParams, currentUserId} from './profile.js';
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
} from './modal.js';

// базовый объект-конфиг для api-запросов
const configApi = {
	baseURL: 'https://nomoreparties.co/v1/plus-cohort7',
	headers: {
		authorization: '963eab40-f1b1-4bf3-8893-fd8fa8464a41',
		'Content-Type': 'application/json'
	}
}

export const api = new Api(configApi);

// получаем и присваиваем данные профиля и рендерим начальные карточки
Promise.all([api.getUserInfo(), api.getInitialPlaces()])
	.then(([userData, places]) => {
		setProfileParams(userData); // устанавливаем данные профиля
		renderGallery(places); // рендерим карточки
	})
	.catch(err => console.log(err));

// находим кнопки открытия попапов с формами
const buttonOpenPopupAvatarChange = profile.querySelector('.profile__button-edit_el_avatar');
const buttonOpenPopupProfileEdit = profile.querySelector('.profile__button-edit_el_info');
const buttonOpenPopupPlaceAdd = profile.querySelector('.profile__button-add');

// слушаем кнопки открытия попапов с формами
buttonOpenPopupProfileEdit.addEventListener('click', openPopupProfileEdit);
buttonOpenPopupPlaceAdd.addEventListener('click', openPopupPlaceAdd);
buttonOpenPopupAvatarChange.addEventListener('click', openPopupAvatarChange)

//вешаем обработчик на клики по кнопке закрытия попапа и оверлей для каждого попапа
popups.forEach(popup => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup_opened')) { //оверлей
			closePopup(popup);
		}

		if (evt.target.classList.contains('popup__button-close')) { //попап
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

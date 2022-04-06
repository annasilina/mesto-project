import '../pages/index.css';
// import {getInitialPlaces, getUserInfo} from './Api.js';
import Api from './Api.js';
import Card from './Card.js';
import Section from './Section.js';
import UserInfo from "./UserInfo.js";
// import {userInfo, setProfileParams, currentUserId} from './UserInfo.js';
import {formConfig, userInfo,
	avatar, userBio, userName,
	buttonOpenPopupAvatarChange,
	buttonOpenPopupProfileEdit,
	buttonOpenPopupPlaceAdd } from './constants.js';

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
import PopupWithForm from './PopupWithForm';
import  PopupWithImage from './PopupWithImage'

// базовый объект-конфиг для api-запросов
const configApi = {
	baseURL: 'https://nomoreparties.co/v1/plus-cohort7',
	headers: {
		authorization: '963eab40-f1b1-4bf3-8893-fd8fa8464a41',
		'Content-Type': 'application/json'
	}
}

export const api = new Api(configApi);

const userDataObject = new UserInfo(userName, userBio, avatar);

const cardSection = new Section({
	renderer: (item, currentUserId) => cardSection.setItem(createNewCard(item, currentUserId))
}, '.gallery');

const handleLikeToggle = (card) => {
	if (card.getLikeStatus()) {
		api.deleteLikeAtPlace(card._id)
			.then((newCardData) => {
				card.renderLikes(newCardData);
			})
			.catch(err => console.log(err));
	} else {
		api.putLikeAtPlace(card._id)
			.then((newCardData) => {
				card.renderLikes(newCardData);
			})
			.catch(err => console.log(err));
	}
}

// give information for popup full size
const clickCard = (name, link) => {
	popupPlaceShow.open(name, link);
}
// get information for popup full size from object class Card
const handleCardClick = (fullImage) => {
	clickCard(fullImage._name, fullImage._link);
}


const createNewCard = (item, currentUserId) => {
	const cardObject = new Card(item, handleLikeToggle, handleCardClick, '#place-template');
	const cardElement = cardObject.createCard(currentUserId);



	return cardElement;
}

// получаем и присваиваем данные профиля и рендерим начальные карточки
Promise.all([api.getUserInfo(), api.getInitialPlaces()])
	.then(([userData, initialItems]) => {
		const currentUserId = userData._id;
		userDataObject.setUserInfo(userData); // устанавливаем данные профиля
		cardSection.renderItems(initialItems, currentUserId); // рендерим карточки
	})
	.catch(err => console.log(err));


// слушаем кнопки открытия попапов с формами
buttonOpenPopupPlaceAdd.addEventListener('click', () => {
	popupNewPlace.open()
});

buttonOpenPopupProfileEdit.addEventListener('click', () => {
	popupProfileEdit.open();
});

buttonOpenPopupAvatarChange.addEventListener('click', () => {
	popupAvatarEdit.open();
})

// создаем обьект с селектором для попапов
const popupNewPlace = new PopupWithForm({
	popupSelector: '.popup_type_place-add',
});

const popupProfileEdit = new PopupWithForm({
	popupSelector: '.popup_type_profile-edit',
});

const popupAvatarEdit = new PopupWithForm({
	popupSelector: '.popup_type_avatar-change',
});

const popupPlaceShow = new PopupWithImage({
	popupSelector: '.popup_type_place-show',
});










// находим кнопки открытия попапов с формами
// todo константы кнопок перенёс в ф-л константы
// const buttonOpenPopupAvatarChange = userInfo.querySelector('.profile__button-edit_el_avatar');
// const buttonOpenPopupProfileEdit = userInfo.querySelector('.profile__button-edit_el_info');
// const buttonOpenPopupPlaceAdd = userInfo.querySelector('.profile__button-add');



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

import '../pages/index.css';
// import {getInitialPlaces, getUserInfo} from './Api.js';
import Api from './Api.js';
import Card from './Card.js';
import Section from './Section.js';
import UserInfo from "./UserInfo.js";
// import {userInfo, setProfileParams, currentUserId} from './UserInfo.js';
import {formConfig, userInfo, avatar, userBio, userName} from './constants.js';
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

const createNewCard = (item, currentUserId) => {
	const cardObject = new Card(item, handleLikeToggle, '#place-template');
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

// находим кнопки открытия попапов с формами
const buttonOpenPopupAvatarChange = userInfo.querySelector('.profile__button-edit_el_avatar');
const buttonOpenPopupProfileEdit = userInfo.querySelector('.profile__button-edit_el_info');
const buttonOpenPopupPlaceAdd = userInfo.querySelector('.profile__button-add');

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

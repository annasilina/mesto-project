import '../pages/index.css';
import Api from './Api.js';
import Card from './Card.js';
import Section from './Section.js';
import UserInfo from "./UserInfo.js";
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm';
import  PopupWithImage from './PopupWithImage'
import {
	formConfig,
	apiConfig,
	avatar,
	userBio,
	userName,
	formAvatarChange,
	formProfileEdit,
	formPlaceAdd,
	buttonOpenPopupAvatarChange,
	buttonOpenPopupProfileEdit,
	buttonOpenPopupPlaceAdd,
} from './constants.js';

// переменные для отработки удаления карточки
let buttonDelete;
let cardIdDelete;

// создаем объект с запросами к серверу
const api = new Api(apiConfig);

// создаем объект с данными пользователя
const userDataObject = new UserInfo(userName, userBio, avatar);

// создаем объект для отрисовки секции с карточками (галереи)
const cardSection = new Section({
	renderer: (item, currentUserId) => cardSection.setItem(createNewCard(item, currentUserId))
}, '.gallery');

// создаем объект попапа с добавлением карточки
const popupNewPlace = new PopupWithForm(
	'.popup_type_place-add',
	{handleSubmitForm: (cardData) => {
			popupNewPlace.dataLoading(true, 'Сохранение...');
			api.sendNewCard(cardData.placeName, cardData.placeLink)
				.then((cardData) => {
					const currentUserId = cardData.owner._id;

					cardSection.addItem(createNewCard(cardData, currentUserId));
					popupNewPlace.close();
				})
				.catch(err => console.log(err))
				.finally(() => popupNewPlace.dataLoading(false, 'Создать'));
		}
	});

// создаем объект попапа с обновлением имени и подписи
const popupProfileEdit = new PopupWithForm(
	'.popup_type_profile-edit',
	{handleSubmitForm: (newInfo) => {
			popupProfileEdit.dataLoading(true, 'Cохранение...');
			api.sendUserInfo(newInfo.userName, newInfo.userBio)
				.then((userInfo) => {
					userDataObject.setUserInfo(userInfo);
					popupProfileEdit.close();
				})
				.catch(err => console.log(err))
				.finally(() => popupProfileEdit.dataLoading(false, 'Сохранить'));
		}
	});

// создаем объект попапа с обновлением аватара
const popupAvatarEdit = new PopupWithForm(
	'.popup_type_avatar-change',
	{handleSubmitForm: (newImage) => {
			popupAvatarEdit.dataLoading(true, 'Cохранение...');
			api.sendAvatar(newImage.avatarLink)
				.then((newImage) => {
					// avatar.src = avatarInput.value;

					userDataObject.setUserInfo(newImage);
					popupAvatarEdit.close();
				})
				.catch(err => console.log(err))
				.finally(() => popupAvatarEdit.dataLoading(false, 'Сохранить'));
		}
	});

// создаем объект попапа для подтверждения удаления карточки
const popupConfirmDelete = new PopupWithForm('.popup_type_card-delete',
	{handleSubmitForm: () => {
			popupConfirmDelete.dataLoading(true, 'Удаление...')
			api.removeCard(cardIdDelete)
				.then(() => {
					buttonDelete.parentElement.remove();
					popupConfirmDelete.close();
				})
				.catch((err) => console.log(err))
				.finally(() => popupConfirmDelete.dataLoading(false, 'Да'));
		}
	});

// создаем объект попапа для просмотра увеличенной фотографии
const popupPlaceShow = new PopupWithImage('.popup_type_place-show');

// вешаем обработчики на попапы
popupNewPlace.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarEdit.setEventListeners();
popupPlaceShow.setEventListeners();
popupConfirmDelete.setEventListeners();

// создаем обекты-валидаторы для каждой формы на странице
const formAvatarChangeValidator = new FormValidator(formConfig, formAvatarChange);
const formProfileEditValidator = new FormValidator(formConfig, formProfileEdit);
const formPlaceAddValidator = new FormValidator(formConfig, formPlaceAdd);

//запускаем валидацию для каждой формы на странице
formAvatarChangeValidator.enableValidation();
formProfileEditValidator.enableValidation();
formPlaceAddValidator.enableValidation();

// слушаем кнопки открытия попапов с формами
buttonOpenPopupPlaceAdd.addEventListener('click', () => {
	formPlaceAddValidator.resetFormData();
	formPlaceAddValidator.setButtonState();
	popupNewPlace.open();
});

buttonOpenPopupProfileEdit.addEventListener('click', () => {
	formProfileEditValidator.resetFormData();
	popupProfileEdit.open(userDataObject.getUserInfo());
	formProfileEditValidator.setButtonState();
});

buttonOpenPopupAvatarChange.addEventListener('click', () => {
	formAvatarChangeValidator.resetFormData();
	formAvatarChangeValidator.setButtonState();
	popupAvatarEdit.open();
});


// получаем и присваиваем данные профиля и рендерим начальные карточки
Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then(([userData, initialItems]) => {
		const currentUserId = userData._id;
		userDataObject.setUserInfo(userData); // устанавливаем данные профиля
		cardSection.renderItems(initialItems, currentUserId); // рендерим карточки
	})
	.catch(err => console.log(err));

// функция создания нового элемента карточки
const createNewCard = (item, currentUserId) => {
	const cardObject = new Card(item, handleLikeToggle, handleCardClick, handleCardDelete, '#place-template');
	const cardElement = cardObject.createCard(currentUserId);

	return cardElement;
}

// функция отработки постановки/снятия лайка
const handleLikeToggle = (card) => {
	if (card.getLikeStatus()) {
		api.deleteLikeAtCard(card._id)
			.then((newCardData) => {
				card.renderLikes(newCardData);
			})
			.catch(err => console.log(err));
	} else {
		api.putLikeAtCard(card._id)
			.then((newCardData) => {
				card.renderLikes(newCardData);
			})
			.catch(err => console.log(err));
	}
}

// функция открытия попапа с картинкой
const handleCardClick = (name, link) => {
	popupPlaceShow.open(name, link);
}

// функция для открытия попапа-подтверждения по клику на кнопку удаления карточки
const handleCardDelete = (button, id)  => {
	popupConfirmDelete.open();
	buttonDelete = button;
	cardIdDelete = id;
}
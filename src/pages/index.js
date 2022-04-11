import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from "../components/UserInfo.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm';
import  PopupWithImage from '../components/PopupWithImage'
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
} from '../utils/constants.js';

// переменные для отработки удаления карточки
let cardDelete;
let cardIdDelete;

// пустой объект для валидаторов форм
const formValidators = {};

// создаем объект с запросами к серверу
const api = new Api(apiConfig);

// создаем объект с данными пользователя
const userDataObject = new UserInfo(userName, userBio, avatar);

// создаем объект для отрисовки секции с карточками (галереи)
const cardSection = new Section({
	renderer: (item, currentUserId) => {
		const cardObject = new Card(item, handleToggleLike, handleClickCard, handleDeleteCard, '#place-template');
		const cardElement = cardObject.createCard(currentUserId);

		return cardElement;
	}
}, '.gallery');

// создаем объект попапа с добавлением карточки
const popupNewPlace = new PopupWithForm(
	'.popup_type_place-add',
	{handleSubmitForm: (cardData) => {
		popupNewPlace.renderLoading(true, 'Сохранение...');
		api.sendNewCard(cardData.placeName, cardData.placeLink)
			.then((cardData) => {
				const currentUserId = cardData.owner._id;

				cardSection.addItem(cardData, currentUserId);
				popupNewPlace.close();
			})
			.catch(err => console.log(err))
			.finally(() => popupNewPlace.renderLoading(false, 'Создать'));
		}
	});

// создаем объект попапа с обновлением имени и подписи
const popupProfileEdit = new PopupWithForm(
	'.popup_type_profile-edit',
	{handleSubmitForm: (newInfo) => {
		popupProfileEdit.renderLoading(true, 'Cохранение...');
		api.sendUserInfo(newInfo.userName, newInfo.userBio)
			.then((userInfo) => {
				userDataObject.setUserInfo(userInfo);
				popupProfileEdit.close();
			})
			.catch(err => console.log(err))
			.finally(() => popupProfileEdit.renderLoading(false, 'Сохранить'));
		}
	});

// создаем объект попапа с обновлением аватара
const popupAvatarEdit = new PopupWithForm(
	'.popup_type_avatar-change',
	{handleSubmitForm: (newImage) => {
			popupAvatarEdit.renderLoading(true, 'Cохранение...');
			api.sendAvatar(newImage.avatarLink)
				.then((newImage) => {
					userDataObject.setUserInfo(newImage);
					popupAvatarEdit.close();
				})
				.catch(err => console.log(err))
				.finally(() => popupAvatarEdit.renderLoading(false, 'Сохранить'));
		}
	});

// создаем объект попапа для подтверждения удаления карточки
const popupConfirmDelete = new PopupWithForm('.popup_type_card-delete',
	{handleSubmitForm: () => {
		popupConfirmDelete.renderLoading(true, 'Удаление...')
		api.removeCard(cardIdDelete)
			.then(() => {
				cardDelete.deleteCard();
				popupConfirmDelete.close();
			})
			.catch((err) => console.log(err))
			.finally(() => popupConfirmDelete.renderLoading(false, 'Да'));
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

// функция запуска валидации для каждой формы
const enableAllValidation = (formConfig) => {
	const formList = Array.from(document.querySelectorAll(formConfig.formSelector))

	formList.forEach((formElement) => {
		const validator = new FormValidator(formConfig, formElement);
		const formName = formElement.getAttribute('name');

		formValidators[formName] = validator;
		validator.enableValidation();
	});
};

// Включение валидации
enableAllValidation(formConfig);


// слушаем кнопки открытия попапов с формами
buttonOpenPopupPlaceAdd.addEventListener('click', () => {
	formValidators['formPlaceAdd'].resetFormData();
	formValidators['formPlaceAdd'].setButtonState();
	popupNewPlace.open();
});

buttonOpenPopupProfileEdit.addEventListener('click', () => {
	formValidators['formProfileEdit'].resetFormData();
	popupProfileEdit.open(userDataObject.getUserInfo());
	formValidators['formProfileEdit'].setButtonState();
});

buttonOpenPopupAvatarChange.addEventListener('click', () => {
	formValidators['formAvatarChange'].resetFormData();
	formValidators['formAvatarChange'].setButtonState();
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

// функция отработки постановки/снятия лайка
const handleToggleLike = (card) => {
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
const handleClickCard = (name, link) => {
	popupPlaceShow.open(name, link);
}

// функция для открытия попапа-подтверждения по клику на кнопку удаления карточки
const handleDeleteCard = (card, id)  => {
	popupConfirmDelete.open();
	cardDelete = card;
	cardIdDelete = id;
}
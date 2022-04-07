import '../pages/index.css';
import Api from './Api.js';
import Card from './Card.js';
import Section from './Section.js';
import UserInfo from "./UserInfo.js";
import FormValidator from './FormValidator.js';
import {
	submitFormAvatarChange,
	submitFormPlaceAdd,
	submitFormProfileEdit,
} from './modal.js';
import {
	formConfig,
	apiConfig,
	/*userInfo,*/
	avatar,
	userBio,
	userName,
	formAvatarChange,
	formProfileEdit,
	formPlaceAdd,
	buttonOpenPopupAvatarChange,
	buttonOpenPopupProfileEdit,
	buttonOpenPopupPlaceAdd, placeNameInput, placeLinkInput, popupPlaceAdd, userNameInput, userBioInput,
} from './constants.js';
import PopupWithForm from './PopupWithForm';
import  PopupWithImage from './PopupWithImage'

// создаем объект с запросами к серверу
export const api = new Api(apiConfig);

// создаем объект с данными пользователя
const userDataObject = new UserInfo(userName, userBio, avatar);

// создаем обекты-валидаторы для каждой формы на странице
export const formAvatarChangeValidator = new FormValidator(formConfig, formAvatarChange);
export const formProfileEditValidator = new FormValidator(formConfig, formProfileEdit);
export const formPlaceAddValidator = new FormValidator(formConfig, formPlaceAdd);

//запускаем валидацию для каждой формы на странице
formAvatarChangeValidator.enableValidation();
formProfileEditValidator.enableValidation();
formPlaceAddValidator.enableValidation();

// создаем объект для отрисовки секции с карточками (галереи)
export const cardSection = new Section({
	renderer: (item, currentUserId) => cardSection.setItem(createNewCard(item, currentUserId))
}, '.gallery');

// получаем и присваиваем данные профиля и рендерим начальные карточки
Promise.all([api.getUserInfo(), api.getInitialPlaces()])
	.then(([userData, initialItems]) => {
		const currentUserId = userData._id;
		userDataObject.setUserInfo(userData); // устанавливаем данные профиля
		cardSection.renderItems(initialItems, currentUserId); // рендерим карточки
	})
	.catch(err => console.log(err));

// функция создания нового элемента карточки
export const createNewCard = (item, currentUserId) => {
	const cardObject = new Card(item, handleLikeToggle, handleCardClick, '#place-template');
	const cardElement = cardObject.createCard(currentUserId);

	return cardElement;
}
// функция отработки постановки/снятия лайка
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

// функция открытия попапа с картинкой
const handleCardClick = (name, link) => {
	popupPlaceShow.open(name, link);
}

// слушаем кнопки открытия попапов с формами
buttonOpenPopupPlaceAdd.addEventListener('click', () => {
	formPlaceAddValidator.resetFormData();
	formPlaceAddValidator.setButtonState();
	popupNewPlace.open();
});

buttonOpenPopupProfileEdit.addEventListener('click', () => {
	formProfileEditValidator.resetFormData();
	formProfileEditValidator.setButtonState();
	popupProfileEdit.open();
});

buttonOpenPopupAvatarChange.addEventListener('click', () => {
	formAvatarChangeValidator.resetFormData();
	formAvatarChangeValidator.setButtonState();
	popupAvatarEdit.open();
})

// создаем обьект с селектором для попапов
const popupNewPlace = new PopupWithForm(
	'.popup_type_place-add',
	{handleSubmitForm: (cardData) => {
		formPlaceAddValidator.dataLoading(true);
		api.sendNewCard(cardData.placeName, cardData.placeLink)
			.then((cardData) => {
				const currentUserId = cardData.owner._id;

				cardSection.addItem(createNewCard(cardData, currentUserId));
				popupNewPlace.close();
			})
			.catch(err => console.log(err))
			.finally(() => formPlaceAddValidator.dataLoading(false));
		}
});

/*const popupProfileEdit = new PopupWithForm(
	'.popup_type_profile-edit',
	{handleSubmitForm: (userData) => {
		formProfileEditValidator.dataLoading(true);
			api.sendUserInfo(userNameInput.value, userBioInput.value)
				.then(() => {
					userName.textContent = userNameInput.value;
					userBio.textContent = userBioInput.value;

					closePopup(popupProfileEdit);
				})
				.catch(err => console.log(err))
				.finally(() => formProfileEditValidator.dataLoading(false));
		}
	});

const popupAvatarEdit = new PopupWithForm('.popup_type_avatar-change');*/

const popupPlaceShow = new PopupWithImage('.popup_type_place-show');

popupNewPlace.setEventListeners();
/*popupProfileEdit.setEventListeners();
popupAvatarEdit.setEventListeners();*/
popupPlaceShow.setEventListeners();

// обработчик отправки формы обновления аватара
formAvatarChange.addEventListener('submit', submitFormAvatarChange);

// обработчик отправки формы редактирования профиля
formProfileEdit.addEventListener('submit', submitFormProfileEdit);


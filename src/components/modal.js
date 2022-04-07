import {
	avatar,
	avatarInput,
	/*placeCaption,*/
	placeLinkInput,
	placeNameInput,
	/*placePhoto,*/
	popupAvatarChange,
	popupPlaceAdd,
	/*popupPlaceShow,*/
	popupProfileEdit,
	userBio,
	userBioInput,
	userName,
	userNameInput
} from './constants.js';
import {
	api,
	formPlaceAddValidator,
	formProfileEditValidator,
	formAvatarChangeValidator,
	cardSection,
	createNewCard,
} from './index.js';



// функция для открытия попапов
function openPopup(popup) {
	popup.classList.add('popup_opened');

	document.addEventListener('keyup', closePopupByEcs); // вешаем обработчик кнопки Esc
}

// функция для закрытия попапов
function closePopup(popup) {
	popup.classList.remove('popup_opened');

	document.removeEventListener('keyup', closePopupByEcs); // снимаем обработчик кнопки Esc
}

//функция закрытия попапа по нажатию кнопки escape
function closePopupByEcs(evt) {
	if (evt.key === 'Escape') {
		const currentPopup = document.querySelector('.popup_opened');

		closePopup(currentPopup);
	}
}

// функция открытия попапа редактирования профиля
function openPopupProfileEdit() {
	formProfileEditValidator.resetFormData(); // обнуляем введенные при прошлом открытии попапа
	// данные и ошибки,
	// если они были

	// устанавливаем текущие данные из профиля на странице
	userNameInput.value = userName.textContent;
	userBioInput.value = userBio.textContent;

	formProfileEditValidator.setButtonState(); // устанавливаем стейт кнопки сабмита
	openPopup(popupProfileEdit); // открываем попап
}

// функция открытия попапа редактирования аватара
function openPopupAvatarChange() {
	formAvatarChangeValidator.resetFormData(); // обнуляем введенные при прошлом открытии
	// попапа данные и ошибки,
	// если они были
	formAvatarChangeValidator.setButtonState(); // устанавливаем стейт кнопки сабмита
	openPopup(popupAvatarChange); // открываем попап
}

// функция открытия попапа добавления места
function openPopupPlaceAdd() {
	formPlaceAddValidator.resetFormData(); // обнуляем введенные при прошлом открытии попапа
	// данные и ошибки,
	// если они были
	formPlaceAddValidator.setButtonState(); // устанавливаем стейт кнопки сабмита
	openPopup(popupPlaceAdd); // открываем попап
}

// функция открытия попапа просмотра фотографий карточки места


// функция отправки данных из формы обновления аватара
function submitFormAvatarChange(evt) {
	evt.preventDefault();

	formAvatarChangeValidator.dataLoading(true);
	api.sendAvatar(avatarInput.value)
		.then(() => {
			avatar.src = avatarInput.value;

			closePopup(popupAvatarChange);
		})
		.catch(err => console.log(err))
		.finally(() => formAvatarChangeValidator.dataLoading(false));
}

// функция отправки данных из формы редактирования профиля
function submitFormProfileEdit(evt) {
	evt.preventDefault();

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



export {
	openPopupAvatarChange,
	openPopupProfileEdit,
	openPopupPlaceAdd,
	submitFormProfileEdit,
	submitFormAvatarChange,
}
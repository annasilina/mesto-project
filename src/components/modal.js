import {formConfig} from './constants.js';
import {resetFormData, setButtonState, dataLoading} from './validate.js';
import {addNewPlace, createPlace} from './card.js';
import {avatar, userBio, userName} from './profile.js';
// import {sendAvatar, sendNewCard, sendUserInfo} from './Api.js';
import {api} from './index.js';

//находим все попапы
const popups = document.querySelectorAll('.popup');

// находим попап и форму редактирования аватара, в ней - поле ввода для ссылки на картинку
const popupAvatarChange = document.querySelector('.popup_type_avatar-change');
const formAvatarChange = popupAvatarChange.querySelector('.popup__form');
const avatarInput = formAvatarChange.elements.avatarLink;

// находим попап и форму редактирования профиля, в ней - поля ввода имени и подписи пользователя
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const userNameInput = formProfileEdit.elements.userName;
const userBioInput = formProfileEdit.elements.userBio;

// находим попап и форму добавления карточки места в галерею, в ней - поля ввода для фото и названия места
const popupPlaceAdd = document.querySelector('.popup_type_place-add');
const formPlaceAdd = popupPlaceAdd.querySelector('.popup__form');
const placeLinkInput = formPlaceAdd.elements.placeLink;
const placeNameInput = formPlaceAdd.elements.placeName;

// находим попап просмотра увеличенной фотографии места и его элементы (фото и подпись к нему)
const popupPlaceShow = document.querySelector('.popup_type_place-show');
const placePhoto = popupPlaceShow.querySelector('.popup__place-photo');
const placeCaption = popupPlaceShow.querySelector('.popup__place-caption')

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
	resetFormData(formProfileEdit, formConfig); // обнуляем введенные при прошлом открытии попапа данные и ошибки,
	// если они были

	// устанавливаем текущие данные из профиля на странице
	userNameInput.value = userName.textContent;
	userBioInput.value = userBio.textContent;

	setButtonState(formProfileEdit, formConfig); // устанавливаем стейт кнопки сабмита
	openPopup(popupProfileEdit); // открываем попап
}

// функция открытия попапа редактирования аватара
function openPopupAvatarChange() {
	resetFormData(formAvatarChange, formConfig); // обнуляем введенные при прошлом открытии попапа данные и ошибки,
	// если они были
	setButtonState(formAvatarChange, formConfig); // устанавливаем стейт кнопки сабмита
	openPopup(popupAvatarChange); // открываем попап
}

// функция открытия попапа добавления места
function openPopupPlaceAdd() {
	resetFormData(formPlaceAdd, formConfig); // обнуляем введенные при прошлом открытии попапа данные и ошибки,
	// если они были
	setButtonState(formPlaceAdd, formConfig); // устанавливаем стейт кнопки сабмита
	openPopup(popupPlaceAdd); // открываем попап
}

// функция открытия попапа просмотра фотографий карточки места
function openPopupPlaceShow(photo, caption) {
	photo.addEventListener('click', () => {
		placePhoto.src = photo.src;
		placePhoto.alt = photo.alt;
		placeCaption.textContent = caption.textContent;

		openPopup(popupPlaceShow);
	});
}

// функция отправки данных из формы обновления аватара
function submitFormAvatarChange(evt) {
	evt.preventDefault();

	dataLoading(true, formAvatarChange, formConfig);
	api.sendAvatar(avatarInput.value)
		.then(() => {
			avatar.src = avatarInput.value;

			closePopup(popupAvatarChange);
		})
		.catch(err => console.log(err))
		.finally(() => dataLoading(false, formAvatarChange, formConfig));
}

// функция отправки данных из формы редактирования профиля
function submitFormProfileEdit(evt) {
	evt.preventDefault();

	dataLoading(true, formProfileEdit, formConfig);
	api.sendUserInfo(userNameInput.value, userBioInput.value)
		.then(() => {
			userName.textContent = userNameInput.value;
			userBio.textContent = userBioInput.value;

			closePopup(popupProfileEdit);
		})
		.catch(err => console.log(err))
		.finally(() => dataLoading(false, formProfileEdit, formConfig));
}

// функция отправки данных из формы с добавлением нового элемента в галерею
function submitFormPlaceAdd(evt) {
	evt.preventDefault();

	dataLoading(true, formPlaceAdd, formConfig);
	api.sendNewCard(placeNameInput.value, placeLinkInput.value)
		.then((placeData) => {
			let currentUserId = placeData.owner['_id'];

			addNewPlace(createPlace(placeData, currentUserId));
			closePopup(popupPlaceAdd);
		})
		.catch(err => console.log(err))
		.finally(() => dataLoading(false, formPlaceAdd, formConfig));
}

export {
	popups,
	formAvatarChange,
	formProfileEdit,
	formPlaceAdd,
	closePopup,
	openPopupAvatarChange,
	openPopupProfileEdit,
	openPopupPlaceAdd,
	openPopupPlaceShow,
	submitFormProfileEdit,
	submitFormAvatarChange,
	submitFormPlaceAdd
}
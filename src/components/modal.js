import {formConfig} from './constants.js';
import {resetFormData, setButtonState, dataLoading} from './validate.js';
import {addNewPlace, createPlace} from './card.js';
import {avatar, userBio, userName} from './profile.js';
import {sendAvatar, sendNewCard, sendUserInfo} from './api.js';

//находим все попапы
const popups = document.querySelectorAll('.popup');

// находим попап-форму редактирования аватара и поле ввода ссылки на картинку
const popupAvatarChange = document.querySelector('.popup_type_avatar-change');
const formAvatarChange = popupAvatarChange.querySelector('.popup__form');
const avatarInput = formAvatarChange.elements.avatarLink;

// находим попап и форму редактирования профиля и поля ввода имени и подписи пользователя
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const userNameInput = formProfileEdit.elements.userName;
const userBioInput = formProfileEdit.elements.userBio;

// находим попап и форму добавления карточки места в галерею и поля ввода для фото и названия места
const popupPlaceAdd = document.querySelector('.popup_type_place-add');
const formPlaceAdd = popupPlaceAdd.querySelector('.popup__form');
const placeLinkInput = formPlaceAdd.elements.placeLink;
const placeNameInput = formPlaceAdd.elements.placeName;

// находим попап просмотра увеличенной фотографии места и его элементы
const popupPlaceShow = document.querySelector('.popup_type_place-show');
const placePhoto = popupPlaceShow.querySelector('.popup__place-photo');
const placeCaption = popupPlaceShow.querySelector('.popup__place-caption')

// общие функции для попопов (открытие/закрытие, зачищение данных в формах)

// функция для открытия попапов
function openPopup(popup) {
	popup.classList.add('popup_opened');

	document.addEventListener('keyup', closePopupByEcs);
}

// функция для закрытия попапов
function closePopup(popup) {
	popup.classList.remove('popup_opened'); //закрываем попап

	document.removeEventListener('keyup', closePopupByEcs);
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
	userNameInput.value = userName.textContent;
	userBioInput.value = userBio.textContent;

	setButtonState(formProfileEdit, formConfig);
	openPopup(popupProfileEdit);
}

// функция открытия попапа редактирования аватапа
function openPopupAvatarChange() {
	resetFormData(formAvatarChange, formConfig)
	setButtonState(formAvatarChange, formConfig)
	openPopup(popupAvatarChange);
}

// функция открытия попапа добавления места
function openPopupPlaceAdd() {
	resetFormData(formPlaceAdd, formConfig)
	setButtonState(formPlaceAdd, formConfig)
	openPopup(popupPlaceAdd);
}

// функция открытия попапа просмотра фотографий карточки места
function openPopupPlaceShow(photo, caption) {
	photo.addEventListener('click', () => {
		openPopup(popupPlaceShow);

		placePhoto.src = photo.src;
		placePhoto.alt = photo.alt;
		placeCaption.textContent = caption.textContent;
	});
}

// функция отправки формы обновления аватара
function submitFormAvatarChange(evt) {
	evt.preventDefault();

	dataLoading(true, formAvatarChange, formConfig);
	sendAvatar(avatar.src)
		.then(() => {
			avatar.src = avatarInput.value;
			avatarInput.value = '';
		})
		.catch(err => console.log(err))
		.finally(() => dataLoading(false, formAvatarChange, formConfig));

	closePopup(popupAvatarChange);
}

// функция отправки формы редактирования профиля
function submitFormProfileEdit(evt) {
	evt.preventDefault();

	dataLoading(true, formProfileEdit, formConfig);
	sendUserInfo(userNameInput.value, userBioInput.value)
		.then(() => {
			userName.textContent = userNameInput.value;
			userBio.textContent = userBioInput.value;
		})
		.catch(err => console.log(err))
		.finally(() => dataLoading(false, formProfileEdit, formConfig));

	closePopup(popupProfileEdit);
}

// функция отправки формы с добавлением нового элемента в галерею
function submitFormPlaceAdd(evt) {
	evt.preventDefault();

	dataLoading(true, formPlaceAdd, formConfig);
	sendNewCard(placeNameInput.value, placeLinkInput.value)
		.then((placeData) => {
			let currentUserId = placeData.owner['_id'];
			addNewPlace(createPlace(placeData, currentUserId))
		})
		.catch(err => console.log(err))
		.finally(() => dataLoading(false, formPlaceAdd, formConfig));

	closePopup(popupPlaceAdd);
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
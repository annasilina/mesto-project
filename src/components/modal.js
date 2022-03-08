import { formConfig } from './constants.js';
import { setButtonState, resetFormData } from './validate.js';
import { addNewPlace, createPlace } from './card.js';

//находим все попапы
const popups = document.querySelectorAll('.popup');

// находим профиль и элементы имени и подписи пользователя
const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__user-name');
const userBio = profile.querySelector('.profile__user-bio');

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
function  closePopup(popup) {
	popup.classList.remove('popup_opened'); //закрываем попап

	document.removeEventListener('keyup', closePopupByEcs);
}

//функция закрытия попапа всеми методами - клик по кнопке закрытия, клик вне контейнера, нажатие кнопки escape
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

	setButtonState(formProfileEdit, formConfig); // устанавливаем статус кнопки сохранения при открытии формы в
	// зависимости от наполнения инпутов. Так как эта форма всегда заполненна данными, указанными в профиле, кнопка
	// сохранения должна быть доступна при любом открытии.
	openPopup(popupProfileEdit);
}

// функция открытия попапа добавления места
function openPopupPlaceAdd() {
	resetFormData(formPlaceAdd, formConfig); //зачищаем данные в этой форме
	setButtonState(formPlaceAdd, formConfig) // устанавливаем статус кнопки сохранения при открытии формы в
	// зависимости от наполнения инпутов в каждый момент открытия - это важно при повторном открытии формы, если при
	// первом обращении пользователь ввел данные, но закрыл форму без отправки данных
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

// функция отправки формы редактирования профиля
function submitFormProfileEdit(evt) {
	evt.preventDefault();

	userName.textContent = userNameInput.value;
	userBio.textContent = userBioInput.value;

	closePopup(popupProfileEdit);
}

// функция отправки формы с добавлением нового элемента в галерею
function submitFormPlaceAdd(evt) {
	evt.preventDefault();

	const placeData = {link: placeLinkInput.value, name: placeNameInput.value};

	addNewPlace(createPlace(placeData));
	closePopup(popupPlaceAdd);
}

export {
	popups,
	profile,
	formProfileEdit,
	formPlaceAdd,
	closePopup,
	openPopupProfileEdit,
	openPopupPlaceAdd,
	openPopupPlaceShow,
	submitFormProfileEdit,
	submitFormPlaceAdd
}
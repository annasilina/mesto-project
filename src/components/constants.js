// объект-конфиг с селекторами элементов для работы с формами и попапами
const formConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__form-input',
	buttonSubmitSelector: '.popup__button-save',
	buttonSubmitInactiveClass: 'popup__button-save_disabled',
	inputWithErrorClass: 'popup__form-input_type_error',
	errorMessageActiveClass: 'popup__error-message_active'
}

// базовый объект-конфиг для api-запросов
const apiConfig = {
	baseURL: 'https://nomoreparties.co/v1/plus-cohort7',
	headers: {
		authorization: '963eab40-f1b1-4bf3-8893-fd8fa8464a41',
		'Content-Type': 'application/json'
	}
}

const userInfo = document.querySelector('.profile');
const userName = userInfo.querySelector('.profile__user-name');
const userBio = userInfo.querySelector('.profile__user-bio');
const avatar = userInfo.querySelector('.profile__photo');

// находим кнопки открытия попапов с формами - перенес!!!
const buttonOpenPopupAvatarChange = userInfo.querySelector('.profile__button-edit_el_avatar');
const buttonOpenPopupProfileEdit = userInfo.querySelector('.profile__button-edit_el_info');
const buttonOpenPopupPlaceAdd = userInfo.querySelector('.profile__button-add');

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

export {
	formConfig,
	apiConfig,
	userInfo,
	avatar,
	userBio,
	userName,
	popups,
	popupAvatarChange,
	formAvatarChange,
	avatarInput,
	popupProfileEdit,
	formProfileEdit,
	userNameInput,
	userBioInput,
	popupPlaceAdd,
	formPlaceAdd,
	placeLinkInput,
	placeNameInput,
	popupPlaceShow,
	placePhoto,
	placeCaption,
	buttonOpenPopupAvatarChange,
	buttonOpenPopupProfileEdit,
	buttonOpenPopupPlaceAdd
}
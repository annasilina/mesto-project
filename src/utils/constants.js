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

// находим профиль и его элементы (имя, подпись, аватар)
const userInfo = document.querySelector('.profile');
const userName = userInfo.querySelector('.profile__user-name');
const userBio = userInfo.querySelector('.profile__user-bio');
const avatar = userInfo.querySelector('.profile__photo');

// находим кнопки открытия попапов с формами
const buttonOpenPopupAvatarChange = userInfo.querySelector('.profile__button-edit_el_avatar');
const buttonOpenPopupProfileEdit = userInfo.querySelector('.profile__button-edit_el_info');
const buttonOpenPopupPlaceAdd = userInfo.querySelector('.profile__button-add');

export {
	formConfig,
	apiConfig,
	avatar,
	userBio,
	userName,
	buttonOpenPopupAvatarChange,
	buttonOpenPopupProfileEdit,
	buttonOpenPopupPlaceAdd
}
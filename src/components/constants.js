// объект-конфиг с селекторами элементов для работы с формами и попапами
const formConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__form-input',
	buttonSubmitSelector: '.popup__button-save',
	buttonSubmitInactiveClass: 'popup__button-save_disabled',
	inputWithErrorClass: 'popup__form-input_type_error',
	errorMessageClass: 'popup__error-message_active'
}

const userInfo = document.querySelector('.profile');
const userName = userInfo.querySelector('.profile__user-name');
const userBio = userInfo.querySelector('.profile__user-bio');
const avatar = userInfo.querySelector('.profile__photo');

// находим кнопки открытия попапов с формами - перенес!!!
const buttonOpenPopupAvatarChange = userInfo.querySelector('.profile__button-edit_el_avatar');
const buttonOpenPopupProfileEdit = userInfo.querySelector('.profile__button-edit_el_info');
const buttonOpenPopupPlaceAdd = userInfo.querySelector('.profile__button-add');



export { formConfig,
	userInfo,
	avatar,
	userBio,
	userName,
	buttonOpenPopupAvatarChange,
	buttonOpenPopupProfileEdit,
	buttonOpenPopupPlaceAdd }
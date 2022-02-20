// массив элементов мест для галереи по умолчанию
const initialPlaces = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

// объект-конфиг с селекторами элементов для работы с формами и попапами
const formConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__form-input',
	buttonSubmitSelector: '.popup__button-save',
	buttonSubmitInactiveClass: 'popup__button-save_disabled',
	inputWithErrorClass: 'popup__form-input_type_error',
	errorMessageClass: 'popup__error-message_active'
}

// находим профиль и элементы имени и подписи пользователя
const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__user-name');
const userBio = profile.querySelector('.profile__user-bio');

// находим галерею мест
const gallery = document.querySelector('.gallery');

// находим попап и форму редактирования профиля и поля ввода имени и подписи пользователя
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = document.forms.formProfileEdit;
const userNameInput = formProfileEdit.elements.userName;
const userBioInput = formProfileEdit.elements.userBio;

// находим попап и форму добавления карточки места в галерею и поля ввода для фото и названия места
const popupPlaceAdd = document.querySelector('.popup_type_place-add');
const formPlaceAdd = document.forms.formPlaceAdd;
const placeLinkInput = formPlaceAdd.elements.placeLink;
const placeNameInput = formPlaceAdd.elements.placeName;

// находим попап просмотра увеличенной фотографии места и его элементы
const popupPlaceShow = document.querySelector('.popup_type_place-show');
const placePhoto = popupPlaceShow.querySelector('.popup__place-photo');
const placeCaption = popupPlaceShow.querySelector('.popup__place-caption')

// находим кнопки открытия попапов с формами
const buttonOpenPopupProfileEdit = profile.querySelector('.profile__button-edit');
const buttonOpenPopupPlaceAdd = profile.querySelector('.profile__button-add');

// рендерим и вставляем элементы галереи по умолчанию
initialPlaces.forEach(place => {
	gallery.append(createPlace(place));
});

// работаем с кнопками в галерее

// функция для обработки кнопки лайка элемента галереи
function likePlace(buttonLike) {
	buttonLike.addEventListener('click', function (evt) {
		evt.target.classList.toggle('gallery__button-like_active');
	});
}

// функция для обработки кнопки удаления элемента галереи
function deletePlace(buttonDelete) {
	buttonDelete.addEventListener('click', function (evt) {
		evt.target.parentElement.remove();
	});
}

// общие функции для попопов (открытие/закрытие, зачищение данных в формах)

// функция для открытия попапов
function openPopup(popup) {
	popup.classList.add('popup_opened');
}

// функция для закрытия попапов
function  closePopup(popup) {
	popup.classList.remove('popup_opened'); //закрываем попап

	if (findForm(popup, formConfig)) { // проверяем, есть ли в попапе форма
		resetFormData(findForm(popup, formConfig), formConfig); //зачищаем данные в этой форме
	}
}

//функция закрытия попапа всеми методами - клик по кнопке закрытия, клик вне контейнера, нажатие кнопки escape
function closePopupByEvents(evt) {
	const currentPopup = document.querySelector('.popup_opened');
	const targetClassList = evt.target.classList;

	if (targetClassList.contains('popup__button-close')
		|| targetClassList.contains('popup_opened')
		|| evt.key === 'Escape') {
		closePopup(currentPopup);
	}
}

//обработчик закрытия попапов по клику на все возможные элементы: кнопка закрытия, escape, overlay
document.addEventListener('click', closePopupByEvents);

//обработчик закрытия попапов по нажатию кнопки escape
document.addEventListener('keyup', closePopupByEvents);


// работаем с профилем

// обработчик кнопки открытия попапа с формой редактирования профиля
buttonOpenPopupProfileEdit.addEventListener('click', () => {
	userNameInput.value = userName.textContent;
	userBioInput.value = userBio.textContent;

	setButtonState(formProfileEdit, formConfig); // устанавливаем статус кнопки сохранения при открытии формы в
	// зависимости от наполнения инпутов. Так как эта форма всегда заполненна данными, указанными в профиле, кнопка
	// сохранения должна быть доступна при любом открытии.
	openPopup(popupProfileEdit);
});

// функция отправки формы редактирования профиля
function submitFormProfileEdit(evt) {
	evt.preventDefault();

	userName.textContent = userNameInput.value;
	userBio.textContent = userBioInput.value;

	closePopup(popupProfileEdit);
}

// обработчик отправки формы редактирования профиля
formProfileEdit.addEventListener('submit', submitFormProfileEdit);

// работаем с галереей

// функция открытия попапа с формой добавления элемента в галерею
buttonOpenPopupPlaceAdd.addEventListener('click', () => {
	setButtonState(formPlaceAdd, formConfig) // устанавливаем статус кнопки сохранения при открытии формы в
	// зависимости от наполнения инпутов в каждый момент открытия - это важно при повторном открытии формы, если при
	// первом обращении пользователь ввел данные, но закрыл форму без отправки данных
	openPopup(popupPlaceAdd);
});

// функция создания элемента галереи
function createPlace(placeData) {
	const placeTemplate = document.querySelector('#place-template').content;
	const placeElement = placeTemplate.querySelector('.gallery__place').cloneNode(true);
	const placePhoto = placeElement.querySelector('.gallery__place-photo');
	const placeCaption = placeElement.querySelector('.gallery__place-caption');

	placePhoto.setAttribute('src', placeData.link);
	placePhoto.setAttribute('alt', placeData.name);
	placeCaption.textContent = placeData.name;

	const placeButtonLike = placeElement.querySelector('.gallery__button-like');
	const placeButtonDelete = placeElement.querySelector('.gallery__button-delete');

	likePlace(placeButtonLike);
	deletePlace(placeButtonDelete);
	openPopupPlaceShow(placePhoto, placeCaption);

	return placeElement;
}

// функция добавления нового элемента галереи
function addNewPlace(placeElement) {
	gallery.prepend(placeElement);
}

// функция отправки формы с добавлением нового элемента в галерею
function submitFormPlaceAdd(evt) {
	evt.preventDefault();

	const placeData = {link: placeLinkInput.value, name: placeNameInput.value};

	addNewPlace(createPlace(placeData));
	closePopup(popupPlaceAdd);
}

// обработчик отправки формы добавления нового элемента в галерею
formPlaceAdd.addEventListener('submit', submitFormPlaceAdd);

// функция для открытия попапа просмотра фотографий карточки места
function openPopupPlaceShow(photo, caption) {
	photo.addEventListener('click', () => {
		openPopup(popupPlaceShow);

		placePhoto.src = photo.src;
		placePhoto.alt = photo.alt;
		placeCaption.textContent = caption.textContent;
	});
}

// валидация форм

// функция проверки наличия формы в попапе
function findForm(popup, config) {
	return popup.querySelector(config.formSelector);
}

// функция проверки списка инпутов на наличие инпута с ошибкой
function hasInvalidInput(inputList) {
	return inputList.some(input => {
		return !input.validity.valid;
	});
}

// функция поиска спана для ошибки в форме
function findErrorBlock(form, input) {
	return form.querySelector(`#error-${input.name}`);
}

// функция поиска всех инпутов в форме
function findInputs(form, config) {
	return Array.from(form.querySelectorAll(config.inputSelector));
}

// функция поиска кнопки сабмита в форме
function findButtonSubmit(form, config) {
	return form.querySelector(config.buttonSubmitSelector);
}

// функция показа текста ошибки для полей ввода
function showInputError(input, inputError, errorMessage, config) {
	input.classList.add(config.inputWithErrorClass);
	inputError.classList.add(config.errorMessageClass);
	inputError.textContent = errorMessage;
}

//функция зачищения текста ошибки для одного инпута
function hideInputError(input, inputError, config) {
	input.classList.remove(config.inputWithErrorClass);
	inputError.classList.remove(config.errorMessageClass);
	inputError.textContent = '';
}

// функция очистки текстов ошибок для всех инпутов в форме
function resetAllErrors(form, config) {
	const inputList = findInputs(form, config);

	inputList.forEach(input => {
		const inputError = findErrorBlock(form, input);

		hideInputError(input, inputError, config);
	});
}

// функция очистки данных в форме
function resetFormData(form, config) {
	form.reset(); //зачищаем поля формы
	resetAllErrors(form, config); //обнуляем ошибки инпутов в форме
}

//функция проверки полей ввода
function checkInput(form, input, config) {
	const inputError = findErrorBlock(form, input);

	if (!input.validity.valid) {
		showInputError(input, inputError, input.validationMessage, config);
	} else hideInputError(input, inputError, config);
}

// функция активации кнопки сохранения в форме
function enableButton(button, config) {
	button.disabled = false;
	button.classList.remove(config.buttonSubmitInactiveClass);
}

// функция деактивации кнопки сохранения в форме
function disableButton(button, config) {
	button.disabled = true;
	button.classList.add(config.buttonSubmitInactiveClass);
}

// функция активации/деактивации кнопок сохранения в форме в зависимости от валидности инпутов
function setButtonState(form, config) {
	const inputList = findInputs(form, config);
	const buttonSave = findButtonSubmit(form, config);

	if (hasInvalidInput(inputList)) {
		disableButton(buttonSave, config);
	} else {
		enableButton(buttonSave, config);
	}
}

// функция проверки валидности полей ввода в формах
function setEventListeners(form, config) {
	setButtonState(form, config); // устанавливаем статус кнопки в зависимости от данных в инпуте при первом обращении
	// к форме

	findInputs(form, config).forEach(input => {
		input.addEventListener('input', function() {

			checkInput(form, input, config); // проверяем каждый инпут и если некорреткный - выводим для него ошибку
			setButtonState(form, config); // устанавливаем статус кнопки в зависимости от валидности инпутов при каждом
			// изменении в инпутах
		});
	});
}

// функция запуска валидации всех форм на странице
function enableValidation(config) {
	const formList = Array.from(document.querySelectorAll(config.formSelector));

	formList.forEach(form => {
		form.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});

		setEventListeners(form, config);
	});
}

// запускаем валидацию форм на странице
enableValidation(formConfig);
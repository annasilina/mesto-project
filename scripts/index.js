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

// находим попап просмотра увеличенной фотографии места
const popupPlaceShow = document.querySelector('.popup_type_place-photo');
const placeBigPhoto = popupPlaceShow.querySelector('.popup__place-photo');
const placeCaption = popupPlaceShow.querySelector('.popup__place-caption')

// находим кнопки открытия и закрытия форм и попапов
const openPopupProfileEditButton = profile.querySelector('.profile__button-edit');
const openPopupPlaceAddButton = profile.querySelector('.profile__button-add');

// рендерим и вставляем элементы галереи по умолчанию
initialPlaces.forEach(place => {
	gallery.append(createPlace(place));
});

//работаем с кнопками
// задаем функцию для обработки кнопки лайка элемента галереи
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

// функция для открытия форм и попапов
function openPopup(popup) {
	popup.classList.add('popup_opened');
}

// функция для закрытия форм и попапов
function  closePopup(popup) {
	if (popup.querySelector('.popup__form')) { //если попапа содержит форму
		const currentForm = popup.querySelector('.popup__form');
		const currentInputList = findInputs(currentForm);

		resetAllErrors(currentInputList, currentForm); //обнуляем ошибки инпутов при закрытии формы
		currentForm.reset(); //зачищаем поля формы
	}

	popup.classList.remove('popup_opened'); //закрываем попап
}

//функция закрытия попапа всеми методами - клик по кнопке закрытия, клик вне контейнера, нажатие кнопки escape
function closePopupByEvents(evt) {
	const currentPopup = document.querySelector('.popup_opened');
	const targetClassList = evt.target.classList;

	if (targetClassList.contains('popup__close-button')
		|| targetClassList.contains('popup_opened')
		|| evt.key === 'Escape') {
		closePopup(currentPopup);
	}
}

//обработчик закрытия попапов по клику на оверлей и кнопки закрытия
document.addEventListener('click', closePopupByEvents);

//обработчик закрытия попапов по нажатию кнопки escape
document.addEventListener('keyup', closePopupByEvents);


// работаем с профилем
// обработчик кнопки открытия попапа с формой редактирования профиля
openPopupProfileEditButton.addEventListener('click', () => {
	const profileButtonSave = popupProfileEdit.querySelector('.popup__button-save');
	const profileInputsList = findInputs(formProfileEdit);

	userNameInput.value = userName.textContent;
	userBioInput.value = userBio.textContent;

	openPopup(popupProfileEdit);
	setButtonState(profileInputsList, profileButtonSave); // активрируем кнопку сохранить для формы, так как при ее
	// открытии поля заполняются автоматически
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
// функция открытия формы добавления элемента в галерею
openPopupPlaceAddButton.addEventListener('click', () => {
	openPopup(popupPlaceAdd);
});

//функция создания элемента галереи
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
function submitPlaceAddForm(evt) {
	evt.preventDefault();

	const placeData = {link: placeLinkInput.value, name: placeNameInput.value};

	addNewPlace(createPlace(placeData));
	closePopup(popupPlaceAdd);
}

// обработчик отправки формы добавления нового элемента в галерею
formPlaceAdd.addEventListener('submit', submitPlaceAddForm);

// функция для открытия попапа просмотра фотографий карточки места
function openPopupPlaceShow(photo, caption) {
	photo.addEventListener('click', () => {
		openPopup(popupPlaceShow);

		placeBigPhoto.src = photo.src;
		placeBigPhoto.alt = photo.alt;
		placeCaption.textContent = caption.textContent;
	});
}

//валидация форм
//функция активации/деактивации кнопок сабмита в форме в зависимости от валидности формы
function setButtonState(inputList, buttonSubmit) {
	if (hasInvalidInput(inputList)) {
		buttonSubmit.setAttribute('disabled', true);
		buttonSubmit.classList.add('popup__button-save_disabled');
	} else {
		buttonSubmit.removeAttribute('disabled');
		buttonSubmit.classList.remove('popup__button-save_disabled');
	}
}

// функция проверки списка инпутов
function hasInvalidInput(inputList) {
	return inputList.some(input => {
		return !input.validity.valid;
	});
}

// функция поиска спана для ошибки в форме
function findError(input, form) {
	return form.querySelector(`.${input.id}-error`);
}

// функция поиска всех инпутов в форме
function findInputs(form) {
	return Array.from(form.querySelectorAll('.popup__form-input'));
}

// функция показа текста ошибки для полей ввода
function showInputError(input, form, errorMessage) {
	const inputError = findError(input, form);

	inputError.classList.add('popup__input-error_active');
	input.classList.add('popup__form-input_type_error');
	inputError.textContent = errorMessage;
}

//функция зачищения текста ошибки для одного инпута
function hideInputError(input, form) {
	const inputError = findError(input, form);

	input.classList.remove('popup__form-input_type_error');
	inputError.classList.remove('popup__input-error_active');
	inputError.textContent = '';
}

// функция очистки текстов ошибок для всех инпутов в форме
function resetAllErrors(inputList, form) {
	inputList.forEach(input => {
		hideInputError(input, form);
	});
}

//функция проверки полей ввода
function checkInput(input, form) {
	if (!input.validity.valid) {
		showInputError(input, form, input.validationMessage);
	} else hideInputError(input, form);
}

// функция проверки валидности полей ввода в формах
function setListeners(form) {
	const inputList = findInputs(form);
	const buttonSave = form.querySelector('.popup__button-save');
	setButtonState(inputList, buttonSave); // устанавливаем статус кнопки в зависимости от валидности инпутов

	inputList.forEach(input => {
		input.addEventListener('input', function() {

			checkInput(input, form); // проверяем каждый инпут и если некорреткный - выводим для него ошибку
			setButtonState(inputList, buttonSave); // устанавливаем статус кнопки в зависимости от валидности инпутов
		});
	});
}

// функция запуска валидации всех форм на странице
function enableValidation() {
	const formList = Array.from(document.forms);

	formList.forEach(form => {
		form.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});

		setListeners(form);
	});
}

// запускаем валидацию форм на странице
enableValidation();
// массив элементов мест для галереи по умолчанию
const initialItems = [
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
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
const profileEditForm = document.forms.profileEditForm;
const userNameInput = profileEditForm.elements.userName;
const userBioInput = profileEditForm.elements.userBio;

// находим попап и форму добавления карточки места в галерею и поля ввода для фото и названия места
const placeAddPopup = document.querySelector('.popup_type_add-place');
const placeAddForm = document.forms.placeAddForm;
const placeLinkInput = placeAddForm.elements.placeLink;
const placeNameInput = placeAddForm.elements.placeName;

// находим попап просмотра увеличенной фотографии места
const placePhotoPopup = document.querySelector('.popup_type_place-photo');
const placeBigPhoto = placePhotoPopup.querySelector('.popup__place-photo');
const placeCaption = placePhotoPopup.querySelector('.popup__place-caption')

// находим кнопки открытия и закрытия форм и попапов
const openProfileEditPopupButton = profile.querySelector('.profile__button-edit');
const openItemAddPopupButton = profile.querySelector('.profile__button-add');

// рендерим и вставляем элементы галереи по умолчанию
initialItems.forEach(item => {
	gallery.append(createItem(item));
});

//работаем с кнопками
// задаем функцию для обработки кнопки лайка элемента галереи
function likeItem(likeButton) {
	likeButton.addEventListener('click', function (evt) {
		evt.target.classList.toggle('gallery__like-button_active');
	});
}

// функция для обработки кнопки удаления элемента галереи
function deleteItem(deleteButton) {
	deleteButton.addEventListener('click', function (evt) {
		evt.target.parentElement.remove();
	});
}

// функция для открытия форм и попапов
function openPopup(popup) {
	popup.classList.add('popup_opened');
}

// функция для закрытия форм и попапов
function  closePopup(popup) {
	//проверяем, содержит ли попап форму
	if (popup.querySelector('.popup__form')) {
		const currentForm = popup.querySelector('.popup__form');
		const currentInputList = findInputs(currentForm);

		resetAllErrors(currentInputList, currentForm); //обнуляем ошибки инпутов при закрытии формы
		currentForm.reset(); //зачищаем поля формы
	}

	popup.classList.remove('popup_opened'); //закрываем попап
}

//функция закрытия попапа всеми методами - клик по кнопке закрытия, клик вне контейнера, нажатие кнопки escape
function closePopupMethods(evt) {
	const currentPopup = document.querySelector('.popup_opened');
	const targetClassList = evt.target.classList;

	if (targetClassList.contains('popup__close-button')
		|| targetClassList.contains('popup_opened')
		|| evt.key === 'Escape') {
		closePopup(currentPopup);
	}
}

//обработчик закрытия попапов по клику на оверлей и кнопки закрытия
document.addEventListener('click', closePopupMethods);

//обработчик закрытия попапов по нажатию кнопки escape
document.addEventListener('keyup', closePopupMethods);


// работаем с профилем
// обработчик кнопки открытия попапа с формой редактирования профиля
openProfileEditPopupButton.addEventListener('click', () => {
	const profileSubmitButton = profileEditPopup.querySelector('.popup__save-button');
	const profileInputsList = findInputs(profileEditForm);

	userNameInput.value = userName.textContent;
	userBioInput.value = userBio.textContent;

	openPopup(profileEditPopup);
	setButtonState(profileInputsList, profileSubmitButton); // в эту форму при открытии подтягиваются данные профиля
	// со страницы. валидация форм настроена по изменению в полях ввода пользователем по событию input.
	// если не вызвать здесь эту 	функцию - при открытии попапа с формой редактирования профиля кнопка по умолчанию будет неактивна.
});

// функция отправки формы редактирования профиля
function profileEditFormSubmit(evt) {
	evt.preventDefault();

	userName.textContent = userNameInput.value;
	userBio.textContent = userBioInput.value;

	closePopup(profileEditPopup);
}

// обработчик отправки формы редактирования профиля
profileEditForm.addEventListener('submit', profileEditFormSubmit);

// работаем с галереей
// функция открытия формы добавления элемента в галерею
openItemAddPopupButton.addEventListener('click', () => {
	openPopup(placeAddPopup);
});

//функция создания элемента галереи
function createItem(itemData) {
	const itemTemplate = document.querySelector('#item-template').content;
	const galleryItemElement = itemTemplate.querySelector('.gallery__place').cloneNode(true);
	const elementPhoto = galleryItemElement.querySelector('.gallery__photo');
	const elementCaption = galleryItemElement.querySelector('.gallery__caption');

	elementPhoto.setAttribute('src', itemData.link);
	elementPhoto.setAttribute('alt', itemData.name);
	elementCaption.textContent = itemData.name;

	const elementLikeButton = galleryItemElement.querySelector('.gallery__like-button');
	const elementDeleteButton = galleryItemElement.querySelector('.gallery__delete-button');

	likeItem(elementLikeButton);
	deleteItem(elementDeleteButton);
	itemPhotoPopupOpen(elementPhoto, elementCaption);

	return galleryItemElement;
}

// функция добавления новогго элемента галереи
function addNewItem(itemElement) {
	gallery.prepend(itemElement);
}

// функция отправки формы с добавлением нового элемента в галерею
function itemAddFormSubmit(evt) {
	evt.preventDefault();

	const itemData = {link: placeLinkInput.value, name: placeNameInput.value};

	addNewItem(createItem(itemData));
	closePopup(placeAddPopup);
}

// обработчик отправки формы добавления нового элемента в галерею
placeAddForm.addEventListener('submit', itemAddFormSubmit);

// функция для открытия попапа просмотра фотографий карточки места
function itemPhotoPopupOpen(photo, caption) {
	photo.addEventListener('click', () => {
		openPopup(placePhotoPopup);

		placeBigPhoto.src = photo.src;
		placeBigPhoto.alt = photo.alt;
		placeCaption.textContent = caption.textContent;
	});
}

//валидация форм
//функция активации/деактивации кнопок сабмита в форме в зависимости от валидности формы
function setButtonState(inputList, submitButton) {
	if (hasInvalidInput(inputList)) {
		submitButton.setAttribute('disabled', true);
		submitButton.classList.add('popup__save-button_disabled');
	} else {
		submitButton.removeAttribute('disabled');
		submitButton.classList.remove('popup__save-button_disabled');
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
	const submitButton = form.querySelector('.popup__save-button');
	setButtonState(inputList, submitButton); // устанавливаем статус кнопки в зависимости от валидности инпутов

	inputList.forEach(input => {
		input.addEventListener('input', function() {

			checkInput(input, form); // проверяем каждый инпут и если некорреткный - выводим для него ошибку
			setButtonState(inputList, submitButton); // устанавливаем статус кнопки в зависимости от валидности инпутов
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
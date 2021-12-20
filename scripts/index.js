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

//находим шаблон элемента галереи
const itemTemplate = document.querySelector('#item-template').content;

// находим попап-форму редактирования профиля и поля ввода имени и подписи пользователя
const profileEditForm = document.querySelector('.popup_type_profile-edit');
const userNameInput = profileEditForm.querySelector('.popup__form-item_el_user-name');
const userBioInput = profileEditForm.querySelector('.popup__form-item_el_bio');

// находим попа-форму добавления карточки места в галерею и поля ввода для фото и названия места
const itemAddForm = document.querySelector('.popup_type_add-item');
const itemPhotoInput = itemAddForm.querySelector('.popup__form-item_el_place-link');
const itemNameInput = itemAddForm.querySelector('.popup__form-item_el_place-name');

// находим попап просмотра увеличенной фотографии места
const itemPhotoPopup = document.querySelector('.popup_type_item-photo');
const itemBigPhoto = itemPhotoPopup.querySelector('.popup__item-photo');
const itemBigPhotoCaption = itemPhotoPopup.querySelector('.popup__item-caption')

// находим кнопки открытия и закрытия форм и попапов
const openProfileEditFormButton = profile.querySelector('.profile__button-edit');
const closeProfileEditFormButton = profileEditForm.querySelector('.popup__close-button');
const openItemAddFormButton = profile.querySelector('.profile__button-add');
const closeItemAddFormButton = itemAddForm.querySelector('.popup__close-button');
const closePhotoPopupButton = itemPhotoPopup.querySelector('.popup__close-button');

// рендерим и вставляем элементы галереи по умолчанию
initialItems.forEach(item => {
	gallery.append(createItem(item));
});

// задаем функцию для обработки кнопки лайка элемента галереи
function likeItem(likeButton) {
	likeButton.addEventListener('click', function (evt) {
		evt.target.classList.toggle('gallery__like-button_active');
	});
}

// задаем функцию для обработки кнопки удаления элемента галереи
function deleteItem(deleteButton) {
	deleteButton.addEventListener('click', function (evt) {
		evt.target.parentElement.remove();
	});
}

// функция для открытия форм и попапов
function openForm(form) {
	form.classList.add('popup_opened');
}

// функция для закрытия форм и попапов
function  closeForm(form) {
	form.classList.remove('popup_opened');
}

// работаем с профилем
// обработчик кнопки открытия формы редактирования профиля
openProfileEditFormButton.addEventListener('click', () => {
	openForm(profileEditForm)

	userNameInput.value = userName.textContent;
	userBioInput.value = userBio.textContent;
});

// функция отправки формы редактирования профиля
function profileEditFormSubmit(evt) {
	evt.preventDefault();

	userName.textContent = userNameInput.value;
	userBio.textContent = userBioInput.value;

	closeForm(profileEditForm);
}

// обработчик отправки формы редактирования профиля
profileEditForm.addEventListener('submit', profileEditFormSubmit);

// работаем с галереей
// функция открытия формы добавления элемента в галерею
openItemAddFormButton.addEventListener('click', () => {
	openForm(itemAddForm)
});

//функция создания элемента галереи
function createItem(itemData) {
	const galleryItemElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);
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

	const itemData = {link: itemPhotoInput.value, name: itemNameInput.value};

	addNewItem(createItem(itemData));
	closeForm(itemAddForm);
}

// обработчик отправки формы добавления нового элемента в галерею
itemAddForm.addEventListener('submit', itemAddFormSubmit);

// функция для открытия попапа просмотра фотографий карточки места
function itemPhotoPopupOpen(photo, caption) {
	photo.addEventListener('click', () => {
		openForm(itemPhotoPopup);

		itemBigPhoto.src = photo.src;
		itemBigPhoto.alt = photo.alt;
		itemBigPhotoCaption.textContent = caption.textContent;
	});
}

// обработчики кнопок закрытия форм
closeProfileEditFormButton.addEventListener('click', () => closeForm(profileEditForm));
closeItemAddFormButton.addEventListener('click', () => closeForm(itemAddForm));
closePhotoPopupButton.addEventListener('click', () => closeForm(itemPhotoPopup));
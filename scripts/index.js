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

//находим все попапы
const popups = document.querySelectorAll('.popup');

// находим попап-форму редактирования профиля и поля ввода имени и подписи пользователя
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
const profileEditForm = document.forms.profileEditForm;
const userNameInput = profileEditForm.elements.userName;
const userBioInput = profileEditForm.elements.userBio;

// находим попа-форму добавления карточки места в галерею и поля ввода для фото и названия места
const itemAddPopup = document.querySelector('.popup_type_add-item');
const itemAddForm = document.forms.itemAddForm;
const itemPhotoInput = itemAddForm.elements.placeLink;
const itemNameInput = itemAddForm.elements.placeName;

// находим попап просмотра увеличенной фотографии места
const itemPhotoPopup = document.querySelector('.popup_type_item-photo');
const itemBigPhoto = itemPhotoPopup.querySelector('.popup__item-photo');
const itemBigPhotoCaption = itemPhotoPopup.querySelector('.popup__item-caption')

// находим кнопки открытия и закрытия форм и попапов
const openProfileEditPopupButton = profile.querySelector('.profile__button-edit');
const openItemAddPopupButton = profile.querySelector('.profile__button-add');

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
function openPopup(popup) {
	popup.classList.add('popup_opened');
}

// функция для закрытия форм и попапов
function  closePopup(popup) {
	popup.classList.remove('popup_opened');
}

// работаем с профилем
// обработчик кнопки открытия формы редактирования профиля
openProfileEditPopupButton.addEventListener('click', () => {
	openPopup(profileEditPopup)

	userNameInput.value = userName.textContent;
	userBioInput.value = userBio.textContent;
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
	openPopup(itemAddPopup)
});

//функция создания элемента галереи
function createItem(itemData) {
	const itemTemplate = document.querySelector('#item-template').content;
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
	itemAddForm.reset();
	closePopup(itemAddPopup);
}

// обработчик отправки формы добавления нового элемента в галерею
itemAddForm.addEventListener('submit', itemAddFormSubmit);

// функция для открытия попапа просмотра фотографий карточки места
function itemPhotoPopupOpen(photo, caption) {
	photo.addEventListener('click', () => {
		openPopup(itemPhotoPopup);

		itemBigPhoto.src = photo.src;
		itemBigPhoto.alt = photo.alt;
		itemBigPhotoCaption.textContent = caption.textContent;
	});
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
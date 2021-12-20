// массив карточек мест по умолчанию
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
const profileElement = document.querySelector('.profile');
const userNameElement = profileElement.querySelector('.profile__user-name');
const userBioElement = profileElement.querySelector('.profile__user-bio');

// находим элемент галереи
const galleryElement = document.querySelector('.gallery');

// находим форму редактирования профиля и поля ввода именя и подписи пользователя
const profileEditForm = document.querySelector('.popup_type_profile-edit');
const userNameInput = profileEditForm.querySelector('.popup__form-item_el_user-name');
const userBioInput = profileEditForm.querySelector('.popup__form-item_el_bio');

// находим форму добавления карточки места в галерею и ее элемнты
const itemAddForm = document.querySelector('.popup_type_add-item');
const itemPhotoInput = itemAddForm.querySelector('.popup__form-item_el_place-link');
const itemNameInput = itemAddForm.querySelector('.popup__form-item_el_place-name');

// находим попап просмотра увеличенной фотографии места
const itemPhotoPopup = document.querySelector('.popup_type_item-photo');
const itemBigPhoto = itemPhotoPopup.querySelector('.popup__item-photo');
const itemBigPhotoCaption = itemPhotoPopup.querySelector('.popup__item-caption')

// находим кнопки открытия и закрытия форм и попапов
const openProfileEditFormButton = profileElement.querySelector('.profile__button-edit');
const closeProfileEditFormButton = profileEditForm.querySelector('.popup__close-button');
const openItemAddFormButton = profileElement.querySelector('.profile__button-add');
const closeItemAddFormButton = itemAddForm.querySelector('.popup__close-button');
const closePhotoPopupButton = itemPhotoPopup.querySelector('.popup__close-button');

// рендерим карточки для галереи по умолчанию
initialItems.forEach(item => {
	itemAdd(item);
});

// задаем функцию для обработки лайка карточки места
function likeElement(likeButton) {
	likeButton.addEventListener('click', function (evt) {
		evt.target.classList.toggle('gallery__like-button_active');
	});
}

// задаем функцию для удаления карточки места
function deleteElement(deleteButton) {
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

// обработчик кнопки открытия формы редактирования профиля
openProfileEditFormButton.addEventListener('click', () => {
	openForm(profileEditForm)

	userNameInput.value = userNameElement.textContent;
	userBioInput.value = userBioElement.textContent;
});

// функция отправки формы редактирования профиля
function profileEditFormSubmit(evt) {
	evt.preventDefault();

	userNameElement.textContent = userNameInput.value;
	userBioElement.textContent = userBioInput.value;

	closeForm(profileEditForm);
}

// обработчик отправки формы редактирования профиля
profileEditForm.addEventListener('submit', profileEditFormSubmit);

// работаем с галереей
// функция открытия формы добавления места
openItemAddFormButton.addEventListener('click', () => {
	openForm(itemAddForm)
});

//функция создания карточки места в галерее
function itemAdd(itemData) {
	const itemTemplate = document.querySelector('#item-template').content;
	const galleryItemElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);
	const elementPhoto = galleryItemElement.querySelector('.gallery__photo');
	const elementCaption = galleryItemElement.querySelector('.gallery__caption');

	elementPhoto.setAttribute('src', itemData.link);
	elementPhoto.setAttribute('alt', itemData.name);
	elementCaption.textContent = itemData.name;

	const elementLikeButton = galleryItemElement.querySelector('.gallery__like-button');
	const elementDeleteButton = galleryItemElement.querySelector('.gallery__delete-button');

	likeElement(elementLikeButton);
	deleteElement(elementDeleteButton);

	galleryElement.prepend(galleryItemElement);
	itemPhotoPopupOpen();
}

// функция отправки формы с добавлением нового места в галерею
function itemAddFormSubmit(evt) {
	evt.preventDefault();

	const itemData = {link: itemPhotoInput.value, name: itemNameInput.value};

	itemAdd(itemData);
	closeForm(itemAddForm);
}

// обработчик отправки формы добавления нового места
itemAddForm.addEventListener('submit', itemAddFormSubmit);

// функция для открытия попапа просмотра фотографий карточки места
function itemPhotoPopupOpen() {
	const galleryItemElements = galleryElement.querySelectorAll('.gallery__item');

	galleryItemElements.forEach(item => {
		const galleryItemPhoto = item.querySelector('.gallery__photo');
		const galleryItemCaption = item.querySelector('.gallery__caption');

		galleryItemPhoto.addEventListener('click', () => {
			openForm(itemPhotoPopup);

			itemBigPhoto.src = galleryItemPhoto.src;
			itemBigPhoto.alt = galleryItemPhoto.alt;
			itemBigPhotoCaption.textContent = galleryItemCaption.textContent;
		});
	});
}

// обработчики кнопок закрытия форм
closeProfileEditFormButton.addEventListener('click', () => closeForm(profileEditForm));
closeItemAddFormButton.addEventListener('click', () => closeForm(itemAddForm));
closePhotoPopupButton.addEventListener('click', () => closeForm(itemPhotoPopup));

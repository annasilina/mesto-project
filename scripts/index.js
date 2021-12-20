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

// рендерим карточки для галереи по умолчанию
initialItems.forEach(item => {
	galleryElement.insertAdjacentHTML('beforeend', `
		<article class="gallery__item">
			<img class="gallery__photo" src=${item.link} alt=${item.name}>
			<h2 class="gallery__caption">${item.name}</h2>
			<button type="button" class="gallery__like-button button"></button>
			<button type="button" class="gallery__delete-button button"></button>
		</article>`);
});

// находим элементы карточек в галерее
let galleryItemElements = galleryElement.querySelectorAll('.gallery__item');

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
const itemPhoto = itemPhotoPopup.querySelector('.popup__item-photo');
const itemPhotoCaption = itemPhotoPopup.querySelector('.popup__item-caption')

// находим кнопки открытия и закрытия форм и попапов
const openProfileEditFormButton = profileElement.querySelector('.profile__button-edit');
const closeProfileEditFormButton = profileEditForm.querySelector('.popup__close-button');
const openItemAddFormButton = profileElement.querySelector('.profile__button-add');
const closeItemAddFormButton = itemAddForm.querySelector('.popup__close-button');
const closePhotoPopupButton = itemPhotoPopup.querySelector('.popup__close-button');

// задаем функцию для обработки лайка карточки места
function likeItem() {
	let likeItemButtons = galleryElement.querySelectorAll('.gallery__like-button');

	likeItemButtons.forEach(button => {
		button.addEventListener('click', function (evt) {
			const eventTarget = evt.target;

			eventTarget.classList.toggle('gallery__like-button_active');
		});
	});
}

// задаем функцию для обработки удаления карточки места
function deleteItem() {
	let deleteItemButtons = galleryElement.querySelectorAll('.gallery__delete-button');

	deleteItemButtons.forEach(button => {
		button.addEventListener('click', function (evt) {
			evt.target.parentNode.remove();
		});
	});
}

// вызываем функции для обработки лайка места и удаления места
likeItem();
deleteItem();

// функция для открытия форм
function openForm(form) {
	form.classList.add('popup_opened');
}

// функция для закрытия форм
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

//функция добавления карточки места в галераю и обработки кнопок внутри карточки
function itemAdd(itemName, itemPhoto) {
	const itemTemplate = document.querySelector('#item-template').content;
	const galleryItemElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);

	galleryItemElement.querySelector('.gallery__photo').setAttribute('src', itemPhoto);
	galleryItemElement.querySelector('.gallery__photo').setAttribute('alt', itemName);
	galleryItemElement.querySelector('.gallery__caption').textContent = itemName;

	const likeButton = galleryItemElement.querySelector('.gallery__like-button');
	const deleteButton = galleryItemElement.querySelector('.gallery__delete-button');

	likeButton.addEventListener('click', function (evt) {
		evt.target.classList.toggle('gallery__like-button_active');
	});

	deleteButton.addEventListener('click', function (evt) {
		evt.target.parentNode.remove();
	});

	galleryElement.prepend(galleryItemElement);
	galleryItemElements = galleryElement.querySelectorAll('.gallery__item');
}

// функция отправки формы с добавлением нового места в галерею
function itemAddFormSubmit(evt) {
	evt.preventDefault();

	itemAdd(itemNameInput.value, itemPhotoInput.value);
	itemPhotoPopupOpen();
	closeForm(itemAddForm);
}

// обработчик отправки формы добавления нового места
itemAddForm.addEventListener('submit', itemAddFormSubmit);

// обработчик открытия попапа просмотра фотографий карточки места
function itemPhotoPopupOpen() {
	galleryItemElements.forEach(item => {
		let galleryItemPhoto = item.querySelector('.gallery__photo');
		let galleryItemCaption = item.querySelector('.gallery__caption');

		galleryItemPhoto.addEventListener('click', () => {
			openForm(itemPhotoPopup);

			itemPhoto.setAttribute('src', galleryItemPhoto.getAttribute('src'));
			itemPhoto.setAttribute('alt', galleryItemPhoto.getAttribute('alt'));
			itemPhotoCaption.textContent = galleryItemCaption.textContent;
		});
	});
}

itemPhotoPopupOpen();

// обработчики кнопок закрытия форм
closeProfileEditFormButton.addEventListener('click', () => closeForm(profileEditForm));
closeItemAddFormButton.addEventListener('click', () => closeForm(itemAddForm));
closePhotoPopupButton.addEventListener('click', () => closeForm(itemPhotoPopup));

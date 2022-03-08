import { openPopupPlaceShow } from './modal.js';

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

// находим галерею мест
const gallery = document.querySelector('.gallery');

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

// функция добавления нового элемента галереи
function addNewPlace(placeElement) {
	gallery.prepend(placeElement);
}


export { initialPlaces, gallery, createPlace, addNewPlace }
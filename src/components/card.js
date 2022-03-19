import { openPopupPlaceShow } from './modal.js';

// находим галерею мест
const gallery = document.querySelector('.gallery');

// функция создания элемента галереи

function createPlace(placeData) {
	const placeTemplate = document.querySelector('#place-template').content;
	const placeElement = placeTemplate.querySelector('.gallery__place').cloneNode(true);
	const placePhoto = placeElement.querySelector('.gallery__place-photo');
	const placeCaption = placeElement.querySelector('.gallery__place-caption');
	const placeLikeCounter = placeElement.querySelector('.gallery__like-counter');

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


export { gallery, createPlace, addNewPlace }
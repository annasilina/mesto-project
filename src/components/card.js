import { openPopupPlaceShow } from './modal.js';
import { removePlace } from './api.js';

// находим галерею мест
const gallery = document.querySelector('.gallery');

// функция создания элемента галереи
function createPlace(placeData, currentUserId) {
	const placeTemplate = document.querySelector('#place-template').content;
	const placeElement = placeTemplate.querySelector('.gallery__place').cloneNode(true);
	const placePhoto = placeElement.querySelector('.gallery__place-photo');
	const placeCaption = placeElement.querySelector('.gallery__place-caption');
	const placeLikeCounter = placeElement.querySelector('.gallery__like-counter');
	const placeButtonLike = placeElement.querySelector('.gallery__button-like');
	const placeButtonDelete = placeElement.querySelector('.gallery__button-delete');

	let ownerId = placeData.owner['_id'];

	if (ownerId === currentUserId) {
		placeButtonDelete.classList.add('gallery__button-delete_active');
	}

	if (isLiked(placeData, currentUserId)) {
		placeButtonLike.classList.add('gallery__button-like_active');
	}

	placePhoto.src = placeData.link;
	placePhoto.alt =  placeData.name;
	placeCaption.textContent = placeData.name;
	placeLikeCounter.textContent = placeData.likes.length;

	likePlace(placeButtonLike);
	deletePlace(placeButtonDelete, placeData);
	openPopupPlaceShow(placePhoto, placeCaption);

	return placeElement;
}

// работаем с кнопками в галерее

function isLiked(place, currentUserId) {
	return place.likes.find((user) => user['_id'] === currentUserId);
}

//
function likePlace(buttonLike) {
	buttonLike.addEventListener('click', function (evt) {
		evt.target.classList.toggle('gallery__button-like_active');
	})
}

// функция для обработки кнопки удаления элемента галереи
function deletePlace(buttonDelete, place) {
	buttonDelete.addEventListener('click', function (evt) {
		evt.target.parentElement.remove();

		removePlace(place['_id'])
			.then()
			.catch((err) => console.log(err));
	});
}

// функция добавления нового элемента галереи
function addNewPlace(placeElement) {
	gallery.prepend(placeElement);
}


export { gallery, createPlace, addNewPlace }
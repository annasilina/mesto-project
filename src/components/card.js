import {openPopupPlaceShow} from './modal.js';
import {deleteLikeAtPlace, putLikeAtPlace, removePlace} from './api.js';
import {currentUserId} from './profile';

// находим галерею мест
const gallery = document.querySelector('.gallery');

// функция рендера галереи
function renderGallery(places) {
	places.forEach(place => {
		gallery.append(createPlace(place, currentUserId));
	})
}

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

	placePhoto.src = placeData.link;
	placePhoto.alt = placeData.name;
	placeCaption.textContent = placeData.name;

	renderLikes(placeData.likes, currentUserId, placeButtonLike, placeLikeCounter);
	handleLikeToggle(placeButtonLike, placeLikeCounter, placeData, currentUserId);
	handlePlaceDelete(placeButtonDelete, placeData);
	openPopupPlaceShow(placePhoto, placeCaption);

	return placeElement;
}

function renderLikes(likes, currentUserId, placeButtonLike, placeLikeCounter) {
	if (isLiked(likes, currentUserId)) {
		placeButtonLike.classList.add('gallery__button-like_active');
	}
	placeLikeCounter.textContent = likes.length;
}

// работаем с кнопками в галерее
function isLiked(likes, currentUserId) {
	return likes.find(user => user['_id'] === currentUserId);
}

function handleLikeToggle(placeButtonLike, placeLikeCounter, placeData, currentUserId) {
	placeButtonLike.addEventListener('click', function (evt) {
		if (isLiked(placeData.likes, currentUserId)) {
			evt.target.classList.remove('gallery__button-like_active');
			deleteLikeAtPlace(placeData['_id'])
				.then(newPlaceData => {
					renderLikes(newPlaceData.likes, currentUserId, placeButtonLike, placeLikeCounter);
				})
				.catch(err => console.log(err))
		} else {
			putLikeAtPlace(placeData['_id'])
				.then(newPlaceData => {
					renderLikes(newPlaceData.likes, currentUserId, placeButtonLike, placeLikeCounter);
				})
				.catch(err => console.log(err))
		}
	})
}

// функция для обработки кнопки удаления элемента галереи
function handlePlaceDelete(buttonDelete, place) {
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

export {gallery, createPlace, addNewPlace, renderGallery}
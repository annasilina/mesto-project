import {openPopupPlaceShow} from './modal.js';
import {deleteLikeAtPlace, putLikeAtPlace, removePlace} from './api.js';
import {currentUserId} from './profile';

// находим галерею в разметке
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

	let ownerId = placeData.owner['_id']; //проверяем оунера карточки

	if (ownerId === currentUserId) {
		placeButtonDelete.classList.add('gallery__button-delete_active'); // если карточка добавления текущим юзером -
		// добавляем кнопку удаления
	}

	//заполняем карточку
	placePhoto.src = placeData.link;
	placePhoto.alt = placeData.name;
	placeCaption.textContent = placeData.name;

	renderLikes(placeData.likes, currentUserId, placeButtonLike, placeLikeCounter); // показываем лайки
	handleLikeToggle(placeButtonLike, placeLikeCounter, placeData, currentUserId); // запускаем работу кнопки лайка
	handlePlaceDelete(placeButtonDelete, placeData); // запускаем работу кнопки удаления
	openPopupPlaceShow(placePhoto, placeCaption); // запускаем работу открытия фотографии при клику на карточку

	return placeElement;
}

// функция рендера лайков на карточке
function renderLikes(likes, currentUserId, placeButtonLike, placeLikeCounter) {
	if (isLiked(likes, currentUserId)) {
		placeButtonLike.classList.add('gallery__button-like_active'); // если среди лайкнувших есть текущий пользователь
		// - показываем его лайк
	}
	placeLikeCounter.textContent = likes.length;
}

// функция проверки наличия лайка от текущего пользователя на карточке
function isLiked(likes, currentUserId) {
	return likes.find(user => user['_id'] === currentUserId);
}

const rus = {};

// функция управления снятием/постановкой лайка по нажатию на кнопку лайка
function handleLikeToggle(placeButtonLike, placeLikeCounter, placeData, currentUserId) {
	placeButtonLike.addEventListener('click', function (evt) {
		if (evt.target.classList.contains('gallery__button-like_active')) {
			deleteLikeAtPlace(placeData['_id'])
				.then(newPlaceData => {
					evt.target.classList.remove('gallery__button-like_active');
					renderLikes(newPlaceData.likes, currentUserId, placeButtonLike, placeLikeCounter);
				})
				.catch(err => console.log(err));
		} else {
			putLikeAtPlace(placeData['_id'])
				.then(newPlaceData => {
					evt.target.classList.add('gallery__button-like_active');
					renderLikes(newPlaceData.likes, currentUserId, placeButtonLike, placeLikeCounter);
				})
				.catch(err => console.log(err));
		}
	});
}

// функция для удаления элемента галереи по кнопке удаления
function handlePlaceDelete(buttonDelete, placeData) {
	buttonDelete.addEventListener('click', function (evt) {
		removePlace(placeData['_id'])
			.then(() => {
				evt.target.parentElement.remove();
			})
			.catch((err) => console.log(err));
	});
}

// функция для добавления нового элемента галереи
function addNewPlace(placeElement) {
	gallery.prepend(placeElement);
}

export {gallery, createPlace, addNewPlace, renderGallery}
/*import {openPopupPlaceShow} from './modal.js';*/
// import {deleteLikeAtPlace, putLikeAtPlace, removePlace} from './Api.js';
import {currentUserId} from './profile';
/*import {api} from './index.js';*/

// находим галерею в разметке
const gallery = document.querySelector('.gallery');

// Section - функция рендера галереи
function renderGallery(places) {
	places.forEach(place => {
		gallery.append(new Card(place, '#place-template').createPlace(currentUserId)); // сделать НОРМАЛЬНО
	})
}

export default class Card {
	constructor(placeData, /*handleLikeToggle, handlePlaceDelete, openPopupPlaceShow,*/ selector) {
		this._id = placeData._id;
		this._name = placeData.name;
		this._link = placeData.link;
		this._ownerId = placeData.owner._id;
		this._likes = placeData.likes;
		this._selector = selector;
		/*this._handleLikeToggle = handleLikeToggle;
		this._handlePlaceDelete = handlePlaceDelete;
		this._openPopupPlaceShow = openPopupPlaceShow;*/
	}

	_getElement = () => {
		this._placeTemplate = document.querySelector(this._selector).content
		this._placeElement = this._placeTemplate.querySelector('.gallery__place').cloneNode(true);

		return this._placeElement;
	}

	_isLiked = (currentUserId) => {
		return this._likes.find(user => user._id === currentUserId);
	}

	renderLikes = (currentUserId) => {
		if (this._isLiked(currentUserId)) {
			this._placeButtonLike.classList.add('gallery__button-like_active'); // если среди лайкнувших есть текущий
			// пользователь
			// - показываем его лайк
		}

		this._placeLikeCounter.textContent = this._likes.length;
	}

	/*_setEventListeners = () => {
		this._placeButtonLike.addEventListener('click', () => {this._handleLikeToggle()});
		this._placeButtonDelete.addEventListener('click', () => {this._handlePlaceDelete()});
		this._placePhoto.addEventListener('click', () => {this._openPopupPlaceShow()});
	}*/

	createPlace = (currentUserId) => {
		this._placeElement = this._getElement();
		this._placeCaption = this._placeElement.querySelector('.gallery__place-caption');
		this._placePhoto = this._placeElement.querySelector('.gallery__place-photo');
		this._placeLikeCounter = this._placeElement.querySelector('.gallery__like-counter');
		this._placeButtonLike = this._placeElement.querySelector('.gallery__button-like');
		this._placeButtonDelete = this._placeElement.querySelector('.gallery__button-delete');

		if (this._ownerId === currentUserId) {
			this._placeButtonDelete.classList.add('gallery__button-delete_active'); // если карточка добавления текущим
			// юзером -
			// добавляем кнопку удаления
		}

		//заполняем карточку
		this._placePhoto.src = this._link;
		this._placePhoto.alt = this._name;
		this._placeCaption.textContent = this._name;
		this.renderLikes(currentUserId);
		/*this._setEventListeners();*/

		return this._placeElement;
	}

}


/*// функция создания элемента галереи
function createPlace(placeData, currentUserId) {
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
}*/

// функция рендера лайков на карточке
/*function renderLikes(likes, currentUserId, placeButtonLike, placeLikeCounter) {
	if (isLiked(likes, currentUserId)) {
		placeButtonLike.classList.add('gallery__button-like_active'); // если среди лайкнувших есть текущий пользователь
		// - показываем его лайк
	}
	placeLikeCounter.textContent = likes.length;
}*/

// функция проверки наличия лайка от текущего пользователя на карточке
/*
function isLiked(likes, currentUserId) {
	return likes.find(user => user['_id'] === currentUserId);
}
*/

// функция управления снятием/постановкой лайка по нажатию на кнопку лайка
/*function handleLikeToggle(placeButtonLike, placeLikeCounter, placeData, currentUserId) {
	placeButtonLike.addEventListener('click', function (evt) {
		if (evt.target.classList.contains('gallery__button-like_active')) {
			api.deleteLikeAtPlace(placeData['_id'])
				.then(newPlaceData => {
					evt.target.classList.remove('gallery__button-like_active');
					renderLikes(newPlaceData.likes, currentUserId, placeButtonLike, placeLikeCounter);
				})
				.catch(err => console.log(err));
		} else {
			api.putLikeAtPlace(placeData['_id'])
				.then(newPlaceData => {
					evt.target.classList.add('gallery__button-like_active');
					renderLikes(newPlaceData.likes, currentUserId, placeButtonLike, placeLikeCounter);
				})
				.catch(err => console.log(err));
		}
	});
}*/

// функция для удаления элемента галереи по кнопке удаления
/*function handlePlaceDelete(buttonDelete, placeData) {
	buttonDelete.addEventListener('click', function (evt) {
		api.removePlace(placeData['_id'])
			.then(() => {
				evt.target.parentElement.remove();
			})
			.catch((err) => console.log(err));
	});
}*/

// Section - функция для добавления нового элемента галереи
function addNewPlace(placeElement) {
	gallery.prepend(placeElement);
}

export {gallery, addNewPlace, renderGallery}
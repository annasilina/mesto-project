/*import {openPopupPlaceShow} from './modal.js';*/
// import {deleteLikeAtPlace, putLikeAtPlace, removePlace} from './Api.js';
import {currentUserId} from './profile';
import {api} from "./index";
/*import {api} from './index.js';*/

// находим галерею в разметке
const gallery = document.querySelector('.gallery');

// Section - функция рендера галереи
function renderGallery(items) {
	items.forEach(item => {
		gallery.append(new Card(item, handleLikeToggle, '#place-template').createCard(currentUserId)); // сделать НОРМАЛЬНО
	})
}

const handleLikeToggle = (card) => {
	if (card.getLikeStatus()) {
		api.deleteLikeAtPlace(card._id)
			.then((newCardData) => {
				card.renderLikes(newCardData);
			})
			.catch(err => console.log(err));
	} else {
		api.putLikeAtPlace(card._id)
			.then((newCardData) => {
				card.renderLikes(newCardData);
			})
			.catch(err => console.log(err));
	}
}

export default class Card {
	constructor(cardData, handleLikeToggle, /*handlePlaceDelete, openPopupPlaceShow,*/ selector) {
		this._id = cardData._id;
		this._name = cardData.name;
		this._link = cardData.link;
		this._ownerId = cardData.owner._id;
		this._likes = cardData.likes;
		this._selector = selector;
		this._handleLikeToggle = handleLikeToggle;
		/*this._handlePlaceDelete = handlePlaceDelete;
		this._openPopupPlaceShow = openPopupPlaceShow;*/
	}

	_getElement = () => {
		this._cardTemplate = document.querySelector(this._selector).content
		this._cardElement = this._cardTemplate.querySelector('.gallery__place').cloneNode(true);

		return this._cardElement;
	}

	renderLikes = (cardData) => {
		this._cardButtonLike.classList.toggle('gallery__button-like_active');
		this._cardLikeCounter.textContent = cardData.likes.length;
		this._isLiked = !this._isLiked;
	}

	getLikeStatus = () => {
		return this._isLiked;
	}

	_setEventListeners = () => {
		this._cardButtonLike.addEventListener('click', () => {
			this._handleLikeToggle(this);
		});
		/*this._cardButtonDelete.addEventListener('click', () => {this._handlePlaceDelete()});
		this._cardPhoto.addEventListener('click', () => {this._openPopupPlaceShow()});*/
	}

	createCard = (currentUserId) => {
		this._cardElement = this._getElement();
		this._cardCaption = this._cardElement.querySelector('.gallery__place-caption');
		this._cardPhoto = this._cardElement.querySelector('.gallery__place-photo');
		this._cardLikeCounter = this._cardElement.querySelector('.gallery__like-counter');
		this._cardButtonLike = this._cardElement.querySelector('.gallery__button-like');
		this._cardButtonDelete = this._cardElement.querySelector('.gallery__button-delete');
		this._isLiked = this._likes.find(user => user._id === currentUserId);

		if (this._ownerId === currentUserId) {
			this._cardButtonDelete.classList.add('gallery__button-delete_active'); // если карточка добавления текущим
			// юзером -
			// добавляем кнопку удаления
		}

		if (this._isLiked) {
			this._cardButtonLike.classList.add('gallery__button-like_active');
		}

		//заполняем карточку
		this._cardPhoto.src = this._link;
		this._cardPhoto.alt = this._name;
		this._cardCaption.textContent = this._name;
		this._cardLikeCounter.textContent = this._likes.length;

		this._setEventListeners();

		return this._cardElement;
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
function addNewCard(cardElement) {
	gallery.prepend(cardElement);
}

export {gallery, addNewCard, renderGallery}
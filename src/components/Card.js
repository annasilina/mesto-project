/*import {openPopupPlaceShow} from './modal.js';*/
/*import {api} from "./index";*/

export default class Card {
	constructor(cardData, handleLikeToggle, /*handlePlaceDelete,*/ handleCardClick, selector) {
		this._id = cardData._id;
		this._name = cardData.name;
		this._link = cardData.link;
		this._ownerId = cardData.owner._id;
		this._likes = cardData.likes;
		this._selector = selector;
		this._handleLikeToggle = handleLikeToggle;
		/*this._handlePlaceDelete = handlePlaceDelete;*/
		this._handleCardClick = handleCardClick;
	}

	_getElement = () => {
		this._cardTemplate = document.querySelector(this._selector).content
		this._cardElement = this._cardTemplate.querySelector('.gallery__place').cloneNode(true);

		return this._cardElement;
	}

	renderLikes = (cardData) => {
		this._cardButtonLike.classList.toggle('gallery__button-like_active');
		this._cardLikeCounter.textContent = cardData.likes.length;
		this._likeStatus = !this._likeStatus;
	}

	getLikeStatus = () => {
		return this._likeStatus;
	}

	_isLiked = (currentUserId) => {
		return this._likes.find(user => user._id === currentUserId);
	}

	_setEventListeners = () => {
		this._cardButtonLike.addEventListener('click', () => {
			this._handleLikeToggle(this);
		});
		// add listener for open popup full size
		this._cardPhoto.addEventListener('click', () =>{
			this._handleCardClick(this._name, this._link);
		})
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

		this._likeStatus = this._isLiked(currentUserId);

		if (this._ownerId === currentUserId) {
			this._cardButtonDelete.classList.add('gallery__button-delete_active'); // если карточка добавления текущим
			// юзером -
			// добавляем кнопку удаления
		}

		if (this._likeStatus) {
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

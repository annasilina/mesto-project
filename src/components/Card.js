export default class Card {
	constructor(cardData, handleLikeToggle, handleCardClick, handleCardDelete, templateSelector) {
		this._id = cardData._id;
		this._name = cardData.name;
		this._link = cardData.link;
		this._ownerId = cardData.owner._id;
		this._likes = cardData.likes;
		this._templateSelector = templateSelector;
		this._handleLikeToggle = handleLikeToggle;
		this._handleCardClick = handleCardClick;
		this._handleCardDelete = handleCardDelete;
	}

	_getElement = () => {
		this._cardTemplate = document.querySelector(this._templateSelector).content
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
		this._cardImage.addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		})
		this._cardButtonDelete.addEventListener('click', () => {
			this._handleCardDelete(this._cardButtonDelete, this._id);
		});
	}

	createCard = (currentUserId) => {
		this._cardElement = this._getElement();
		this._cardCaption = this._cardElement.querySelector('.gallery__place-caption');
		this._cardImage = this._cardElement.querySelector('.gallery__place-photo');
		this._cardLikeCounter = this._cardElement.querySelector('.gallery__like-counter');
		this._cardButtonLike = this._cardElement.querySelector('.gallery__button-like');
		this._cardButtonDelete = this._cardElement.querySelector('.gallery__button-delete');

		this._likeStatus = this._isLiked(currentUserId);

		if (this._ownerId === currentUserId) {
			this._cardButtonDelete.classList.add('gallery__button-delete_active');
		}

		if (this._likeStatus) {
			this._cardButtonLike.classList.add('gallery__button-like_active');
		}

		this._cardImage.src = this._link;
		this._cardImage.alt = this._name;
		this._cardCaption.textContent = this._name;
		this._cardLikeCounter.textContent = this._likes.length;

		this._setEventListeners();

		return this._cardElement;
	}
}


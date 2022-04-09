export default class Api {
	constructor(options) {
		this._url = options.baseURL;
		this._headers = options.headers;
	}

	// функция проверки ответа на запрос
	_checkResponse(res) {
		if (res.ok) {
			return res.json();
	}

	return Promise.reject(`ошибка: ${res.status}`);
	}

	// функция получения данных пользователя с сервера
	getUserInfo = () => {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers
		}).then((res) => this._checkResponse(res));
	}

	// функция получения первичных карточек с сервера
	getInitialCards = () => {
		return fetch(`${this._url}/cards`, {
			headers: this._headers
		}).then((res) => this._checkResponse(res));
	}

	// функция отправки данных пользователя на сервер
	sendUserInfo = (name, about) => {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				about: about,
			})
		}).then((res) => this._checkResponse(res));
	}

	// функция отправки данных новой карточки на сервер
	sendNewCard = (name, link) => {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				link: link,
			})
		}).then((res) => this._checkResponse(res));
	}

	// функция отправки данных нового аватара пользователя на сервер
	sendAvatar = (link) => {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: link,
			})
		}).then((res) => this._checkResponse(res))
	}

	// функция удаления данных карточки с сервера
	removeCard = (cardId) => {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		}).then((res) => this._checkResponse(res));
	}

	// функция отправки данных для нового лайка на сервер
	putLikeAtCard = (cardId) => {
		return fetch(`${this._url}/cards/likes/${cardId}`, {
			method: 'PUT',
			headers: this._headers
		}).then((res) => this._checkResponse(res));
	}

	// функция удаления данных лайка с сервера
	deleteLikeAtCard = (cardId) => {
		return fetch(`${this._url}/cards/likes/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		}).then((res) => this._checkResponse(res))
	}
}
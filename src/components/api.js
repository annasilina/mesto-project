const config = {
	baseURL: 'https://nomoreparties.co/v1/plus-cohort7',
	headers: {
		authorization: '963eab40-f1b1-4bf3-8893-fd8fa8464a41',
		'Content-Type': 'application/json'
	}
}

function checkResponse(res) {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`ошибка: ${res.status}`);
}

const getUserInfo = () => {
	return fetch(`${config.baseURL}/users/me`, {
		headers: {
			authorization: config.headers.authorization
		}
	}).then((res) => checkResponse(res));
}

const getInitialPlaces = () => {
	return fetch(`${config.baseURL}/cards`, {
		headers: {
			authorization: config.headers.authorization
		}
	}).then((res) => checkResponse(res));
}

const sendUserInfo = (name, about) => {
	return fetch(`${config.baseURL}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about,
		})
	}).then((res) => checkResponse(res));
}

const sendNewCard = (name, link) => {
	return fetch(`${config.baseURL}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
		})
	}).then((res) => checkResponse(res));
}

const sendAvatar = (link) => {
	return fetch(`${config.baseURL}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: link,
		})
	}).then((res) => checkResponse(res))
}

const removePlace = (placeId) => {
	return fetch(`${config.baseURL}/cards/${placeId}`, {
		method: 'DELETE',
		headers: {
			authorization: config.headers.authorization
		}
	}).then((res) => checkResponse(res));
}

const putLikeAtPlace = (placeId) => {
	return fetch(`${config.baseURL}/cards/likes/${placeId}`, {
		method: 'PUT',
		headers: {
			authorization: config.headers.authorization
		}
	}).then((res) => checkResponse(res));
}

const deleteLikeAtPlace = (placeId) => {
	return fetch(`${config.baseURL}/cards/likes/${placeId}`, {
		method: 'DELETE',
		headers: {
			authorization: config.headers.authorization
		}
	}).then((res) => checkResponse(res))
}
export {
	getInitialPlaces,
	getUserInfo,
	sendNewCard,
	sendAvatar,
	sendUserInfo,
	removePlace,
	putLikeAtPlace,
	deleteLikeAtPlace
}
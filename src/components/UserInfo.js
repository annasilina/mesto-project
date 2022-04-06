// находим профиль и элементы имени и подписи пользовател

// объявляем переменную для хранения id текущего пользователя
let currentUserId = '';

export default class UserInfo{
	constructor(name, bio, avatar){
		this._userName = name;
		this._userBio = bio;
		this._avatar = avatar;
	}

// функция установки данных профиля
	setUserInfo(userData) {
		this._userName.textContent = userData.name;
		this._userBio.textContent = userData.about;
		this._avatar.src = userData.avatar;
		// currentUserId = userData['_id'];
	}
}







// export {userInfo, userName, userBio, avatar, currentUserId, setProfileParams}
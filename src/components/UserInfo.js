export default class UserInfo{
	constructor(name, bio, avatar){
		this._userName = name;
		this._userBio = bio;
		this._avatar = avatar;
	}

	getUserInfo() {

	}
// функция установки данных профиля
	setUserInfo(userData) {
		this._name.textContent = userData.name;
		this._bio.textContent = userData.about;
		this._avatar.src = userData.avatar;
	}
}
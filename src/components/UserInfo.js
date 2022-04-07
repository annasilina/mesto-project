export default class UserInfo{
	constructor(name, bio, avatar){
		this._name = name;
		this._bio = bio;
		this._avatar = avatar;
	}

	getUserInfo() {
		const currentProfileData = {
			userName: this._name.textContent,
			userBio: this._bio.textContent,
			avatarLink: this._avatar.src,
		};
		return currentProfileData;
	}
// функция установки данных профиля
	setUserInfo(userData) {
		this._name.textContent = userData.name;
		this._bio.textContent = userData.about;
		this._avatar.src = userData.avatar;
	}
}
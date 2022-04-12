export default class UserInfo{
	constructor(name, bio, avatar){
		this._name = name;
		this._bio = bio;
		this._avatar = avatar;
	}

	getUserInfo() {
		const currentUserInfo = {
			userName: this._name.textContent,
			userBio: this._bio.textContent,
			avatarLink: this._avatar.src,
		};
		return currentUserInfo;
	}

	setUserInfo(userData) {
		this._name.textContent = userData.name;
		this._bio.textContent = userData.about;
		this._avatar.src = userData.avatar;
		this._id = userData._id;
	}
}
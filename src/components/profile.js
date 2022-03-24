// находим профиль и элементы имени и подписи пользователя
const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__user-name');
const userBio = profile.querySelector('.profile__user-bio');
const avatar = profile.querySelector('.profile__photo');

// объявляем переменную для хранения id текущего пользователя
let currentUserId = '';

// функция установки данных профиля
function setProfileParams(userData) {
	userName.textContent = userData.name;
	userBio.textContent = userData.about;
	avatar.src = userData.avatar;
	currentUserId = userData['_id'];
}

export {profile, userName, userBio, avatar, currentUserId, setProfileParams}
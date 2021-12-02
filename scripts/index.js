// находим элементы профиля
const profile = document.querySelector('.profile');
const userNameElement = profile.querySelector('.profile__user-name');
const userBioElement = profile.querySelector('.profile__user-bio');

// находим элементы галлереи мест


// находим кнопки: редактирование профиля, добавление карточки, лайк, удаление
const editButton = profile.querySelector('.profile__button-edit');
const addButton = profile.querySelector('.profile__button-add');

// находим форму редактирования профиля и поля ввода для нее
const profileForm = document.querySelector('.popup_type_profile-edit');
const userNameInput = profileForm.querySelector('.popup__form-item_el_user-name');
const userBioInput = profileForm.querySelector('.popup__form-item_el_bio');

// находим кнопки формы редактирования профиля
const saveButton = profileForm.querySelector('.popup__save-button')
const closeButton = profileForm.querySelector('.popup__close-button');

// функция для открытия формы редактирования профиля
editButton.addEventListener('click', function () {
	profileForm.classList.add('popup_opened');

	userNameInput.value = userNameElement.textContent;
	userBioInput.value = userBioElement.textContent;
});

// функция-обработчик для отправки данных о пользователе
function profileFormSubmit(event) {
	event.preventDefault();

	let userName = userNameInput.value;
	let userBio = userBioInput.value;

	userNameElement.textContent = userName;
	userBioElement.textContent = userBio;
}

// вызов обработчика события для отправки данных о пользователе
profileForm.addEventListener('submit', profileFormSubmit);

// функция-обработчик для закрытия формы редактирования профиля
function closePopup() {
	profileForm.classList.remove('popup_opened');
}

// вызов обработчика события для закрытия формы редактирования по кликам на кнопки: закрыть/сохранить
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', closePopup);
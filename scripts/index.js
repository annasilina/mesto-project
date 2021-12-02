// массив карточек мест для блога
const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

// находим элемент контента на странице
const content = document.querySelector('.content')

// находим элементы профиля
const profile = content.querySelector('.profile');
const userNameElement = profile.querySelector('.profile__user-name');
const userBioElement = profile.querySelector('.profile__user-bio');

// находим элемент галереи мест
const gallery = content.querySelector('.gallery');

// загрузка карточек мест в галерею
initialCards.forEach(card => {
	gallery.insertAdjacentHTML(`beforeend`, `
		<article class="gallery__item">
			<img class="gallery__photo" src=${card.link} alt=${card.name}>
			<h2 class="gallery__caption">${card.name}</h2>
			<button type="button" class="gallery__like-button button"></button>
			<button type="button" class="gallery__delete-button button"></button>
		</article>`);
});

// находим кнопки: редактирование профиля, добавление места, лайк, удаление места
const editButton = profile.querySelector('.profile__button-edit');
const addButton = profile.querySelector('.profile__button-add');
const likeButtons = gallery.querySelectorAll('.gallery__like-button');

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


// вызов обработчика события для лайка
likeButtons.forEach(button => {
	button.addEventListener('click', function () {
		button.classList.toggle('gallery__like-button_active');
	});
});
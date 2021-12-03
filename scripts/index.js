// массив карточек мест по умолчанию
const initialItems = [
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

// находим профиль и элементы имени и подписи пользователя
const profileElement = document.querySelector('.profile');
const userNameElement = profileElement.querySelector('.profile__user-name');
const userBioElement = profileElement.querySelector('.profile__user-bio');

// находим галерею мест
const galleryElement = document.querySelector('.gallery');

// рендерим карточки для галереи мест по умолчанию
initialItems.forEach(item => {
	galleryElement.insertAdjacentHTML('beforeend', `
		<article class="gallery__item">
			<img class="gallery__photo" src=${item.link} alt=${item.name}>
			<h2 class="gallery__caption">${item.name}</h2>
			<button type="button" class="gallery__like-button button"></button>
			<button type="button" class="gallery__delete-button button"></button>
		</article>`)
});

// находим элементы фото и названий мест
const itemPhotoElement = galleryElement.querySelectorAll('.gallery__photo');
const itemNameElement = galleryElement.querySelectorAll('.gallery__caption');


// находим форму редактирования профиля и поля ввода именя и подписи пользователя
const profileEditForm = document.querySelector('.popup_type_profile-edit');
const userNameInput = profileEditForm.querySelector('.popup__form-item_el_user-name');
const userBioInput = profileEditForm.querySelector('.popup__form-item_el_user-bio');

// находим форму добавления карточки места в галерею
const itemAddForm = document.querySelector('.popup_type_add-item');

// находим кнопки открытия и закрытия форм
const openProfileEditForm = profileElement.querySelector('.profile__button-edit');
const closeProfileEditForm = profileEditForm.querySelector('.popup__close-button');
const openItemAddForm = profileElement.querySelector('.profile__button-add');
const closeItemAddForm = itemAddForm.querySelector('.popup__close-button');

// находим кнопки лайков и удаления карточек
const likeItemButton = galleryElement.querySelectorAll('.gallery__like-button');
const deleteItemButton = galleryElement.querySelectorAll('.gallery__delete-button');

// функция открытия форм
function openForm(form) {
	
}
// валидация форм

// функция проверки списка инпутов на наличие инпута с ошибкой
function hasInvalidInput(inputList) {
	return inputList.some(input => {
		return !input.validity.valid;
	});
}

// функция поиска спана для ошибки в форме
function findErrorBlock(form, input) {
	return form.querySelector(`#error-${input.name}`);
}

// функция поиска всех инпутов в форме
function findInputs(form, config) {
	return Array.from(form.querySelectorAll(config.inputSelector));
}

// функция поиска кнопки сабмита в форме
function findButtonSubmit(form, config) {
	return form.querySelector(config.buttonSubmitSelector);
}

// функция показа текста ошибки для полей ввода
function showInputError(input, inputError, errorMessage, config) {
	input.classList.add(config.inputWithErrorClass);
	inputError.classList.add(config.errorMessageClass);
	inputError.textContent = errorMessage;
}

//функция зачищения текста ошибки для одного инпута
function hideInputError(input, inputError, config) {
	input.classList.remove(config.inputWithErrorClass);
	inputError.classList.remove(config.errorMessageClass);
	inputError.textContent = '';
}

// функция очистки текстов ошибок для всех инпутов в форме
function resetAllErrors(form, config) {
	const inputList = findInputs(form, config);

	inputList.forEach(input => {
		const inputError = findErrorBlock(form, input);

		hideInputError(input, inputError, config);
	});
}

// функция очистки данных в форме
function resetFormData(form, config) {
	form.reset(); //зачищаем поля формы
	resetAllErrors(form, config); //обнуляем ошибки инпутов в форме
}

//функция проверки полей ввода
function checkInput(form, input, config) {
	const inputError = findErrorBlock(form, input);

	if (!input.validity.valid) {
		showInputError(input, inputError, input.validationMessage, config);
	} else hideInputError(input, inputError, config);
}

// функция активации кнопки сохранения в форме
function enableButton(button, config) {
	button.disabled = false;
	button.classList.remove(config.buttonSubmitInactiveClass);
}

// функция деактивации кнопки сохранения в форме
function disableButton(button, config) {
	button.disabled = true;
	button.classList.add(config.buttonSubmitInactiveClass);
}

// функция установки стейта кнопок сохранения в форме в зависимости от валидности инпутов
function setButtonState(form, config) {
	const inputList = findInputs(form, config);
	const buttonSave = findButtonSubmit(form, config);

	if (hasInvalidInput(inputList)) {
		disableButton(buttonSave, config);
	} else {
		enableButton(buttonSave, config);
	}
}

// функция отрисовки стейта кнопки на время сохранения данных, введенных пользователем
function dataLoading(isLoading, form, config) {
	const buttonSave = findButtonSubmit(form, config);

	if (isLoading) {
		buttonSave.textContent = 'Сохранение...';
		buttonSave.disabled = true;
	} else {
		buttonSave.textContent = 'Сохранить';
		buttonSave.disabled = false;
	}
}

// функция проверки валидности полей ввода в формах
function setEventListeners(form, config) {
	setButtonState(form, config); // устанавливаем статус кнопки в зависимости от данных в инпуте при первом обращении
	// к форме

	findInputs(form, config).forEach(input => {
		input.addEventListener('input', function () {

			checkInput(form, input, config); // проверяем каждый инпут и если некорреткный - выводим для него ошибку
			setButtonState(form, config); // устанавливаем статус кнопки в зависимости от валидности инпутов при каждом
			// изменении в инпутах
		});
	});
}

// функция запуска валидации всех форм на странице
function enableValidation(config) {
	const formList = Array.from(document.querySelectorAll(config.formSelector));

	formList.forEach(form => {
		form.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});

		setEventListeners(form, config);
	});
}

export {setButtonState, resetFormData, enableValidation, dataLoading};
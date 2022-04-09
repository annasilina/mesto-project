export default class FormValidator {
	constructor(formConfig, formElement) {
		this._formConfig = formConfig;
		this._formElement = formElement;
		this._buttonSubmit = this._formElement.querySelector(this._formConfig.buttonSubmitSelector);
		this._inputList = Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector));
	}

	_hasInvalidInput() {
		return this._inputList.some(input => {
			return !input.validity.valid;
		});
	}

	_findErrorBlock(input) {
		return this._formElement.querySelector(`#error-${input.name}`);
	}

	_showInputError(input, inputError, errorMessage) {
		input.classList.add(this._formConfig.inputWithErrorClass);
		inputError.classList.add(this._formConfig.errorMessageActiveClass);
		inputError.textContent = errorMessage;
	}

	_hideInputError(input, inputError) {
		input.classList.remove(this._formConfig.inputWithErrorClass);
		inputError.classList.remove(this._formConfig.errorMessageActiveClass);
		inputError.textContent = '';
	}

	_resetAllErrors() {
		this._inputList.forEach(input => {
			const inputError = this._findErrorBlock(input);

			this._hideInputError(input, inputError);
		});
	}

	_checkInput(input) {
		const inputError = this._findErrorBlock(input);

		if (!input.validity.valid) {
			this._showInputError(input, inputError, input.validationMessage);
		} else this._hideInputError(input, inputError);
	}

	_enableButton() {
		this._buttonSubmit.disabled = false;
		this._buttonSubmit.classList.remove(this._formConfig.buttonSubmitInactiveClass);
	}

	_disableButton() {
		this._buttonSubmit.disabled = true;
		this._buttonSubmit.classList.add(this._formConfig.buttonSubmitInactiveClass);
	}

	setButtonState() {
		if (this._hasInvalidInput()) {
			this._disableButton();
		} else {
			this._enableButton();
		}
	}

	_setEventListeners() {
		this.setButtonState();

		this._inputList.forEach(input => {
			input.addEventListener('input', () => {
				this._checkInput(input);
				this.setButtonState();
			});
		});
	}

	enableValidation() {
		this._setEventListeners();
	}

	resetFormData() {
		this._formElement.reset();
		this._resetAllErrors();
	}
}
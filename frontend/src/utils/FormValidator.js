import {settingsValidate} from "../utils/constants";

export class FormValidator {
  constructor(id) {
    this._arg = settingsValidate;
    this._formElement = document.querySelector(`#${id}`).querySelector(this._arg.formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._arg.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._arg.submitButtonSelector);
  }

  startHideInputError() {
    this._inputList.forEach((input)=>{
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }

  _showInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(this._arg.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._arg.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(this._arg.inputErrorClass);
    errorElement.classList.remove(this._arg.errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      if (!this._buttonElement.classList.contains(this._arg.inactiveButtonClass)) {
        this._toggleButtonClassInactive();
      }
      if (!this._buttonElement.hasAttribute("disabled")) {
        this._toggleButtonAttributeDisabled();
      }
    } else {
      if (this._buttonElement.classList.contains(this._arg.inactiveButtonClass)) {
        this._toggleButtonClassInactive();
      }
      if (this._buttonElement.hasAttribute("disabled")) {
        this._toggleButtonAttributeDisabled();
      }
    }
  };

  _toggleButtonAttributeDisabled() {
    this._buttonElement.toggleAttribute("disabled");
  }

  _toggleButtonClassInactive() {
    this._buttonElement.classList.toggle(this._arg.inactiveButtonClass);
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {event.preventDefault();});
    this._setEventListeners();
  };
}

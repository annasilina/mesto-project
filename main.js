(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var n=function(){function n(e){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),t(this,"getUserInfo",(function(){return fetch("".concat(r._url,"/users/me"),{headers:r._headers}).then((function(e){return r._checkResponse(e)}))})),t(this,"getInitialCards",(function(){return fetch("".concat(r._url,"/cards"),{headers:r._headers}).then((function(e){return r._checkResponse(e)}))})),t(this,"sendUserInfo",(function(e,t){return fetch("".concat(r._url,"/users/me"),{method:"PATCH",headers:r._headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return r._checkResponse(e)}))})),t(this,"sendNewCard",(function(e,t){return fetch("".concat(r._url,"/cards"),{method:"POST",headers:r._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return r._checkResponse(e)}))})),t(this,"sendAvatar",(function(e){return fetch("".concat(r._url,"/users/me/avatar"),{method:"PATCH",headers:r._headers,body:JSON.stringify({avatar:e})}).then((function(e){return r._checkResponse(e)}))})),t(this,"removeCard",(function(e){return fetch("".concat(r._url,"/cards/").concat(e),{method:"DELETE",headers:r._headers}).then((function(e){return r._checkResponse(e)}))})),t(this,"putLikeAtCard",(function(e){return fetch("".concat(r._url,"/cards/likes/").concat(e),{method:"PUT",headers:r._headers}).then((function(e){return r._checkResponse(e)}))})),t(this,"deleteLikeAtCard",(function(e){return fetch("".concat(r._url,"/cards/likes/").concat(e),{method:"DELETE",headers:r._headers}).then((function(e){return r._checkResponse(e)}))})),this._url=e.baseURL,this._headers=e.headers}var r,o;return r=n,(o=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("ошибка: ".concat(e.status))}}])&&e(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),n}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=o((function e(t,n,r,o,a){var u=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,"_getElement",(function(){return u._cardTemplate=document.querySelector(u._templateSelector).content,u._cardElement=u._cardTemplate.querySelector(".gallery__place").cloneNode(!0),u._cardElement})),i(this,"renderLikes",(function(e){u._cardButtonLike.classList.toggle("gallery__button-like_active"),u._cardLikeCounter.textContent=e.likes.length,u._likeStatus=!u._likeStatus})),i(this,"getLikeStatus",(function(){return u._likeStatus})),i(this,"_isLiked",(function(e){return u._likes.find((function(t){return t._id===e}))})),i(this,"_setEventListeners",(function(){u._cardButtonLike.addEventListener("click",(function(){u._handleLikeToggle(u)})),u._cardImage.addEventListener("click",(function(){u._handleCardClick(u._name,u._link)})),u._cardButtonDelete.addEventListener("click",(function(){u._handleCardDelete(u,u._id)}))})),i(this,"createCard",(function(e){return u._cardElement=u._getElement(),u._cardCaption=u._cardElement.querySelector(".gallery__place-caption"),u._cardImage=u._cardElement.querySelector(".gallery__place-photo"),u._cardLikeCounter=u._cardElement.querySelector(".gallery__like-counter"),u._cardButtonLike=u._cardElement.querySelector(".gallery__button-like"),u._cardButtonDelete=u._cardElement.querySelector(".gallery__button-delete"),u._likeStatus=u._isLiked(e),u._ownerId===e&&u._cardButtonDelete.classList.add("gallery__button-delete_active"),u._likeStatus&&u._cardButtonLike.classList.add("gallery__button-like_active"),u._cardImage.src=u._link,u._cardImage.alt=u._name,u._cardCaption.textContent=u._name,u._cardLikeCounter.textContent=u._likes.length,u._setEventListeners(),u._cardElement})),i(this,"deleteCard",(function(){u._cardElement.remove()})),this._id=t._id,this._name=t.name,this._link=t.link,this._ownerId=t.owner._id,this._likes=t.likes,this._templateSelector=a,this._handleLikeToggle=n,this._handleCardClick=r,this._handleCardDelete=o}));function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=c((function e(t,n){var r=this,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,"setItem",(function(e){r._container.append(e)})),l(this,"renderItems",(function(e,t){e.forEach((function(e){return r.setItem(r._renderer(e,t))}))})),l(this,"addItem",(function(e,t){var n=r._renderer(e,t);r._container.prepend(n)})),this._container=document.querySelector(n),this._renderer=o}));function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t,this._bio=n,this._avatar=r}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{userName:this._name.textContent,userBio:this._bio.textContent,avatarLink:this._avatar.src}}},{key:"setUserInfo",value:function(e){this._name.textContent=e.name,this._bio.textContent=e.about,this._avatar.src=e.avatar}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formConfig=t,this._formElement=n,this._buttonSubmit=this._formElement.querySelector(this._formConfig.buttonSubmitSelector),this._inputList=Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector))}var t,n;return t=e,(n=[{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_findErrorBlock",value:function(e){return this._formElement.querySelector("#error-".concat(e.name))}},{key:"_showInputError",value:function(e,t,n){e.classList.add(this._formConfig.inputWithErrorClass),t.classList.add(this._formConfig.errorMessageActiveClass),t.textContent=n}},{key:"_hideInputError",value:function(e,t){e.classList.remove(this._formConfig.inputWithErrorClass),t.classList.remove(this._formConfig.errorMessageActiveClass),t.textContent=""}},{key:"_resetAllErrors",value:function(){var e=this;this._inputList.forEach((function(t){var n=e._findErrorBlock(t);e._hideInputError(t,n)}))}},{key:"resetFormData",value:function(){this._formElement.reset(),this._resetAllErrors()}},{key:"_checkInput",value:function(e){var t=this._findErrorBlock(e);e.validity.valid?this._hideInputError(e,t):this._showInputError(e,t,e.validationMessage)}},{key:"_enableButton",value:function(){this._buttonSubmit.disabled=!1,this._buttonSubmit.classList.remove(this._formConfig.buttonSubmitInactiveClass)}},{key:"_disableButton",value:function(){this._buttonSubmit.disabled=!0,this._buttonSubmit.classList.add(this._formConfig.buttonSubmitInactiveClass)}},{key:"setButtonState",value:function(){this._hasInvalidInput()?this._disableButton():this._enableButton()}},{key:"_setEventListeners",value:function(){var e=this;this.setButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInput(t),e.setButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var y=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("popup__button-close")&&e.close()}))}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=g(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},v.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function k(e,t){return k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},k(e,t)}function S(e,t){if(t&&("object"===m(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function a(e,t){var n,r=t.handleSubmitForm;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleSubmitForm=r,n._form=n._popup.querySelector(".popup__form"),n._inputList=Array.from(n._form.querySelectorAll(".popup__form-input")),n._buttonSubmit=n._form.querySelector(".popup__button-save"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputValues={},this._inputList.forEach((function(t){e._inputValues[t.name]=t.value})),this._inputValues}},{key:"open",value:function(e){v(E(a.prototype),"open",this).call(this),this._inputList.forEach((function(t){t.value=e?e[t.name]:""}))}},{key:"setEventListeners",value:function(){var e=this;v(E(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmitForm(e._getInputValues())}))}},{key:"renderLoading",value:function(e,t){e?(this._buttonSubmit.disabled=!0,this._buttonSubmit.textContent=t):(this._buttonSubmit.disabled=!1,this._buttonSubmit.textContent=t)}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(y);function L(e){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(){return O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=j(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},O.apply(this,arguments)}function j(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}function P(e,t){return P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},P(e,t)}function I(e,t){if(t&&("object"===L(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var A,R,B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&P(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return I(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._imageCaption=t._popup.querySelector(".popup__place-caption"),t._link=t._popup.querySelector(".popup__place-photo"),t}return t=a,(n=[{key:"open",value:function(e,t){O(q(a.prototype),"open",this).call(this),this._imageCaption.textContent=e,this._link.src=t,this._link.alt=e}}])&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(y),T=document.querySelector(".profile"),x=T.querySelector(".profile__user-name"),D=T.querySelector(".profile__user-bio"),U=T.querySelector(".profile__photo"),F=T.querySelector(".profile__button-edit_el_avatar"),N=T.querySelector(".profile__button-edit_el_info"),V=T.querySelector(".profile__button-add");function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector(".popup_type_avatar-change").querySelector(".popup__form"),document.querySelector(".popup_type_profile-edit").querySelector(".popup__form"),document.querySelector(".popup_type_place-add").querySelector(".popup__form");var J,W={},H=new n({baseURL:"https://nomoreparties.co/v1/plus-cohort7",headers:{authorization:"963eab40-f1b1-4bf3-8893-fd8fa8464a41","Content-Type":"application/json"}}),z=new p(x,D,U),$=new s({renderer:function(e,t){return new a(e,Z,ee,te,"#place-template").createCard(t)}},".gallery"),G=new w(".popup_type_place-add",{handleSubmitForm:function(e){G.renderLoading(!0,"Сохранение..."),H.sendNewCard(e.placeName,e.placeLink).then((function(e){var t=e.owner._id;$.addItem(e,t),G.close()})).catch((function(e){return console.log(e)})).finally((function(){return G.renderLoading(!1,"Создать")}))}}),K=new w(".popup_type_profile-edit",{handleSubmitForm:function(e){K.renderLoading(!0,"Cохранение..."),H.sendUserInfo(e.userName,e.userBio).then((function(e){z.setUserInfo(e),K.close()})).catch((function(e){return console.log(e)})).finally((function(){return K.renderLoading(!1,"Сохранить")}))}}),Q=new w(".popup_type_avatar-change",{handleSubmitForm:function(e){Q.renderLoading(!0,"Cохранение..."),H.sendAvatar(e.avatarLink).then((function(e){z.setUserInfo(e),Q.close()})).catch((function(e){return console.log(e)})).finally((function(){return Q.renderLoading(!1,"Сохранить")}))}}),X=new w(".popup_type_card-delete",{handleSubmitForm:function(){X.renderLoading(!0,"Удаление..."),H.removeCard(R).then((function(){A.deleteCard(),X.close()})).catch((function(e){return console.log(e)})).finally((function(){return X.renderLoading(!1,"Да")}))}}),Y=new B(".popup_type_place-show");G.setEventListeners(),K.setEventListeners(),Q.setEventListeners(),Y.setEventListeners(),X.setEventListeners(),J={formSelector:".popup__form",inputSelector:".popup__form-input",buttonSubmitSelector:".popup__button-save",buttonSubmitInactiveClass:"popup__button-save_disabled",inputWithErrorClass:"popup__form-input_type_error",errorMessageActiveClass:"popup__error-message_active"},Array.from(document.querySelectorAll(J.formSelector)).forEach((function(e){var t=new _(J,e),n=e.getAttribute("name");W[n]=t,t.enableValidation()})),V.addEventListener("click",(function(){W.formPlaceAdd.resetFormData(),W.formPlaceAdd.setButtonState(),G.open()})),N.addEventListener("click",(function(){W.formProfileEdit.resetFormData(),K.open(z.getUserInfo()),W.formProfileEdit.setButtonState()})),F.addEventListener("click",(function(){W.formAvatarChange.resetFormData(),W.formAvatarChange.setButtonState(),Q.open()})),Promise.all([H.getUserInfo(),H.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1],a=o._id;z.setUserInfo(o),$.renderItems(i,a)})).catch((function(e){return console.log(e)}));var Z=function(e){e.getLikeStatus()?H.deleteLikeAtCard(e._id).then((function(t){e.renderLikes(t)})).catch((function(e){return console.log(e)})):H.putLikeAtCard(e._id).then((function(t){e.renderLikes(t)})).catch((function(e){return console.log(e)}))},ee=function(e,t){Y.open(e,t)},te=function(e,t){X.open(),A=e,R=t}})();
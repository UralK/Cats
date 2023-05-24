import Popup from "../components/Popup.js";

class PopupWithImage extends Popup{
    constructor(selectorPopup) {
    super(selectorPopup);
        this._popupImage = this._popupElement.querySelector(".popup__image");
        this._popupTitle = this._popupElement.querySelector(".popup__title");
        this._popupAge = this._popupElement.querySelector(".popup__age");
        this._popupView = this._popupElement.querySelector(".popup__view");
    }

    open(data) {
        super.open();
        this._popupImage.src = data.image;
        this._popupTitle.textContent = data.name;
        this._popupAge.textContent = data.age;
        this._popupView.textContent = data.description;
        this._popupImage.alt = this._popupTitle.textContent;
    }


}
  
export default PopupWithImage;
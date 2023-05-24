class Card {
    constructor(data, selectorTemplate, authorData, handleClickCatInfo, {handledeleteCard} ) {
        this._data = data;
        this._selectorTemplate = selectorTemplate;
        this._cardId = authorData.cardId;
        this._handledeleteCard = handledeleteCard;
        this._handleClickCatInfo = handleClickCatInfo;
        this._isLiked = this._isLiked.bind(this);
        this._handleButtonDelete = this._handleButtonDelete.bind(this);
        this._handleButtonLike = this._handleButtonLike.bind(this);
        console.log(this._cardId);
    }


_getTemplate() {
    return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
  }


createCard() {
    this._card = this._getTemplate();
    this._titleCard = this._card.querySelector('.element__title');
    this._ImageCard = this._card.querySelector('.element__photo');
    this._buttonDeleteImageCard = this._card.querySelector('.element__trash');
    this._buttonLikeImageCard = this._card.querySelector('.element__like');
    this._buttonShowInform = this._card.querySelector('.element__view');
    this._titleCard.textContent = this._data.name;
    this._ImageCard.alt = this._data.name;
    this._ImageCard.src = this._data.image;
    this._isLiked();
    if(!this._data.favorite) {
        this._buttonLikeImageCard.remove()
    }

    this._buttonDeleteImageCard.addEventListener('click', () => {this._handledeleteCard(this._cardId)});

    this._buttonShowInform.addEventListener('click', () => {this._handleClickCatInfo(this._data)});
    this._setEventListeners();
    return this._card;   
}

_isLiked() {
    if(this._data.favorite) {
        this._buttonLikeImageCard.classList.toggle("element__like_active");
    }
}

_handleButtonDelete() {
    this._card.remove();
}

_handleButtonLike(evt) {
    evt.target.classList.toggle("element__like_active");
}

_setEventListeners() {
    this._buttonDeleteImageCard.addEventListener('click', this._handleButtonDelete);
    this._buttonLikeImageCard.addEventListener('click', this._handleButtonLike);
  }
}

export default Card;
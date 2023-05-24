import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/Popup-inform.js";
import {api} from "../components/Api.js";
// import "../components/utils.js";


const cardsContainer = document.querySelector('.elements');
const addButton = document.querySelector('.header__add-button');
const btnOpenPopupLogin = document.querySelector("#login");
const formCatAdd = document.querySelector('#popup-form-add');
const formLogin = document.querySelector("#popup-form-login");
const isAuth = Cookies.get("email");
// const MAX_LIVE_STORAGE = 10;

const popupAdd = new Popup('.popup-add');
popupAdd.setEventListeners();

const popupLogin = new Popup('.popup-login');
popupLogin.setEventListeners();

const popupInform = new PopupWithImage('.popup-cat-inform');
popupInform.setEventListeners();

function handleClickCatInfo (data) {
  popupInform.open(data);
}

function serializeForm(elements) {
    const formData = {};   
    elements.forEach( input => {
      if (input.type === 'submit' || input.type === 'button') return
      if (input.type === 'checkbox') {
        formData[input.name] = input.checked;
      }
      if (input.type !== 'checkbox') {
        formData[input.name] = input.value;
      }
    })
    return formData;
}

function handleFormAddCat(e) {
  e.preventDefault();
  const elementsFormCat = [...formCatAdd.elements];
  const formData = serializeForm(elementsFormCat);
  api.addNewCat(formData)
    .then(function() {
      const newElement = createCard(formData);
      cardsContainer.prepend(newElement);
      updateLocalStorage(formData, {type: 'ADD_CAT'});
      popupAdd.close();
    })
    .catch(function(err) {
      console.log(err);
    }) 
}

function handleFormLogin(e){
  e.preventDefault();
  const elementsFormLogin = [...formLogin.elements];
  const formData = serializeForm(elementsFormLogin);
  console.log(formData);
  Cookies.set("email", formData.email, {expires: 7});
  addButton.classList.remove('visually-hidden');
  btnOpenPopupLogin.classList.add('visually-hidden');
  popupLogin.close()
}

function createCard(item) {
    const cardElement = new Card(item,'#card-template', {cardId: item.id}, handleClickCatInfo, 
    {handledeleteCard: (cardId) => {api.deleteCatById(cardId)
      .then(() => {
        
      })
      .catch((err) => {console.log(err)})
    }},
    );
    return cardElement.createCard();
}

function setDataRefresh(minute, key){
  const setTime = new Date(new Date().getTime() + minute*60000)
  localStorage.setItem(key, setTime);
  return setTime;
}

function checkLocalStorage() {
  const localData = JSON.parse(localStorage.getItem('cats')); 
  const getTimeExpires = localStorage.getItem('catsRefresh');
  if(localData && localData.length && new Date() < new Date(getTimeExpires)){
    localData.forEach((item) => {
      createCard(item);
  });
  } else {
    api.getAllCats() 
      .then(data => {
        data.forEach((item) => {
          const card = createCard(item);
          cardsContainer.prepend(card);
        });
        updateLocalStorage(data, {type: 'ADD_CAT'});
      })
  .catch(function(err) {
    console.log(err);
  })
  }
}

function updateLocalStorage(data, action) { 
  const oldStorage = JSON.parse(localStorage.getItem('cats'));

  switch (action.type) {
    case 'ADD_CAT':
      oldStorage.push(data);
      localStorage.setItem('cats', JSON.stringify(oldStorage));
      return;
    case 'ALL_CATS':
      setDataRefresh(MAX_LIVE_STORAGE, 'catsRefresh');
      localStorage.setItem('cats',  JSON.stringify(data));
      return;
    case 'DELETE_CAT':
      const newStorage = oldStorage.filter(cat => cat.id !== data.id) 
      localStorage.setItem('cats',  JSON.stringify(newStorage));
      return;
    case 'EDIT_CAT':
      const updateStorage = oldStorage.map(cat => cat.id !== data.id ? cat : data) 
      localStorage.setItem('cats',  JSON.stringify(updateStorage));
      return;
    default:
      break;
  }
}

  console.log(isAuth);
if (!isAuth) {
  popupLogin.open();
  addButton.classList.add('visually-hidden');
} else {
  btnOpenPopupLogin.classList.add('visually-hidden');
}

formCatAdd.addEventListener('submit', handleFormAddCat);
formLogin.addEventListener('submit', handleFormLogin);

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  popupAdd.open();
});

btnOpenPopupLogin.addEventListener("click", (e) => {
  e.preventDefault();
  popupLogin.open();
});


console.log(Cookies.get('email'));
console.log(localStorage);
checkLocalStorage();
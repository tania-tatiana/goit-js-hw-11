import axios from 'axios';
import { fetchPixabay } from './js/pixabay-api';
// const input = document.querySelector('.form-input');
// const button = document.querySelector('.form-button');
const pixabayRefs = {
  form: document.getElementById('search-form'),
  searchQueryInput: document.getElementById('search-query'),
  imagesContainer: document.getElementById('images-container'),
  button: document.querySelector('.form-button'),
};

pixabayRefs.button.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = pixabayRefs.searchQueryInput.value.trim();
  if (!searchQuery) {
    iziToast.error({
      messageColor: '#FAFAFB',
      icon: './img/bi_x-octagon.svg',
      message:
        'Sorry, there are no images matching your search query. Please, try again!',
      position: 'topRight',
      backgroundColor: '#ffbebe',
      color: '#fafafb',
    });
    return;
  }
  fetchPixabay(searchQuery);
});

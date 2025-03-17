import axios from 'axios';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { fetchPixabay } from './js/pixabay-api';

import { clearGallery } from './js/pixabay-api';

const pixabayRefs = {
  form: document.querySelector('.form'),
  searchQueryInput: document.querySelector('.form-input'),
  imagesContainer: document.querySelector('.gallery'),
  button: document.querySelector('.form-button'),
};

pixabayRefs.form.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = pixabayRefs.searchQueryInput.value.trim();
  if (!searchQuery) {
    iziToast.error({
      messageColor: '#FAFAFB',
      iconUrl: './img/bi_x-octagon.svg',
      iconColor: 'white',
      message:
        'Sorry, there are no images matching your search query. Please, try again!',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
    return;
  }
  clearGallery();
  fetchPixabay(searchQuery);
});

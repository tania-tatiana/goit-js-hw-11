import axios from 'axios';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { initializeLightbox } from './render-functions';

const API_KEY = (axios.defaults.API_KEY = '49359478-baf2a77463771851b04b26e30');
const BASE_URL = (axios.defaults.baseURL = 'https://pixabay.com/api/');

export function fetchPixabay(searchQuery) {
  const loader = document.querySelector('.loader');
  loader.style.display = 'inline-block';

  axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    })
    .then(response => {
      if (response.data.hits.length === 0) {
        // Якщо зображень немає, генеруємо помилку
        throw new Error('No images found for this query');
      }
      return response.data; // Якщо є зображення, продовжуємо
    })
    .then(pixabay => populateGallery(pixabay.hits))
    .catch(error => {
      iziToast.error({
        messageColor: '#FAFAFB',
        iconUrl: '../img/bi_x-octagon.svg',
        iconColor: 'white',
        message:
          'Sorry, there are no images matching</br> your search query. Please, try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#fafafb',
      });
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}
function populateGallery(pixabays = []) {
  const imagesContainer = document.querySelector('.gallery');

  imagesContainer.innerHTML = '';
  pixabays.forEach(image => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const card = document.createElement('div');
    card.classList.add('card');

    const linkElement = document.createElement('a');
    linkElement.href = image.largeImageURL;

    const imgElement = document.createElement('img');
    imgElement.classList.add('card-image');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const likes = document.createElement('div');
    likes.classList.add('card-item');
    likes.innerHTML = `<h4>Likes</h4><p>${image.likes}</p>`;

    const views = document.createElement('div');
    views.classList.add('card-item');
    views.innerHTML = `<h4>Views</h4><p>${image.views}</p>`;

    const comments = document.createElement('div');
    comments.classList.add('card-item');
    comments.innerHTML = `<h4>Comments</h4><p>${image.comments}</p>`;

    const downloads = document.createElement('div');
    downloads.classList.add('card-item');
    downloads.innerHTML = `<h4>Downloads</h4><p>${image.downloads}</p>`;

    // Додаємо елементи в картку
    linkElement.appendChild(imgElement);
    card.appendChild(linkElement);
    cardBody.appendChild(likes);
    cardBody.appendChild(views);
    cardBody.appendChild(comments);
    cardBody.appendChild(downloads);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

    // Додаємо картку в контейнер
    imagesContainer.appendChild(cardContainer);
  });
  initializeLightbox();
}

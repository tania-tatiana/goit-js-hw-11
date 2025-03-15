import axios from 'axios';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// import { pixabayRefs } from '../main';

const API_KEY = (axios.defaults.API_KEY = '49359478-baf2a77463771851b04b26e30');
const BASE_URL = (axios.defaults.baseURL =
  'https://pixabay.com/api/?key=49359478-baf2a77463771851b04b26e30&q=yellow+flowers&image_type=photo&pretty=true');

export function fetchPixabay(searchQuery) {
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
    .then(response => response.data)
    .then(pixabay => populateGallery(pixabay.hits))
    .catch(error => {
      iziToast.error({
        messageColor: '#FAFAFB',
        icon: './img/bi_x-octagon.svg',
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
        position: 'topRight',
        backgroundColor: '#ffbebe',
        color: '#fafafb',
      });
    });
}
function populateGallery(pixabays = []) {
  const imagesContainer = document.getElementById('images-container');

  pixabayRefs.list.innerHTML = '';
  pixabays.forEach(image => {
    const imgElement = document.createElement('img');
    console.log(image);
  });
}

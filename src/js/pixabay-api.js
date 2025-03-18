import axios from 'axios';

const API_KEY = '49359478-baf2a77463771851b04b26e30';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchPixabay(searchQuery) {
  const loader = document.querySelector('.loader');
  loader.style.display = 'inline-block';

  return axios
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
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    })
    .finally(() => {
      document.querySelector('.loader').style.display = 'none';
    });
}

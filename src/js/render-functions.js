// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

export function initializeLightbox() {
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

export function populateGallery(pixabays = []) {
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
export function clearGallery() {
  const imagesContainer = document.querySelector('.gallery');
  imagesContainer.innerHTML = '';
}

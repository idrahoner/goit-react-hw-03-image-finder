import axios from 'axios';

export async function fetchImages({ query, page = 1 } = {}) {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '30965051-be301043694ab243532f6a4d6',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 12,
    },
  });

  return data;
}

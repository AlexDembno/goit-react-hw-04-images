import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/`;

const response = (search, page) =>
  axios.get('/', {
    params: {
      key: '31934328-4f49ab69ab8cdfa2acbd8f5df',
      q: search,
      page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });

export default response;

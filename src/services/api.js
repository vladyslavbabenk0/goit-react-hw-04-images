import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '37761456-12bba2161ec0a2b01ebab9c6f',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const fetchPicturesQuery = async (search, page) => {
  const { data } = await instance.get('/', {
    params: {
      q: search,
      page: page,
    },
  });
  return data;
};

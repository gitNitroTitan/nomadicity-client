import axios from 'axios';

const cloudDataUrl = 'https://api.cloudinary.com/v1_1/dthdp7zpl/image/upload';

const uploadPics = (payload) => new Promise((resolve, reject) => {
  axios.post(`${cloudDataUrl}`, payload)
    .then((response) => resolve(response.data.url))
    .catch(reject);
});

export default uploadPics;

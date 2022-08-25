import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserByHandle = (handle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${handle}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getUserByHandle;

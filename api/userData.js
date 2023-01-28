// import axios from 'axios';
import { clientCredentials } from '../utils/client';

const getUserByUid = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getUserByUid;

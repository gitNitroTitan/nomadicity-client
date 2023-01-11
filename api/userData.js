// import axios from 'axios';
// import { clientCredentials } from '../utils/client';

// const dbUrl = clientCredentials.databaseURL;

// const getUserByUid = (uid) => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/users/${uid}.json`)
//     .then((response) => resolve(response.data))
//     .catch((error) => reject(error));
// });

// export default getUserByUid;

const getUserById = (id) => fetch(`http://localhost:8088/users/${id}`)
  .then((res) => res.json());

export default getUserById;

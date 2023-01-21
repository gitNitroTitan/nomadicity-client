// import axios from 'axios';
// import { clientCredentials } from '../utils/client';

const getUserByUid = (id) => new Promise((resolve, reject) => {
  fetch(`$http://localhost:8088/users/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getUserByUid;

// const getUserById = (id) => fetch(`http://localhost:8088/users/${id}`)
//   .then((res) => res.json());

// export default getUserById;

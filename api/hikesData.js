/* eslint-disable no-unused-vars */
import axios from 'axios';
import { clientCredentials } from '../utils/client';
import getUserByHandle from './userData';
// import getBoardsThatContainGivenHike from './mergedData';

const dbUrl = clientCredentials.databaseURL;

const getAllHikes = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/hikes.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getSingleHike = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/hikes/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateHike = (hikeObjs) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/hikes/${hikeObjs.firebaseKey}.json`, hikeObjs)
    .then(() => getAllHikes(hikeObjs.uid).then(resolve))
    .catch((error) => reject(error));
});

const createHike = (hikeObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/hikes.json`, hikeObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/hikes/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

// const getSingleHikeDetails = (hikeFirebaseKey) => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/hikes/${hikeFirebaseKey}.json`)
//     .then((originalHikeObject) => {
//       getBoardsThatContainGivenHike(hikeFirebaseKey).then((arrayOfBoardObjects) => {
//         getUserByHandle(originalHikeObject.data.user).then((userObj) => {
//           const newHikeObject = originalHikeObject.data;
//           newHikeObject.user = userObj;
//           newHikeObject.boards = arrayOfBoardObjects;
//           resolve(newHikeObject);
//         });
//       });
//     })
//     .catch((error) => reject(error));
// });

const deleteHike = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/hikes/${firebaseKey}.json`, uid)
    .then(() => {
      getAllHikes(uid).then((hikesArray) => resolve(hikesArray));
    })
    .catch((error) => reject(error));
});

export {
  getAllHikes, updateHike, getSingleHike, deleteHike, createHike,
};

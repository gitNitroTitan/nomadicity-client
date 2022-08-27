import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteBoard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/boards/${firebaseKey}.json`)
    .then(() => {
      getBoards().then((boardsArray) => resolve(boardsArray));
    })
    .catch((error) => reject(error));
});

const getSingleBoard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createBoard = (boardObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/boards.json`, boardObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/boards/${response.data.name}.json`, payload)
        .then(() => {
          getBoards().then(resolve);
        });
    }).catch(reject);
});

const updateBoard = (boardDetails) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/boards/${boardDetails.firebaseKey}.json`, boardDetails)
    .then(() => getBoards(boardDetails.uid).then(resolve))
    .catch((error) => reject(error));
});

const getBoardHikes = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/hikes.json?orderBy= "boardId" &equalTo="${boardId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getBoards, deleteBoard, createBoard, updateBoard, getSingleBoard, getBoardHikes,
};

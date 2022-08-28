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

const deleteSingleBoard = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/boards/${firebaseKey}.json`, uid)
    .then(() => {
      getBoards(uid).then((boardsArray) => resolve(boardsArray));
    })
    .catch((error) => reject(error));
});

const getBoardHikes = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/hikes.json?orderBy= "board_id" &equalTo="${boardId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getMultipleBoardDetails = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards.json?orderBy="user"&equalTo="${uid}"`)
    .then((arrayOfBoards) => {
      const boardPromises = (Object.values(arrayOfBoards.data)).map((board) => getSingleBoard(board.firebaseKey));
      Promise.all(boardPromises).then(resolve).catch(reject);
    })
    .catch((error) => reject(error));
});

export {
  getBoards, createBoard, updateBoard, getSingleBoard, getBoardHikes, getMultipleBoardDetails, deleteSingleBoard,
};

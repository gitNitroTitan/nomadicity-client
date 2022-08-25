import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { deleteHike } from './hikesData';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getBoardByFirebaseKey = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards/${boardFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getBoardsThatContainHike = (hikeFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/merged.json?orderBy="$value"&equalTo="${hikeFirebaseKey}"`)
    .then((response) => {
      const getBoardsFromKeys = Object.keys(response.data).map((string) => string.split('==')[0]).map((firebaseKey) => getBoardByFirebaseKey(firebaseKey));
      Promise.all(getBoardsFromKeys).then(resolve).catch(reject);
    })
    .catch((error) => reject(error));
});

const deleteHikefromBoard = (hikeFirebaseKey) => new Promise((resolve, reject) => {
  getBoardsThatContainHike(hikeFirebaseKey).then((response) => {
    const deleteThisHikeFromBoard = response.map((board) => deleteThisHikeFromBoard(hikeFirebaseKey, board.firebaseKey));
    Promise.all(deleteThisHikeFromBoard).then(() => {
      deleteHike(hikeFirebaseKey).then(resolve);
    }).catch(reject);
  });
});

export { getBoardsThatContainHike, getBoardByFirebaseKey, deleteHikefromBoard };

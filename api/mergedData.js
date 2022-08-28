import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { deleteHike, getSingleHike } from './hikesData';
import { getBoardHikes, getSingleBoard, deleteSingleBoard } from './boardsData';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const viewHikeDetails = (boardFirebaseKey) => new Promise((resolve, reject) => {
  getSingleHike(boardFirebaseKey)
    .then((hikeObj) => {
      getSingleBoard(hikeObj.boardId).then((boardObject) => {
        resolve({ boardObject, ...hikeObj });
      });
    })
    .catch((error) => reject(error));
});

const viewBoardDetails = (boardFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleBoard(boardFirebaseKey), getBoardHikes(boardFirebaseKey)])
    .then(([boardObject, boardHikesArray]) => {
      resolve({ ...boardObject, players: boardHikesArray });
    }).catch((error) => reject(error));
});

const getBoardByFirebaseKey = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards/${boardFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteBoardsHikes = (boardId) => new Promise((resolve, reject) => {
  getBoardHikes(boardId)
    .then((hikesArray) => {
      const deleteHikesPromises = hikesArray.map((hike) => deleteHike(hike.firebaseKey));
      Promise.all(deleteHikesPromises).then(() => {
        deleteSingleBoard(boardId).then(resolve);
      });
    })
    .catch((error) => reject(error));
});

export {
  getBoardByFirebaseKey, deleteBoardsHikes, viewBoardDetails, viewHikeDetails,
};

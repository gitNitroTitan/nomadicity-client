// eslint-disable-next-line import/no-cycle
import { deleteHike, getSingleHike } from './hikesData';
import { getSingleBoard, deleteSingleBoard } from './boardsData';
import { clientCredentials } from '../utils/client';

const viewHikeDetails = (boardId) => new Promise((resolve, reject) => {
  getSingleHike(boardId)
    .then((hikeObj) => {
      getSingleBoard(hikeObj.boardId).then((boardObject) => {
        resolve({ boardObject, ...hikeObj });
      });
    })
    .catch((error) => reject(error));
});

const getBoardHikes = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/hikes?boards=${id}"`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const viewBoardDetails = (boardId) => new Promise((resolve, reject) => {
  Promise.all([getSingleBoard(boardId), getBoardHikes(boardId)])
    .then(([boardObject, boardHikesArray]) => {
      resolve({ ...boardObject, hikes: boardHikesArray });
    }).catch((error) => reject(error));
});

const getBoardById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/boards/${id}`)
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
    }).catch((error) => reject(error));
});

export {
  getBoardById, deleteBoardsHikes, viewBoardDetails, viewHikeDetails, getBoardHikes,
};

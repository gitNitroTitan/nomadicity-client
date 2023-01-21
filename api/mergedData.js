// eslint-disable-next-line import/no-cycle
import { getSingleHike } from './hikesData';
import { getSingleBoard } from './boardsData';
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

const getBoardById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/boards/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getBoardById, viewHikeDetails,
};

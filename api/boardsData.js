import { clientCredentials } from '../utils/client';
import { deleteHike } from './hikesData';

const getBoards = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/boards`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleBoard = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/boards/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        title: data.title,
        image_url: data.image_url,
        description: data.description,
      });
    })
    .catch((error) => reject(error));
});

const createBoard = (user, board) => new Promise((resolve, reject) => {
  const boardObj = {
    user,
    title: board.title,
    image_url: board.image_url,
    description: board.description,
  };
  fetch(`${clientCredentials.databaseURL}/boards`, {
    method: 'POST',
    body: JSON.stringify(boardObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateBoard = (board) => new Promise((resolve, reject) => {
  const boardObj = {
    // hike: Number(board.hikeId),
    title: board.title,
    image_url: board.image_url,
    description: board.description,
  };
  fetch(`${clientCredentials.databaseURL}/boards/${board.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(boardObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteSingleBoard = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/boards/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const getBoardHikes = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/hikes?board=${id}`)
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

const deleteBoardsHikes = (boardId) => new Promise((resolve, reject) => {
  getBoardHikes(boardId)
    .then((hikesArray) => {
      const deleteHikesPromises = hikesArray.map((hike) => deleteHike(hike.id));
      Promise.all(deleteHikesPromises).then(() => {
        deleteSingleBoard(boardId).then(resolve);
      });
    }).catch((error) => reject(error));
});

export {
  getBoards, createBoard, updateBoard, getSingleBoard, deleteSingleBoard, viewBoardDetails, getBoardHikes, deleteBoardsHikes,
};

import { clientCredentials } from '../utils/client';

const getBoards = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/boards`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/boards/${boardId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user: data.user,
        category: data.category,
        title: data.title,
        date: data.date,
        imageUrl: data.image_url,
        content: data.content,
      });
    })
    .catch((error) => reject(error));
});

const createBoard = (board) => new Promise((resolve, reject) => {
  const boardObj = {
    user: board.user,
    // hike: Number(board.hikeId),
    title: board.title,
    publication_date: board.publicationDate,
    image_url: board.imageUrl,
    content: board.content,
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

const updateBoard = (board, id) => new Promise((resolve, reject) => {
  const boardObj = {
    user: board.user,
    hike: Number(board.hikeId),
    title: board.title,
    date: board.date,
    image_url: board.imageUrl,
    content: board.content,
  };
  fetch(`${clientCredentials.databaseURL}/boards/${id}`, {
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

// const getBoardHikes = (boardId) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/hikes.json?orderBy= "board_id" &equalTo="${boardId}"`)
//     .then((response) => resolve(Object.values(response.data)))
//     .catch((error) => reject(error));
// });

export {
  getBoards, createBoard, updateBoard, getSingleBoard, deleteSingleBoard,
};

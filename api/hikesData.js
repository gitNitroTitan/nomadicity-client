/* eslint-disable no-unused-vars */
import { clientCredentials } from '../utils/client';

const getAllHikes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/hikes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleHike = (hikeId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/hikes/${hikeId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user: data.user,
        title: data.title,
        date: data.date,
        description: data.description,
      });
    })
    .catch((error) => reject(error));
});

const updateHike = (hike, id) => new Promise((resolve, reject) => {
  const hikeObj = {
    user: hike.user,
    // category: Number(hike.categoryId),
    title: hike.title,
    date: hike.date,
    latitude: hike.latitude,
    longitude: hike.longitude,
    description: hike.description,
  };
  fetch(`${clientCredentials.databaseURL}/hikes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hikeObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createHike = (hike) => new Promise((resolve, reject) => {
  const hikeObj = {
    user: hike.user,
    board: Number(hike.boardId),
    title: hike.title,
    latitude: hike.latitude,
    longitude: hike.longitude,
    date: hike.date,
    image_url: hike.image_url,
    description: hike.description,
  };
  fetch(`${clientCredentials.databaseURL}/hikes`, {
    method: 'POST',
    body: JSON.stringify(hikeObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getHikes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/hikes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteHike = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/hikes/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteSingleHike = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/hikes/${id}`, uid)
    .then(() => {
      getAllHikes(uid).then((hikesArray) => resolve(hikesArray));
    })
    .catch((error) => reject(error));
});

export {
  getHikes, getAllHikes, updateHike, getSingleHike, deleteHike, createHike, deleteSingleHike,
};

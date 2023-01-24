/* eslint-disable no-unused-vars */
import { clientCredentials } from '../utils/client';

const getAllHikes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/hikes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleHike = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/hikes/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        board: data.board,
        user: data.user,
        name: data.name,
        url: data.url,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        description: data.description,
      });
    })
    .catch((error) => reject(error));
});

const updateHike = (hike, id) => new Promise((resolve, reject) => {
  const hikeObj = {
    board: Number(hike.boardId),
    name: hike.name,
    url: hike.url,
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

const createHike = (user, hike, latitude, longitude, url) => new Promise((resolve, reject) => {
  const hikeObj = {
    user,
    board: Number(hike.boardId),
    name: hike.name,
    url,
    latitude,
    longitude,
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

export {
  getHikes, getAllHikes, updateHike, getSingleHike, deleteHike, createHike,
};

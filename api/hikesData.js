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
        category: Number(data.categoryId),
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
    // category: Number(hike.categoryId),
    title: hike.title,
    date: hike.date,
    image_url: hike.imageUrl,
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

const getHikes = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/hikes.json?orderBy="uid"&equalTo="${id}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
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

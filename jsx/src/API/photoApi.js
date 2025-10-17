import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3001';

export const getPhotosByAlbumId = async (albumId) => {
    const response = await axios.get(`${BASE_URL}/photos?albumId=${albumId}`);
    return response.data;
};

export const createPhoto = async (photo) => {
    const response = await axios.post(`${BASE_URL}/photos`, photo);
    return response.data;
};

export const updatePhoto = async (id, photo) => {
    const response = await axios.put(`${BASE_URL}/photos/${id}`, photo);
    return response.data;
};

export const deletePhoto = async (id) => {
    await axios.delete(`${BASE_URL}/photos/${id}`);
    return id;
};

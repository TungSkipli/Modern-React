import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3001';

export const getAlbumsByUserId = async (userId) => {
    const response = await axios.get(`${BASE_URL}/albums?userId=${userId}`);
    return response.data;
};

export const createAlbum = async (album) => {
    const response = await axios.post(`${BASE_URL}/albums`, album);
    return response.data;
};

export const updateAlbum = async (id, album) => {
    const response = await axios.put(`${BASE_URL}/albums/${id}`, album);
    return response.data;
};

export const deleteAlbum = async (id) => {
    await axios.delete(`${BASE_URL}/albums/${id}`);
    return id;
};

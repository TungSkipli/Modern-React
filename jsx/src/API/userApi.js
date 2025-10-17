import axios from 'axios';

export const getUsers = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await axios.get(`http://127.0.0.1:3001/users`);
    return response.data;
};

export const createUser = async (user) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await axios.post(`http://127.0.0.1:3001/users`, user);
    return response.data;
};

export const updateUser = async (id, user) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await axios.put(`http://127.0.0.1:3001/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await axios.delete(`http://127.0.0.1:3001/users/${id}`);
    return id;
};

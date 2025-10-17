import { createContext, useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../API/userApi';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (user) => {
        try {
            setLoading(true);
            setError(null);
            const newUser = await createUser(user);
            setUsers([...users, newUser]);
            return newUser;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const editUser = async (id, updatedUser) => {
        try {
            setLoading(true);
            setError(null);
            const user = await updateUser(id, updatedUser);
            setUsers(users.map(u => u.id === id ? user : u));
            return user;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeUser = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const value = {
        users,
        loading,
        error,
        fetchUsers,
        addUser,
        editUser,
        removeUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

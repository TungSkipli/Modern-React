import { useState } from 'react';
import UserForm from '../components/user/UserForm';
import UserList from '../components/user/UserList';
import Modal from '../components/user/Modal';

const UserPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleAddUser = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    return (
        <div className=" mx-auto px-4 py-8 max-w-6xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-semibold text-gray-900">User Management</h1>
                <button
                    onClick={handleAddUser}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
                >
                    Add User
                </button>
            </div>
            
            <UserList onEdit={handleEdit} />

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                title={editingUser ? 'Edit User' : 'Add User'}
            >
                <UserForm 
                    userToEdit={editingUser} 
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default UserPage;

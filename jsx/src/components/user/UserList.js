import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import Modal from './Modal';
import UserListSkeleton from './UserListSkeleton';
import AlbumManager from './AlbumManager';

const UserList = ({ onEdit }) => {
    const { users, loading, error, removeUser } = useUsers();
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null, userName: '' });
    const [expandedUserId, setExpandedUserId] = useState(null);

    const handleDeleteClick = (user) => {
        setDeleteModal({ isOpen: true, userId: user.id, userName: user.name });
    };

    const toggleAlbums = (userId) => {
        setExpandedUserId(expandedUserId === userId ? null : userId);
    };

    const handleConfirmDelete = async () => {
        try {
            await removeUser(deleteModal.userId);
            setDeleteModal({ isOpen: false, userId: null, userName: '' });
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    const handleCancelDelete = () => {
        setDeleteModal({ isOpen: false, userId: null, userName: '' });
    };

    if (loading) {
        return <UserListSkeleton  />;
    }

    if (error) {
        return <div className="text-center text-gray-600 py-8 border border-gray-300 rounded">Error: {error}</div>;
    }

    if (users.length === 0) {
        return <div className="text-center text-gray-500 py-8 border border-gray-300 rounded">No users found</div>;
    }

    return (
        <>
            <div className="bg-white border border-gray-300 rounded overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-300">
                        <tr>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase w-12"></th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">ID</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Name</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Email</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Phone</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <React.Fragment key={user.id}>
                                <tr className="hover:bg-gray-50 transition border-b border-gray-200">
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => toggleAlbums(user.id)}
                                            className="text-gray-600 hover:text-gray-900 transition"
                                        >
                                            <svg 
                                                className={`w-4 h-4 transition-transform ${expandedUserId === user.id ? 'rotate-90' : ''}`}
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{user.id}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{user.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{user.phone}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <div className="text-center space-x-2">
                                            <button 
                                                className="text-gray-700 hover:text-gray-900 underline transition"
                                                onClick={() => onEdit(user)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="text-gray-700 hover:text-gray-900 underline transition"
                                                onClick={() => handleDeleteClick(user)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedUserId === user.id && (
                                    <tr>
                                        <td colSpan="6" className="p-0">
                                            <AlbumManager userId={user.id} userName={user.name} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal 
                isOpen={deleteModal.isOpen} 
                onClose={handleCancelDelete}
                title="Delete User"
            >
                <div className="space-y-4">
                    <p className="text-gray-700">
                        Are you sure you want to delete user <strong>{deleteModal.userName}</strong>?
                    </p>
                    <div className="flex gap-2 pt-2">
                        <button 
                            onClick={handleConfirmDelete}
                            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded transition"
                        >
                            Delete
                        </button>
                        <button 
                            onClick={handleCancelDelete}
                            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default UserList;

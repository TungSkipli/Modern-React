import { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import Modal from './Modal';
import UserListSkeleton from './UserListSkeleton';

const UserList = ({ onEdit }) => {
    const { users, loading, error, removeUser } = useUsers();
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null, userName: '' });

    const handleDeleteClick = (user) => {
        setDeleteModal({ isOpen: true, userId: user.id, userName: user.name });
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
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">ID</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Name</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Email</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Phone</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3 text-sm text-gray-700">{user.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{user.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{user.phone}</td>
                                <td className="px-4 py-3 text-sm">
                                    <div className="text-center">
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

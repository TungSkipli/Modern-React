import { useState, useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';

const UserForm = ({ userToEdit, onCancel }) => {
    const { addUser, editUser } = useUsers();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                name: userToEdit.name || '',
                email: userToEdit.email || '',
                phone: userToEdit.phone || ''
            });
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userToEdit) {
                await editUser(userToEdit.id, formData);
            } else {
                await addUser(formData);
            }
            setFormData({ name: '', email: '', phone: '' });
            if (onCancel) onCancel();
        } catch (err) {
            console.error('Error saving user:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label className="block text-left  text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label className="block text-left  text-sm font-medium text-gray-700 mb-1">
                    Phone
                </label>
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="flex gap-2 pt-2">
                <button 
                    type="submit" 
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded transition"
                >
                    {userToEdit ? 'Update' : 'Add'}
                </button>
                <button 
                    type="button" 
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded transition"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default UserForm;

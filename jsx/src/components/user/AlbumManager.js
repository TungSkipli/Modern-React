import { useState, useEffect } from 'react';
import { getAlbumsByUserId, createAlbum, updateAlbum, deleteAlbum } from '../../API/albumApi';
import AlbumForm from './AlbumForm';
import AlbumList from './AlbumList';
import Modal from './Modal';

const AlbumManager = ({ userId, userName }) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingAlbum, setEditingAlbum] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, album: null });

    useEffect(() => {
        fetchAlbums();
    }, [userId]);

    const fetchAlbums = async () => {
        try {
            setLoading(true);
            const data = await getAlbumsByUserId(userId);
            setAlbums(data);
        } catch (err) {
            console.error('Error fetching albums:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAlbum = async (albumData) => {
        try {
            if (editingAlbum) {
                const updated = await updateAlbum(editingAlbum.id, albumData);
                setAlbums(albums.map(a => a.id === editingAlbum.id ? updated : a));
                setEditingAlbum(null);
            } else {
                const newAlbum = await createAlbum(albumData);
                setAlbums([...albums, newAlbum]);
            }
        } catch (err) {
            console.error('Error saving album:', err);
        }
    };

    const handleEdit = (album) => {
        setEditingAlbum(album);
    };

    const handleCancelEdit = () => {
        setEditingAlbum(null);
    };

    const handleDeleteClick = (album) => {
        setDeleteModal({ isOpen: true, album });
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteAlbum(deleteModal.album.id);
            setAlbums(albums.filter(a => a.id !== deleteModal.album.id));
            setDeleteModal({ isOpen: false, album: null });
        } catch (err) {
            console.error('Error deleting album:', err);
        }
    };

    const handleCancelDelete = () => {
        setDeleteModal({ isOpen: false, album: null });
    };

    return (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">
                Albums for {userName}
            </h4>
            
            <AlbumForm 
                album={editingAlbum}
                userId={userId}
                onSubmit={handleAddAlbum}
                onCancel={handleCancelEdit}
            />

            <AlbumList 
                albums={albums}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <Modal 
                isOpen={deleteModal.isOpen} 
                onClose={handleCancelDelete}
                title="Delete Album"
            >
                <div className="space-y-4">
                    <p className="text-gray-700">
                        Are you sure you want to delete album <strong>{deleteModal.album?.title}</strong>?
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
        </div>
    );
};

export default AlbumManager;

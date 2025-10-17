import { useState, useEffect } from 'react';
import { getPhotosByAlbumId, createPhoto, updatePhoto, deletePhoto } from '../../API/photoApi';
import PhotoForm from './PhotoForm';
import PhotoList from './PhotoList';
import Modal from './Modal';

const PhotoManager = ({ albumId, albumTitle }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingPhoto, setEditingPhoto] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, photo: null });

    useEffect(() => {
        fetchPhotos();
    }, [albumId]);

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            const data = await getPhotosByAlbumId(albumId);
            setPhotos(data);
        } catch (err) {
            console.error('Error fetching photos:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPhoto = async (photoData) => {
        try {
            if (editingPhoto) {
                const updated = await updatePhoto(editingPhoto.id, photoData);
                setPhotos(photos.map(p => p.id === editingPhoto.id ? updated : p));
                setEditingPhoto(null);
            } else {
                const newPhoto = await createPhoto(photoData);
                setPhotos([...photos, newPhoto]);
            }
        } catch (err) {
            console.error('Error saving photo:', err);
        }
    };

    const handleEdit = (photo) => {
        setEditingPhoto(photo);
    };

    const handleCancelEdit = () => {
        setEditingPhoto(null);
    };

    const handleDeleteClick = (photo) => {
        setDeleteModal({ isOpen: true, photo });
    };

    const handleConfirmDelete = async () => {
        try {
            await deletePhoto(deleteModal.photo.id);
            setPhotos(photos.filter(p => p.id !== deleteModal.photo.id));
            setDeleteModal({ isOpen: false, photo: null });
        } catch (err) {
            console.error('Error deleting photo:', err);
        }
    };

    const handleCancelDelete = () => {
        setDeleteModal({ isOpen: false, photo: null });
    };

    return (
        <div className="p-4 bg-white border-t border-gray-300">
            <h5 className="text-xs font-semibold text-gray-700 mb-3">
                Photos in "{albumTitle}"
            </h5>
            
            <PhotoForm 
                photo={editingPhoto}
                albumId={albumId}
                onSubmit={handleAddPhoto}
                onCancel={handleCancelEdit}
            />

            <PhotoList 
                photos={photos}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <Modal 
                isOpen={deleteModal.isOpen} 
                onClose={handleCancelDelete}
                title="Delete Photo"
            >
                <div className="space-y-4">
                    <p className="text-gray-700">
                        Are you sure you want to delete photo <strong>{deleteModal.photo?.title}</strong>?
                    </p>
                    <p className="text-sm text-gray-500">
                        This action cannot be undone.
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

export default PhotoManager;

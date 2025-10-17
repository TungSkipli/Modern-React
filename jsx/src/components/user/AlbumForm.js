import { useState, useEffect } from 'react';

const AlbumForm = ({ album, userId, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (album) {
            setTitle(album.title || '');
        }
    }, [album]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, userId });
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
            <input
                type="text"
                placeholder="Album title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                required
            />
            <button 
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded text-sm transition"
            >
                {album ? 'Update' : 'Add'}
            </button>
            {album && (
                <button 
                    type="button"
                    onClick={onCancel}
                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded text-sm transition"
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default AlbumForm;

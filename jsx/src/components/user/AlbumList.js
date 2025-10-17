import { useState } from 'react';
import PhotoManager from './PhotoManager';

const AlbumList = ({ albums, onEdit, onDelete, loading }) => {
    const [expandedAlbumId, setExpandedAlbumId] = useState(null);

    const togglePhotos = (albumId) => {
        setExpandedAlbumId(expandedAlbumId === albumId ? null : albumId);
    };

    if (loading) {
        return (
            <div className="text-sm text-gray-500 py-2">
                Loading albums...
            </div>
        );
    }

    if (albums.length === 0) {
        return (
            <div className="text-sm text-gray-500 py-2">
                No albums yet. Add one above!
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {albums.map(album => (
                <div 
                    key={album.id}
                    className="border border-gray-200 rounded overflow-hidden"
                >
                    <div className="flex items-center justify-between p-2 bg-gray-50">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => togglePhotos(album.id)}
                                className="text-gray-600 hover:text-gray-900 transition"
                            >
                                <svg 
                                    className={`w-4 h-4 transition-transform ${expandedAlbumId === album.id ? 'rotate-90' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <span className="text-sm text-gray-900">{album.title}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(album)}
                                className="text-xs text-gray-700 hover:text-gray-900 underline transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(album)}
                                className="text-xs text-gray-700 hover:text-gray-900 underline transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    {expandedAlbumId === album.id && (
                        <PhotoManager albumId={album.id} albumTitle={album.title} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default AlbumList;

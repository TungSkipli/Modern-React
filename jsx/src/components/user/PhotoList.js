const PhotoList = ({ photos, onEdit, onDelete, loading }) => {
    if (loading) {
        return (
            <div className="text-sm text-gray-500 py-2">
                Loading photos...
            </div>
        );
    }

    if (photos.length === 0) {
        return (
            <div className="text-sm text-gray-500 py-2">
                No photos yet. Add one above!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map(photo => (
                <div 
                    key={photo.id}
                    className="border border-gray-300 rounded overflow-hidden bg-white hover:shadow-md transition"
                >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img 
                            src={photo.url} 
                            alt={photo.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                            }}
                        />
                    </div>
                    <div className="p-2">
                        <p className="text-xs text-gray-900 font-medium truncate mb-2">
                            {photo.title}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(photo)}
                                className="text-xs text-gray-700 hover:text-gray-900 underline transition flex-1"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(photo)}
                                className="text-xs text-gray-700 hover:text-gray-900 underline transition flex-1"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PhotoList;

const AlbumList = ({ albums, onEdit, onDelete, loading }) => {
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
                    className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
                >
                    <span className="text-sm text-gray-900">{album.title}</span>
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
            ))}
        </div>
    );
};

export default AlbumList;

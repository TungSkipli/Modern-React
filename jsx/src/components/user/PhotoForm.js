import { useState, useEffect, useRef } from 'react';

const PhotoForm = ({ photo, albumId, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        url: ''
    });
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (photo) {
            setFormData({
                title: photo.title || '',
                url: photo.url || ''
            });
            setPreview(photo.url);
        }
    }, [photo]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData({ ...formData, url: base64String });
                setPreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.url) {
            alert('Please select an image');
            return;
        }
        onSubmit({ ...formData, albumId });
        setFormData({ title: '', url: '' });
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClearImage = () => {
        setFormData({ ...formData, url: '' });
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mb-4 p-3 bg-gray-50 rounded border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Photo title..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        required
                    />
                    <div className="flex gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="flex-1 text-sm text-gray-700 file:mr-2 file:py-2 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                        />
                        {preview && (
                            <button
                                type="button"
                                onClick={handleClearImage}
                                className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-100 transition"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {preview && (
                    <div className="flex items-center justify-center">
                        <div className="w-32 h-32 border-2 border-gray-300 rounded overflow-hidden bg-gray-100">
                            <img 
                                src={preview} 
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <button 
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded text-sm transition"
                >
                    {photo ? 'Update' : 'Add'} Photo
                </button>
                {photo && (
                    <button 
                        type="button"
                        onClick={onCancel}
                        className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded text-sm transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default PhotoForm;

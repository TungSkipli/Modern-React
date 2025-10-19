import { useNavigate } from "react-router-dom";

export default function VideoItem({ video, compact = false }) {
    const navigate = useNavigate();

    if (!video || !video.snippet) {
        return null;
    }

    const { snippet, id } = video;
    const { title, channelTitle, description, thumbnails, publishedAt } = snippet;
    const videoId = id.videoId || id;

    const handleClick = () => {
        navigate(`/youtube/${videoId}`, { state: { video } });
    };

    // Format time ago
    const getTimeAgo = (dateString) => {
        const now = new Date();
        const published = new Date(dateString);
        const diffInSeconds = Math.floor((now - published) / 1000);
        
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
        if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
        return `${Math.floor(diffInSeconds / 31536000)}y ago`;
    };

    // Simulate view count
    const getViewCount = () => {
        const randomViews = Math.floor(Math.random() * 10000000) + 1000;
        if (randomViews >= 1000000) return `${(randomViews / 1000000).toFixed(1)}M`;
        if (randomViews >= 1000) return `${(randomViews / 1000).toFixed(0)}K`;
        return randomViews;
    };

    // Compact mode for sidebar (related videos)
    if (compact) {
        return (
            <div 
                onClick={handleClick}
                className="flex gap-2 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
                <div className="relative flex-shrink-0">
                    <img 
                        src={thumbnails.medium.url} 
                        alt={title}
                        className="w-[168px] h-[94px] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-90 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                        {Math.floor(Math.random() * 20 + 1)}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className=" text-left font-medium text-sm leading-tight line-clamp-2 text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                    
                    <p className="text-left text-xs text-gray-600 mb-0.5 truncate">
                        {channelTitle}
                    </p>
                    
                    <div className="text-left text-xs text-gray-500">
                        <span>{getViewCount()} views</span>
                        <span className="mx-1">•</span>
                        <span>{getTimeAgo(publishedAt)}</span>
                    </div>
                </div>
            </div>
        );
    }

    // Regular mode for main list
    return (
        <div 
            onClick={handleClick}
            className="flex gap-3 cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all"
        >
            <div className="flex-shrink-0 relative">
                <img 
                    src={thumbnails.medium.url} 
                    alt={title}
                    className="w-[168px] h-[94px] sm:w-[246px] sm:h-[138px] object-cover rounded-lg"
                />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                    {Math.floor(Math.random() * 20 + 1)}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-left font-semibold text-sm sm:text-base leading-snug line-clamp-2 text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                
                <p className="text-left text-xs sm:text-sm text-gray-600 hover:text-gray-900 mb-1 cursor-pointer">
                    {channelTitle}
                </p>
                
                <div className="text-left text-xs sm:text-sm text-gray-600">
                    <span>{getViewCount()} views</span>
                    <span className="mx-1">•</span>
                    <span>{getTimeAgo(publishedAt)}</span>
                </div>
            </div>
        </div>
    );
}
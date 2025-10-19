import { useState } from "react";

export default function VideoDetail({ video, videoId }) {
    const [embedError, setEmbedError] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    if (!video) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading video...</p>
                </div>
            </div>
        );
    }

    const { snippet } = video;
    const { title, channelTitle, description, publishedAt } = snippet;

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    // Simulate view count and likes
    const viewCount = (Math.floor(Math.random() * 10000000) + 1000).toLocaleString();
    const likeCount = (Math.floor(Math.random() * 500000) + 100).toLocaleString();
    
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const handleLike = () => {
        setLiked(!liked);
        if (disliked) setDisliked(false);
    };

    const handleDislike = () => {
        setDisliked(!disliked);
        if (liked) setLiked(false);
    };

    return (
        <div className="space-y-5">
            {!embedError ? (
                <div className="relative bg-black rounded-2xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onError={() => setEmbedError(true)}
                    />
                </div>
            ) : (
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="text-center text-white space-y-5 p-8">
                            <div className="w-20 h-20 mx-auto bg-red-600 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xl font-bold mb-2">Video Embedding Disabled</p>
                                <p className="text-sm text-gray-300">The uploader has not made this video available for embedding</p>
                            </div>
                            <a 
                                href={youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg"
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-5">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                    {title}
                </h1>

                <div className="flex items-center justify-between flex-wrap gap-4 border-t-2">
                    <div className="flex items-start pr-3 pt-5 pb-4">
                    <div className="flex items-center gap-4 pr-3 ">
                        <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                            {channelTitle.charAt(0).toUpperCase()}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg text-gray-900">{channelTitle}</h3>
                            </div>
                            <p className="text-left text-sm text-gray-600 font-medium">{Math.floor(Math.random() * 900 + 100)}K subscribers</p>
                        </div>
                    </div>

                    <div className="flex gap-3 flex-shrink-0">
                        <button className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-full transition-all text-sm shadow-md transform hover:scale-105">
                            Subscribe
                        </button>
                    </div>
                </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full overflow-hidden shadow-sm border border-gray-200">
                            <button 
                                onClick={handleLike}
                                className={`flex items-center gap-2 px-5 py-2.5 transition-all ${liked ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                            >
                                <svg className="w-5 h-5" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={liked ? 0 : 2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                <span className="font-bold text-sm">{likeCount}</span>
                            </button>
                            <div className="w-px h-7 bg-gray-300"></div>
                            <button 
                                onClick={handleDislike}
                                className={`flex items-center gap-2 px-5 py-2.5 transition-all ${disliked ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                            >
                                <svg className="w-5 h-5 rotate-180" fill={disliked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={disliked ? 0 : 2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            </button>
                        </div>

                        <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-all shadow-sm border border-gray-200">
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            <span className="font-bold text-sm text-gray-700">Share</span>
                        </button>
                    </div>
                </div>

                

                <div className="bg-gray-100 hover:bg-gray-150 rounded-xl p-4 transition-all border border-gray-200">
                    <div className="text-sm font-bold text-gray-900 mb-3">
                        {viewCount} views • {formatDate(publishedAt)}
                    </div>
                    <p className={`text-sm text-gray-800 whitespace-pre-wrap leading-relaxed ${showFullDescription ? '' : 'line-clamp-3'}`}>
                        {description || 'No description available.'}
                    </p>
                    {description && description.length > 150 && (
                        <button 
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="text-sm font-bold text-gray-900 mt-3 hover:text-blue-600 transition-colors"
                        >
                            {showFullDescription ? '▲ Show less' : '▼ Show more'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
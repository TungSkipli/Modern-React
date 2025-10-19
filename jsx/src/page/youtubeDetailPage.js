import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import VideoDetail from "../components/youtube/videoDetail";
import VideoList from "../components/youtube/videoList";
import youtubeApi from "../API/youtubeApi";

export default function YoutubeDetailPage() {
    const { videoId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(location.state?.video);

    useEffect(() => {
        // Fetch related videos
        if (videoId) {
            youtubeApi.get('/search', {
                params: {
                    relatedToVideoId: videoId,
                    type: 'video'
                }
            }).then((response) => {
                setRelatedVideos(response.data.items);
            }).catch(() => {
                // If related videos fail, just search for random videos
                youtubeApi.get('/search', {
                    params: {
                        q: currentVideo?.snippet?.title || 'popular'
                    }
                }).then((response) => {
                    setRelatedVideos(response.data.items);
                });
            });
        }
    }, [videoId, currentVideo]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Back Button */}
            <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/youtube')}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-semibold">Back</span>
                        </button>
                        
                        <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Video Player</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Video Section */}
                    <div className="flex-1 min-w-0 lg:max-w-[calc(100%-430px)]">
                        <div className="bg-white rounded-xl shadow-md p-5 lg:p-7">
                            <VideoDetail video={currentVideo} videoId={videoId} />
                        </div>
                    </div>

                    {/* Related Videos Sidebar */}
                    <div className="lg:w-[400px] flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
                            <h2 className="text-base font-bold mb-4 text-gray-900 pb-3 border-b">
                                Related Videos
                            </h2>
                            <div className="max-h-[calc(100vh-200px)] overflow-y-auto -mx-2 px-2 space-y-2">
                                <VideoList videos={relatedVideos} compact={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
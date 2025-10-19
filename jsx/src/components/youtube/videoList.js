import VideoItem from "./videoItem"

export default function VideoList({ videos, compact = false }) {
    if (!videos || videos.length === 0) {
        return (
            <div className="text-center text-gray-500 py-12">
                <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-bold text-gray-700 mb-2">No videos yet</p>
                <p className="text-sm text-gray-500">Search for videos to see results</p>
            </div>
        );
    }

    return (
        <div className={compact ? "space-y-0" : "space-y-3"}>
            {videos.map((video) => (
                <VideoItem 
                    key={video.id.videoId || video.id} 
                    video={video} 
                    compact={compact}
                />
            ))}
        </div>
    );
}
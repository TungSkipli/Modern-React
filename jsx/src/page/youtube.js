import { useState } from "react";
import SearchBar from "../components/youtube/searchBar";
import VideoList from "../components/youtube/videoList";

export default function Youtube() {
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (videoList, term) => {
        setVideos(videoList);
        setSearchTerm(term);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm">
                <SearchBar onSubmit={handleSearchSubmit} />
            </div>

            <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="bg-white rounded-xl shadow-md p-6">
                    <VideoList videos={videos} />
                </div>
            </div>
        </div>
    );
}
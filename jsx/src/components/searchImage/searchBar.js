import { useState } from "react";
import API_SearchImage from "../../API/api";
import ImageList from "./imageList";
import '../../Styles/search/SearchBar.css';
export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [images, setImages] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const results = await API_SearchImage(searchTerm);
        setImages(results);
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleChange}
                    placeholder="Search for images..."
                />
            </form>
            <div className="">
                <ImageList images={images} />
            </div>
        </div>
    )
}
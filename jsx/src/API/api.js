
import axios from 'axios';

const API_SearchImage = async (term) => {
    const response = await axios.get('https://api.unsplash.com/search/photos',{
        headers: {
            Authorization:"Client-ID DgU5QyUcxGSevsPzPwjjSn9wlr4zm4J5rQ0_q6j0XGc",
        },
        params: {
            query: term,
        }
    })
    return response.data.results;
}
export default API_SearchImage;
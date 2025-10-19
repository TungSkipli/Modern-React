import React from "react";
import youtubeApi from "../../API/youtubeApi";

class SearchBar extends React.Component {
    state = { term: '' };

    onInputChange = (event) => {
        this.setState({ term: event.target.value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        youtubeApi.get('/search', {
            params: {
                q: this.state.term,
            },
        }).then((response) => {
            console.log(response.data.items);
            if (this.props.onSubmit) {
                this.props.onSubmit(response.data.items, this.state.term);
            }
        }).catch((error) => {
            console.error('Error fetching videos:', error);
        });
    }

    render() {
        return (
            <div className="px-4 sm:px-6 py-4">
                <form onSubmit={this.handleFormSubmit}>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-gray-900 hidden md:block whitespace-nowrap">
                                Video Search
                            </h1>

                            <div className="flex-1 flex items-center border-2 border-gray-300 rounded-full overflow-hidden focus-within:border-blue-500 focus-within:shadow-lg transition-all bg-white">
                                <input
                                    type="text"
                                    value={this.state.term}
                                    onChange={this.onInputChange}
                                    placeholder="Search for videos..."
                                    className="flex-1 px-5 py-3 outline-none text-sm font-medium"
                                />
                                <button 
                                    type="submit"
                                    className="px-7 py-3 bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;
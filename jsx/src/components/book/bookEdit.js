
import { useState } from "react";
import "../../Styles/books/bookEdit.css";

export default function BookEdit({ book, onEdit, onCancel }) {
    const [title, setTitle] = useState(book ? book.title : '');

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onEdit) {
            onEdit(book.id, title);
        }
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    }

    if (!book) {
        return null;
    }


    return (
        <div className="book-edit-container">
            <form onSubmit={handleSubmit} className="book-edit-form">
                <label>Title</label>
                <input 
                    value={title} 
                    onChange={handleChange} 
                    className="input"
                />
                <button type="submit" className="button-edit">
                    save
                </button>
                <button type="button" className="button-cancel" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
}
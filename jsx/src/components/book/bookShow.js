import { useState } from "react";
import "../../Styles/books/bookShow.css";

export default function BookShow({book, onDelete, onEdit}) {

    const[showEdit, setShowEdit] = useState(false);
    const[title, setTitle] = useState(book.title);

    const handleClick = () => {
        onDelete(book.id) 
    }

    const handleEditClick = () => {
        setShowEdit(!showEdit);
        setTitle(book.title);
    }

    const handleEditSubmit = () => {
        setShowEdit(false);
        onEdit(book.id, title);
    }

    const handleEditCancel = () => {
        setShowEdit(false);
        setTitle(book.title);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    let content;
    let actions;

    if(showEdit){
        content = (
            <div className="edit-content">
                <h3>title</h3>
                <input 
                    value={title} 
                    onChange={handleTitleChange} 
                    className="input"
                />
            </div>
        );
        actions = (
            <div className="actions">
                <button className="button-edit" onClick={handleEditSubmit} title="Update">
                    Save
                </button>
                <button className="button-cancel" onClick={handleEditCancel} title="Cancel">
                    cancel
                </button>
            </div>
        );
    } else {
        content = <h3>{book.title}</h3>;
        actions = (
            <div className="actions">
                <button className="edit" onClick={handleEditClick} title="Edit">
                    ✏️
                </button>
                <button className="delete" onClick={handleClick} title="Delete">
                    ✕
                </button>
            </div>
        );
    }

    return (
        <div className="book-show">
            <img src={`https://picsum.photos/seed/${book.id}/300/200`} alt="books"/>
            {content}
            {actions}
        </div>
    )
}
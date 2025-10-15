import { useState } from "react";
import "../../Styles/books/bookCreate.css";

export default function BookCreate({onCreate}) {
    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        onCreate(title);
        setTitle('');
    }
  return (
    <div className="book-create-container">
      
      <form onSubmit={handleSubmit} className="book-create-form">
        <h3>Add a Book</h3>
        <label> Title</label>
        <input value={title} onChange={handleChange} className="input"/>
        <button className="button">
            Create
        </button>
      </form>
    </div>
  );
}
import { useState } from "react"
import BookCreate from "../components/book/bookCreate"
import BookList from "../components/book/bookList"
import axios from "axios"

export default function Book() {
    const [books, setBooks] = useState([])

    const addBook = async (title) => {

        const response = await axios.post("http://localhost:3001/books", { title })

        const updatedBooks = [...books, response.data]
        setBooks(updatedBooks)
        console.log(response.data)
    }

    const deleteBookId = (id) => {
        const updatedBooks = books.filter((book) => book.id !== id)
        setBooks(updatedBooks)
    }

    const editBook = (id, newTitle) => {
        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, title: newTitle }
            }
            return book
        })
        setBooks(updatedBooks)
    }

    return (
        <div>
            {books.length}
            <BookCreate onCreate={addBook} />
            <BookList books={books} onDelete={deleteBookId} onEdit={editBook} />
        </div>
    )
}
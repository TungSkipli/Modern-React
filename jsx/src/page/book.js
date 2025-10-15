import { useEffect, useState, useCallback } from "react"
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

    const deleteBookId = async (id) => {

        const response = await axios.delete(`http://localhost:3001/books/${id}`)
        console.log(response.data)
        const updatedBooks = books.filter((book) => book.id !== id)
        setBooks(updatedBooks)
    }

    const fetchBooks = useCallback(async () => {
        const response = await axios.get('http://localhost:3001/books')
        setBooks(response.data)
        console.log(response.data)
    }, [])

    useEffect(() => {
        fetchBooks()
    }, [fetchBooks])

    const editBook = async(id, newTitle) => {

        const response = await axios.put(`http://localhost:3001/books/${id}`, { title: newTitle })
        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response.data }
            }
            return book
        })
        setBooks(updatedBooks)
    }

    return (
        <div>
            <BookCreate onCreate={addBook} />
            <BookList books={books} onDelete={deleteBookId} onEdit={editBook} />
        </div>
    )
}
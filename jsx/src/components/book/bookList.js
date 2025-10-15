import BookShow from "./bookShow"
import "../../Styles/books/bookList.css"

export default function BookList({books, onDelete, onEdit}) {
    const rederBooks = books.map((book) => {
        return(
            <BookShow onDelete={onDelete} onEdit={onEdit} key={book.id} book={book}/>
        )
    })
    return (
        <div className="book-list">
            {rederBooks}
        </div>
    )
}
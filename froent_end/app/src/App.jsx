import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [release_year, setReleaseYear] = useState(0);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addBook = async () => {
    const bookData = {
      title,
      release_year,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (pk, release_year) => {
    const bookData = {
      title: newTitle,
      release_year,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === pk) {
            return data;
          } else {
            return book;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "DELETE",     
      });
      setBooks((prev) => prev.filter((book) => book.id !== pk))
    }catch (err) {
      console.log(err)
    };
  }

  return (
    <>
      <h1>Book Website</h1>
      <form>
        <input type="text" placeholder="Book Title" onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Release year" onChange={(e) => setReleaseYear(parseInt(e.target.value))} />
        <button type="button" onClick={addBook}>Add book</button>
      </form>
      {books.map((book) => (
        <div key={book.id}>
          <h3>Title: {book.title}</h3>
          <h3>Release Year: {book.release_year}</h3>
          <input type="text" placeholder="New Title" onChange={(e) => setNewTitle(e.target.value)} />
          <button type="button" onClick={() => updateTitle(book.id, book.release_year)}>Change Title</button>
          <button type='button' onClick={() => deleteBook(book.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
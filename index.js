const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample book data (temporary, use a database later)
let books = [
    { id: 1, title: "Noli Me Tangere", author: "Jose Rizal" },
    { id: 2, title: "El Filibusterismo", author: "Jose Rizal" }
];

// 👉 1️⃣ GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// 👉 2️⃣ GET a single book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// 👉 3️⃣ CREATE a new book (POST)
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Title and author are required" });

    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// 👉 4️⃣ UPDATE a book by ID (PUT)
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { title, author } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

// 👉 5️⃣ DELETE a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});

// Start the server

app.get('/', (req, res) => {
    res.send("📚 Welcome to the Bookstore API!");
});

app.listen(PORT, () => {
    console.log(`📚 Bookstore API running at http://localhost:${PORT}`);
});

const myLibrary = [];

function Book(id, title, author, pages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
}

Book.prototype.getInfo = function () {
    return `${this.title} by ${this.author}, number of pages: ${this.pages}`;
}

function addBookToLibrary(bookTitle, bookAuthor, bookPages) {
    // take params, create a book then store it in the array
    const book = new Book(crypto.randomUUID(), bookTitle, bookAuthor, bookPages);
    myLibrary.push(book);
}


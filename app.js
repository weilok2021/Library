const myLibrary = [];

function Book(id, title, author, pages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.getInfo = function () {
    return `${this.title} by ${this.author}, number of pages: ${this.pages}`;
}

Book.prototype.hadRead = function (button) {
    if (!button.classList.contains("had-read")) {
        this.status = "Had Read!";
    }
    else {
        this.status = "Not Yet Read";
    }
    button.classList.toggle("had-read");
}

function addBookToLibrary(bookTitle, bookAuthor, bookPages) {
    // take params, create a book then store it in the array
    const book = new Book(crypto.randomUUID(), bookTitle, bookAuthor, bookPages, "Not read yet");
    myLibrary.push(book);
}

function displayBooks() {
    function createRemoveButton() {
        const button = document.createElement("button");
        button.classList.add("remove-button");
        button.innerText = "remove book";
        return button;
    }

    function createHadReadButton(isRead) {
        const button = document.createElement("button");
        button.classList.add("read-button");
        button.innerText = "had read?";
        if (isRead) {
            button.classList.add("had-read");
        }
        return button;
    }

    function createBookRow(id, title, author, pages, status) {
        const row = document.createElement("tr");

        // associate unique id with each book row in html
        row.dataset.id = id;
        let data1 = document.createElement("th");
        let data2 = document.createElement("td");
        let data3 = document.createElement("td");
        let data4 = document.createElement("td");

        data1.innerText = title;
        row.appendChild(data1);
        data2.innerText = author;
        row.appendChild(data2);
        data3.innerText = pages;
        row.appendChild(data3);
        data4.innerText = status;
        row.appendChild(data4);

        // add a remove Button to each book row
        const removeButton = createRemoveButton();
        row.appendChild(removeButton);
        
        // let the button to have state of the book read status
        const isRead = status === "Had Read!";
        const hadReadButton = createHadReadButton(isRead);
        row.appendChild(hadReadButton);
        return row;
    }

    const tableBody = document.querySelector("table > tbody");
    // Clear the existing content of the table body (reset state)
    tableBody.innerHTML = '';
    for (let book of myLibrary) {
        tableBody.appendChild(createBookRow(book.id, book.title, book.author, book.pages, book.status));
    }
}

function addNewBook(e) {
    e.preventDefault();
    const titleInput =  document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#pages");

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    addBookToLibrary(title, author, pages);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";

    displayBooks();
}

const form = document.querySelector("form");
form.addEventListener("submit", addNewBook);

// listen for remove book event
const tableBody = document.querySelector("table > tbody");

tableBody.addEventListener("click", function (e) {
    // Check if the clicked element is a button with the class "remove-button"
    if (e.target.matches(".remove-button")) {
        const bookRow = e.target.parentElement;
        console.log(bookRow);
        const bookId = bookRow.dataset.id;

        // Find the index of the book in myLibrary array
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);

        // If the book is found, remove it from the array
        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
        }
    }


    if (e.target.matches(".read-button")) {
        const bookRow = e.target.parentElement;
        const bookId = bookRow.dataset.id;
        const book = myLibrary.find((book) => bookId === book.id);
        book.hadRead(e.target);
    }

    // Re-display the books to update the table
    displayBooks();
});


// addBookToLibrary("Atomic Habits", "James Clear", 300);
// addBookToLibrary("Rich Dad Poor Dad", "Robert Kiyosaki", 500);


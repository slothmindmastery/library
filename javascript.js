const myLibrary = [];
const libraryDiv = document.querySelector("#library");
const addNewBookButton = document.querySelector("#addNewBook");
const addNewBookDialogue = document.querySelector("#addNewBookDialog");
const addBookForm = document.querySelector("#addBookForm");
const openDialogButton = document.querySelector("#openDialogButton");
const cancelButton = document.querySelector("#cancelButton");

function Book(title, author) {
  this.title = title;
  this.author = author;
  this.read = false;
}

function addBookToLibrary(title, author) {
  myLibrary.push(new Book(title, author));
}

function displayBooks() {
  while (libraryDiv.firstChild) {
    libraryDiv.removeChild(libraryDiv.firstChild);
  }
  for (const book of myLibrary) {
    const bookDiv = document.createElement("div");
    const titleDiv = document.createElement("div");
    const authorDiv = document.createElement("div")
    bookDiv.className = "card";
    titleDiv.className = "title";
    titleDiv.textContent = book.title;
    authorDiv.className = "author";
    authorDiv.textContent = book.author;

    libraryDiv.appendChild(bookDiv);
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
  }
}

addNewBookButton.addEventListener("click", () => {
  addNewBookDialogue.showModal();
});

cancelButton.addEventListener("click", () => {
  addNewBookDialog.close();
});

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form behavior

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;

  // Add book to the library
  addBookToLibrary(title, author);
  displayBooks();
  addBookForm.reset();
  addNewBookDialog.close();
});
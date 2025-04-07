const myLibrary = [];
const libraryDiv = document.querySelector("#library");
const addNewBookButton = document.querySelector("#addNewBookButton");
const addNewBookDialogue = document.querySelector("#addNewBookDialog");
const addBookForm = document.querySelector("#addBookForm");
const openDialogButton = document.querySelector("#openDialogButton");
const cancelButton = document.querySelector("#cancelButton");

function Book(title, author) {
  this.title = title;
  this.author = author;
  this.read = false;
  this.id = crypto.randomUUID();
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
    const authorDiv = document.createElement("div");
    const removeButton = document.createElement("button");
    const switchDiv = document.createElement("div");
    const switchLabel = document.createElement("label");
    const switchCheckbox = document.createElement("input");
    const switchSlider = document.createElement("span");
    
    bookDiv.className = "book-card";
    bookDiv.dataset.uniqueIdentifier = book.id;
    
    titleDiv.className = "book-title";
    titleDiv.textContent = book.title;
    
    authorDiv.className = "book-author";
    authorDiv.textContent = book.author;
    
    removeButton.textContent = "Remove Book";
    removeButton.addEventListener("click", () => {
      removeBook(book.id);
    });

    switchDiv.className = "read-toggle";
    switchDiv.textContent = "Read: ";
    switchLabel.className = "switch";
    switchCheckbox.type = "checkbox";
    switchCheckbox.checked = book.read;
    switchCheckbox.addEventListener("change", () => {
      toggleRead(book.id);
    });
    switchSlider.className = "slider round";

    libraryDiv.appendChild(bookDiv);
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(switchDiv);
    bookDiv.appendChild(removeButton);
    switchDiv.appendChild(switchLabel);
    switchLabel.appendChild(switchCheckbox);
    switchLabel.appendChild(switchSlider);
  }
}

function removeBook(id) {
  const bookIndex = myLibrary.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  }
}

function toggleRead(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.read = !book.read;
  }
}

addNewBookButton.addEventListener("click", () => {
  addNewBookDialogue.showModal();
});

cancelButton.addEventListener("click", () => {
  addNewBookDialogue.close();
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


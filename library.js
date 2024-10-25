// global array
let array = [];

// Function to display books on the page
function displayBooks(bookArray) {
  const bookListElement = document.getElementById("bookList");
  bookListElement.innerHTML = ""; // Clear previous entries

  const bookList = document.createElement("ul");

  bookArray.forEach((book) => {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${book.id}`;
    checkbox.addEventListener("change", function () {
      const bookIndex = array.findIndex(
        (b) => `checkbox-${b.id}` === checkbox.id
      );

      if (checkbox.checked && bookIndex !== -1) {
        array.splice(bookIndex, 1);
      }

      if (checkbox.checked) {
        listItem.remove();
      }
    });

    const checkboxLabel = document.createElement("label");
    checkboxLabel.textContent = "Ta bort:";
    checkboxLabel.htmlFor = checkbox.id;

    const titleAndAuthor = document.createElement("h2");
    titleAndAuthor.textContent = `${book.Title}`;

    const genreElement = document.createElement("p");
    genreElement.textContent = `Genre: ${book.Genre}`;

    const descriptionElement = document.createElement("span");
    descriptionElement.textContent = `${book.Description}`;

    const coverImage = document.createElement("img");
    coverImage.src = book.Cover;

    listItem.appendChild(coverImage);
    listItem.appendChild(titleAndAuthor);
    listItem.appendChild(genreElement);
    listItem.appendChild(descriptionElement);
    listItem.appendChild(checkboxLabel);
    listItem.appendChild(checkbox);

    bookList.appendChild(listItem);
  });

  bookListElement.appendChild(bookList);
}

// Event listener for adding books
document.getElementById("add-button").addEventListener("click", (event) => {
  event.preventDefault();

  const bookTitle = document.getElementById("title").value;
  const bookGenre = document.getElementById("genre").value;
  const bookDescription = document.getElementById("description").value;
  const coverUrl = document.getElementById("cover").value;

  if (!bookTitle || !bookGenre || !bookDescription || !coverUrl) {
    alert("Please fill in all fields before adding a new book.");
    return;
  }

  const newBook = {
    Title: bookTitle,
    Genre: bookGenre,
    Description: bookDescription,
    Cover: coverUrl,
  };

  array.push(newBook);

  // Fetch from static JSON file instead of localhost
  fetch("data/books.json")
    .then((res) => res.json())
    .then((serverBooks) => {
      const combinedBooks = array.concat(serverBooks);
      displayBooks(combinedBooks);
      clearInputFields();
    })
    .catch((err) => console.log("error" + err));
});

// Fetch books when the page loads
fetch("data/books.json")
  .then((res) => res.json())
  .then((serverBooks) => {
    displayBooks(serverBooks);
  })
  .catch((err) => console.log("error" + err));

// Function to clear input fields
function clearInputFields() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("cover").value = "";
}

const searchButton = document.querySelector("#search");
const addButton = document.querySelector("#add");
const startMenu = document.querySelector(".start-buttons");
const addBook = document.querySelector(".add-book");
const searchMenu = document.querySelector(".search-box");
const input = document.getElementById('title');

function handleSearch(event)
{
  const searchValue = event.target.value;
  searchLibrary(searchValue);
}

function searchLibrary(query)
{
  const API_KEY = 'AIzaSyAqENo9qzKMPLpXUIseiU9B0pwaX2CEmA8';
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}&langRestrict=en&maxResults=3`;

  fetch(URL)
    .then(response => response.json())
    .then(data => {
      searchResults(data.items);
    });
}

function searchResults(books) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  books.forEach(book => {
    const title = book.volumeInfo.title;
    const div = document.createElement('div');
    div.className = 'search-result';
    div.textContent = title;
    div.style = 'color: white;';

    results.appendChild(div);
  });
}

// lägg till funktion för att lägga till bok till bokhyllan

input.addEventListener('input', handleSearch);

function showStartMenu() {
  startMenu.style.display = "block";
  addBook.style.display = "none";
  searchMenu.style.display = "none";
}

searchButton.addEventListener("click", function () {
  showSearchMenu();
});

/*---Funktion för att visa sökmenyn--*/
function showSearchMenu() {
  startMenu.style.display = "none";
  addBook.style.display = "none";
  searchMenu.style.display = "block";
}

addButton.addEventListener("click", function () {
  showAddMenu();
});

/*---Funktion för att visa lägg till menyn--*/
function showAddMenu() {
  startMenu.style.display = "none";
  addBook.style.display = "block";
  searchMenu.style.display = "none";
}

function displayBooks() {
  fetch("http://localhost:3000/books")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const bookListElement = document.getElementById("bookList");
      const bookList = document.createElement("ul");

      data.forEach((Books) => {
        // Create a container for each book item
        const listItem = document.createElement("li");

        // Delete checkbox for each book
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `checkbox-${Books.id}`; // a unique id to each checkbox
        checkbox.addEventListener("change", function () {
          // Remove the book when the checkbox is checked
          if (checkbox.checked) {
            listItem.remove();
          }
        });

        // Label for the checkbox
        const checkboxLabel = document.createElement("label");
        checkboxLabel.textContent = "Remove Book:";
        checkboxLabel.htmlFor = checkbox.id;

        // Show Book Title and Author
        const titleAndAuthor = document.createElement("h2");
        titleAndAuthor.textContent = `${Books.Title} by ${Books.Author}`;

        // Show Genre
        const genreElement = document.createElement("p");
        genreElement.textContent = `Genre: ${Books.Genre}`;

        // Show Description
        const descriptionElement = document.createElement("span");
        descriptionElement.textContent = `Description: ${Books.Description}`;

        // Show cover img
        const coverImage = document.createElement("img");
        coverImage.src = Books.Cover;

        //

        // Elements in a desired order
        listItem.appendChild(coverImage);
        listItem.appendChild(titleAndAuthor);
        listItem.appendChild(genreElement);
        listItem.appendChild(descriptionElement);
        bookList.appendChild(listItem);
        listItem.appendChild(checkboxLabel);
        listItem.appendChild(checkbox);

        console.log(Books);
      });

      bookListElement.appendChild(bookList);
    })
    .catch((err) => console.log("error" + err));
}

displayBooks();

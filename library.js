const searchButton = document.querySelector("#search");
const addButton = document.querySelector("#add");
const startMenu = document.querySelector(".start-buttons");
const addBook = document.querySelector(".add-book");
const searchMenu = document.querySelector(".search-box");

/* function toggleForm() {

    let form = document.getElementsById("add-book");


    if (form.style.display === "none") { 
        form.style.display = "box";
        startMenu.style.display = "none";
        searchMenu.style.display = "none";
    } else {
        form.style.display = "none";
        startMenu.style.display = "box";
        searchMenu.style.display = "none";
    }
} */

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
        // Show Book Titel and Author
        const listItem = document.createElement("li");
        listItem.textContent = `${Books.Title} by ${Books.Author}`;

        // Show cover img
        const coverImage = document.createElement("img");
        coverImage.src = Books.Cover;

        listItem.appendChild(coverImage);
        bookList.appendChild(listItem);

        console.log(Books);
      });
      bookListElement.appendChild(bookList);
    })
    .catch((err) => console.log("error" + err));
}
displayBooks();

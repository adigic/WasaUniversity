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

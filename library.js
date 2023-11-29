// global array
let array = [];

function displayBooks(bookArray) {
  // Hitta HTML-elementet med ID "bookList"
  const bookListElement = document.getElementById("bookList");

  // Ta bort det som fanns där innan
  bookListElement.innerHTML = "";

  // Skapa en ny lista
  const bookList = document.createElement("ul");

  // Gå igenom varje bok i listan
  bookArray.forEach((book) => {
    // Skapa en Li för varje bok
    const listItem = document.createElement("li");

    // Skapa en kryssruta för varje bok
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${book.id}`;
    checkbox.addEventListener("change", function () {
      const bookIndex = array.findIndex(
        (b) => `checkbox-${b.id}` === checkbox.id
      );

      if (checkbox.checked && bookIndex !== -1) {
        // Remove the book from the array
        array.splice(bookIndex, 1);
      }

      if (checkbox.checked) {
        listItem.remove();
      }
    });
    // Skapa en etikett för kryssrutan
    const checkboxLabel = document.createElement("label");
    checkboxLabel.textContent = "Ta bort:";
    checkboxLabel.htmlFor = checkbox.id;

    // Skapa element för bokdetaljer (titel, genre, beskrivning, omslagsbild)
    const titleAndAuthor = document.createElement("h2");
    titleAndAuthor.textContent = `${book.Title}`;

    const genreElement = document.createElement("p");
    genreElement.textContent = `Genre: ${book.Genre}`;

    const descriptionElement = document.createElement("span");
    descriptionElement.textContent = `${book.Description}`;

    const coverImage = document.createElement("img");
    coverImage.src = book.Cover;

    // Lägg till alla element i Li
    listItem.appendChild(coverImage);
    listItem.appendChild(titleAndAuthor);
    listItem.appendChild(genreElement);
    listItem.appendChild(descriptionElement);
    listItem.appendChild(checkboxLabel);
    listItem.appendChild(checkbox);

    bookList.appendChild(listItem);
  });
  // Lägg till listan i "bookList"-elementet i HTML
  bookListElement.appendChild(bookList);
}

document.getElementById("add-button").addEventListener("click", (event) => {
  event.preventDefault();

  // Hämta värden från inmatningsfälten
  const bookTitle = document.getElementById("title").value;
  const bookGenre = document.getElementById("genre").value;
  const bookDescription = document.getElementById("description").value;
  const coverUrl = document.getElementById("cover").value;

  if (!bookTitle || !bookGenre || !bookDescription || !coverUrl) {
    alert("Please fill in all fields before adding a new book.");
    return; // Avsluta funktionen om valideringen misslyckas
  }
  // Skapa en ny bok
  const newBook = {
    Title: bookTitle,
    Genre: bookGenre,
    Description: bookDescription,
    Cover: coverUrl,
  };

  // Lägg till den nya boken i den globala listan
  array.push(newBook);

  console.log(array);

  // Hämta böcker från servern
  fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then((serverBooks) => {
      // Blanda den lokala och de serverhämtade böckerna och visa dem
      const combinedBooks = array.concat(serverBooks);

      displayBooks(combinedBooks);
      clearInputFields();
    })
    .catch((err) => console.log("error" + err));
});

// Hämta böcker från servern när sidan laddas
fetch("http://localhost:3000/books")
  .then((res) => res.json())
  .then((serverBooks) => {
    // Visa de böcker från data.json
    displayBooks(serverBooks);
  })
  .catch((err) => console.log("error" + err));

// Funktion för att rensa inputs efter submit
function clearInputFields() {
  // Clear input values after submission
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("cover").value = "";
}

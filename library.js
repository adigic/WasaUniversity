// global array
let array = [];


function displayBooks(bookArray) {
  const bookListElement = document.getElementById("bookList");
  bookListElement.innerHTML = ''; // Clear the previous content

  const bookList = document.createElement("ul");

  bookArray.forEach((book) => {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${book.id}`;
    checkbox.addEventListener("change", function () {
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

document.getElementById('add-button').addEventListener('click', (event) => {
  event.preventDefault();

  const bookTitle = document.getElementById("title").value;
  const bookGenre = document.getElementById("genre").value;
  const bookDescription = document.getElementById("description").value;
  const coverUrl = document.getElementById("cover").value;

  const newBook = {
    Title: bookTitle,
    Genre: bookGenre,
    Description: bookDescription,
    Cover: coverUrl
  };

  array.push(newBook);
  console.log(array);

  // fetched böcker från server
  fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then((serverFetchedBooks) => {
      // Kombinerar server-fetchade böcker och array books som sedan visas
      const combinedBooks = array.concat(serverFetchedBooks); //.concat för att kombinera arrays
      displayBooks(combinedBooks);
    })
    .catch((err) => console.log("error" + err));
});

// Ursprung med serverhämtade böcker
fetch("http://localhost:3000/books")
  .then((res) => res.json())
  .then((initialServerFetchedBooks) => {
    displayBooks(initialServerFetchedBooks);
  })
  .catch((err) => console.log("error" + err));



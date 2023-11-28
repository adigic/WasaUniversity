// global array
let array = [];

function displayBooks() {
  fetch("http://localhost:3000/books")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const bookListElement = document.getElementById("bookList");
      const bookList = document.createElement("ul");

      array = data;

      console.log(array);

      array.forEach((Books) => {
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
        descriptionElement.textContent = `${Books.Description}`;

        // Show cover img
        const coverImage = document.createElement("img");
        coverImage.src = Books.Cover;

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

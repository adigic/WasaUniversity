let form = document.getElementById("bookForm");

function displayBooks() {
  fetch("http://localhost:3000/books")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const bookListElement = document.getElementById("BookList");
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

function addBook(title, author, cover) {
  const newBook = {
    Title: title,
    Author: author,
    Cover: cover,
  };

  fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Book added successfully:", data);
      displayBooks();
    })
    .catch((err) => console.log("error" + err));
}

/*-------------------------EVENTLISTERS-----------------------------------------*/

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const cover = document.getElementById("cover").value;

  addBook(title, author, cover);
});

/*----------------------show and hide BUTTONS-------------------------------*/
function toggleForm() {
  let form = document.getElementById("bookForm");

  // Toggle the display property
  if (form.style.display === "none") {
    form.style.display = "flex";
    toggleFormBtn.style.display = "none";
  } else {
    form.style.display = "none";
    toggleFormBtn.style.display = "flex";
  }
}

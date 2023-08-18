const bookSelect = document.getElementById("bookSelect");
const selectedBook = document.getElementById("selectedBook");

bookSelect.addEventListener("change", function() {
    selectedBook.textContent = bookSelect.value;
});


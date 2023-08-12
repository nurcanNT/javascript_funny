let input = document.querySelector(".input");
let btnCheck = document.querySelector(".btn-check");
let btnAdd = document.querySelector(".btn-add");
let btnDelete = document.querySelector(".btn-delete");
let btnShow = document.querySelector(".btn-show");
let result = document.querySelector(".result");
let arrayOfItem = [];

if (localStorage.getItem("items")) {
    arrayOfItem =JSON.parse(localStorage.getItem("items"));
}

getItemFromLocalStorange();

//add element
//to empty array
btnAdd.addEventListener("click", () => {
    if (input.value != "") {
        addElement(input.value);
        input.value = "";
    } else {
        result.innerHTML = "";
        addItemToPage("Input Can Be Impty");
    }
});

//show item to the page

btnShow.addEventListener("click", () => {
    result.innerHTML = "";
    if ( arrayOfItem.length != 0) {
        arrayOfItem.forEach((item) => {
            addItemToPage(`<span>${item}</span>`);
        });
    } else {
        addItemToPage("Local Storange Is Empty");
    }
});

//Delete item form local storage

btnDelete.addEventListener("click", () => {
    result.innerHTML = "";
    if (input.value == "") {
        addItemToPage("Input Can Be Impty");
    } else {
        result.innerHTML = "";
        if (arrayOfItem.includes(input.value)) {
            arrayOfItem = arrayOfItem.filter((el) => el !== input.value);
            addItemToLocalStorage(arrayOfItem);
            addItemToPage(`Deleted local storage item <span>${input.value}</span>`);
        } else {
            addItemToPage(
                `No Local Storage Item With This Name <span>${input.value}</span>`
            );
        }
    }
    input.value = "";
});

//check item
btnCheck.addEventListener("click", () => {
    result.innerHTML = "";
    if (input.value == "") {
        addItemToPage("Input Can Be Impty");
    } else {
        if ( arrayOfItem.includes(input.value)) {
            addItemToPage (
                `Found Local Storage Item Called <span>${input.value}</span>`
            );
        } else {
            addItemToPage (
                `No Local Storage Item With This Name <span>${input.value}</span>`
            );
        }
    }
    input.value = "";
});

//create function add element

function addElement(textTask) {
    arrayOfItem.push(textTask);
    addElementToPage(arrayOfItem);
    addItemToLocalStorage(arrayOfItem);
}

//add item tp the page 

function addElementToPage(arrayOfItem) {
    if (input.value != "") {
        result.innerHTML = "";
        addItemToPage(`Local Storage Item <span>${input.value}</span>`);
    }
}

//add item to local storage
function addItemToLocalStorage(arrayOfItem) {
    if (input.value !== "") {
        window.localStorage.setItem("items", JSON.stringify(arrayOfItem));
    }
}

//get item from local storage

function getItemFromLocalStorange(){
    data = window.localStorage.getItem("items");
    if (data){
        let tasks = JSON.parse(data);
        addElementToPage(tasks);
    }
}

//function to aded item to the page

function addItemToPage(el) {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
        <div>${el}</div>
        <button class="delete-button">Sil</button>
    `;
    result.appendChild(div);
}

result.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
        const parentDiv = event.target.closest(".task");
        const taskContent = parentDiv.querySelector("div").textContent;
        deleteItem(taskContent);
        parentDiv.remove();
    }
});

function deleteItem(item) {
    arrayOfItem = arrayOfItem.filter((el) => el !== item);
    addItemToLocalStorage(arrayOfItem);
}


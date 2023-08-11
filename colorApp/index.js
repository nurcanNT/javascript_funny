
document.addEventListener("DOMContentLoaded", function() {
    let list = document.querySelectorAll("ul li");
let experiment = document.querySelector(".experiment");

if (window.localStorage.getItem("color")) {
    experiment.style.backgroundColor = window.localStorage.getItem("color");
    list.forEach(li => {
        li.classList.remove("active");
    })

    document.querySelector(`[data-color="${window.localStorage.getItem("color")}"]`).classList.add("active");
}

list.forEach(li => {
    li.onclick = function(el) {
        list.forEach(li => {
            li.classList.remove("active");
        })

        el.currentTarget.classList.add("active");
        window.localStorage.setItem("color", el.currentTarget.dataset.color);
        experiment.style.backgroundColor = el.currentTarget.dataset.color;
    }
})
});

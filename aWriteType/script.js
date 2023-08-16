document.addEventListener("DOMContentLoaded", function() {
    const text = document.querySelector(".splt");
    const textContent = text.textContent;
    
    const chars = textContent.split("").map(char => {
        return `<span class="char">${char}</span>`;
    });

    text.innerHTML = chars.join(" ");
});

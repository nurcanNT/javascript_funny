const mainImage = document.getElementById("main-image");
const selectableImages = document.querySelectorAll(".selectable-image");
const toggleMatrixModeButton = document.getElementById("toggle-matrix-mode");
const imageListContainer = document.querySelector(".image-list");

const imageUrls = [
  "https://images.unsplash.com/photo-1692003133023-ff78f41813f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3NHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
  "https://images.unsplash.com/photo-1691610876953-8b20fee3352d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
  "https://images.unsplash.com/photo-1690844625344-6a3a791b8e11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
    "https://images.unsplash.com/photo-1692171295305-e84a1d62a842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
    "https://images.unsplash.com/photo-1691435006749-c9485d527d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
  "https://images.unsplash.com/photo-1691860664006-b1ef531c8743?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=700&q=60",
  "https://images.unsplash.com/photo-1691737301531-cdc02df0410b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=700&q=60",
  "https://images.unsplash.com/photo-1692085450034-3e7b05de83ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
];
let selectedImage = null;
let matrixMode = false;

function populateImageList() {
  imageUrls.forEach((url) => {
    const imgElement = document.createElement("img");
    imgElement.src = url;
    imgElement.classList.add("selectable-image");
    imgElement.addEventListener("click", () => selectImage(imgElement));
    imageListContainer.appendChild(imgElement);
  });
}
populateImageList();

//image selection
function selectImage(image) {
  mainImage.src = image.src;
}

selectableImages.forEach((image) => {
  image.addEventListener("click", () => {
    selectImage(image);
  });
});


//matrix mode array
const matrixTransformations = [
  "matrix(1.5, 0, 0, 1.5, 0, 0)",    // Enlarge the image
  "matrix(0.5, 0, 0, 0.5, 0, 0)",    // Shrink the image
  "matrix(1, -0.5, -0.5, 1, 0, 0)",  // Skew the image
  "matrix(1, 0, 0, 1, 100, 100)",    // Translate the image
 
];

let currentMatrixIndex = 0;  

// matrix mode button 
// toggleMatrixModeButton.addEventListener("click", () => {
//   matrixMode = !matrixMode;
//   if (matrixMode) {
//     // applyMatrixTransformation();
//     mainImage.classList.add("matrix-mode");
//     createGlitchEffect();
//     toggleMatrixModeButton.className = "btn btn-success";
//   } else {
//     mainImage.style.filter = "none";
//     mainImage.style.transform = "none";
//     mainImage.classList.remove("matrix-mode");
//     applyFilters();
//     removeGlitchEffect();
//     toggleMatrixModeButton.className = "btn btn-secondary";
//   }
// });

// matrix transformation
function applyMatrixTransformation() {
  mainImage.style.filter = "none";
  mainImage.style.transform = matrixTransformations[currentMatrixIndex];
  currentMatrixIndex = (currentMatrixIndex + 1) % matrixTransformations.length;
}


// glitch effect
function createGlitchEffect() {
  const glitchContainer = document.createElement("div");
  glitchContainer.classList.add("glitch-container");
  mainImage.parentElement.insertBefore(glitchContainer, mainImage);
  
  for (let i = 0; i < 4; i++) {
    const glitchLayer = document.createElement("img");
    glitchLayer.classList.add("glitch-layer");
    glitchLayer.src = mainImage.src;
    glitchContainer.appendChild(glitchLayer);
  }
}

//remove glitch effect
function removeGlitchEffect() {
  const glitchContainer = mainImage.previousElementSibling;
  if (glitchContainer && glitchContainer.classList.contains("glitch-container")) {
    glitchContainer.remove();
  }
}

//sliders
const sliders = {
  saturation: document.getElementById("saturation-slider"),
  contrast: document.getElementById("contrast-slider"),
  brightness: document.getElementById("brightness-slider"),
  hue: document.getElementById("hue-slider")
};

// filter value
const initialFilterValues = {
  saturation: 100,
  contrast: 100,
  brightness: 100,
  hue: 0
};
let currentFilterValues = { ...initialFilterValues };

// Apply filters function
function applyFilters() {
  const { saturation, contrast, brightness, hue } = currentFilterValues;
  mainImage.style.filter = `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%) hue-rotate(${hue}deg)`;
}

//sliders event listener
for (const key in sliders) {
  if (sliders.hasOwnProperty(key)) {
    sliders[key].addEventListener("input", () => {
      currentFilterValues[key] = sliders[key].value;
      applyFilters();
    });
  }
}

// Reset button
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  for (const key in sliders) {
    if (sliders.hasOwnProperty(key)) {
      sliders[key].value = initialFilterValues[key];
      currentFilterValues[key] = initialFilterValues[key];
    }
  }
  applyFilters();
});

// Download button
const downloadButton = document.getElementById("download-button");

downloadButton.addEventListener("click", () => {

  applyFilters();

  // Image element to load the modified image
  const modifiedImage = new Image();
  modifiedImage.src = mainImage.src;
  modifiedImage.crossOrigin = "anonymous"; 
  // Wait to load the img
  modifiedImage.onload = () => {
    // canvas for modified img
    const canvas = document.createElement("canvas");
    canvas.width = modifiedImage.width;
    canvas.height = modifiedImage.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = mainImage.style.filter;
    ctx.drawImage(
      modifiedImage,
      0,
      0,
      modifiedImage.width,
      modifiedImage.height
    );

    // Convert canvas content to Blob
    canvas.toBlob((blob) => {
      //downloadable link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "photo-filter.png";
      downloadButton.appendChild(downloadLink);
      downloadLink.click();
      downloadButton.removeChild(downloadLink);
    }, "image/png");
  };
});

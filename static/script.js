const wordCountInput = document.getElementById("word-count");
const wordCountDisplay = document.getElementById("word-count-display");
const generateStoryButton = document.getElementById("generate-story");
const imageUploadInput = document.getElementById("image-upload");
const imagePreviewContainer = document.getElementById("image-preview");
const storyTextContainer = document.getElementById("story-text");
const loadingIndicator = document.getElementById("loading-indicator");
const MAX_FILES = 10;

wordCountInput.addEventListener("input", function() {
    wordCountDisplay.textContent = `${this.value} words`;
});

imageUploadInput.addEventListener("change", function() {
    imagePreviewContainer.innerHTML = "";

    if (this.files.length > MAX_FILES) {
        alert(`You can upload a maximum of ${MAX_FILES} images.`);
        return;
    }

    Array.from(this.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;
            imgElement.alt = "Uploaded Image";
            imgElement.classList.add("preview-image");
            imagePreviewContainer.appendChild(imgElement);
        };
        reader.readAsDataURL(file);
    });
});

generateStoryButton.addEventListener("click", async function() {
    const wordCount = wordCountInput.value;
    const genres = Array.from(document.querySelectorAll("input[name='genre']:checked"))
                         .map(checkbox => checkbox.value);
    const images = imageUploadInput.files;

    if (images.length === 0) {
        alert("Please upload at least one image.");
        return;
    }

    if (genres.length === 0) {
        alert("Please select at least one genre.");
        return;
    }

    loadingIndicator.style.display = "block";
    storyTextContainer.textContent = "";

    const formData = new FormData();
    formData.append("wordCount", wordCount);
    formData.append("genres", genres.join(","));

    for (let image of images) {
        formData.append("images", image);
    }

    try {
        const response = await fetch("/generate-story", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        storyTextContainer.textContent = data.story || "Story could not be generated. Please try again.";
    } catch (error) {
        console.error("Error generating story:", error);
        storyTextContainer.textContent = "Error generating story. Please try again.";
    } finally {
        loadingIndicator.style.display = "none";
    }
});

const fileInput = document.querySelector('#image-input');
const previewEl = document.querySelector('#image-preview');
const placeholderEl = document.querySelector('#preview-placeholder');

let previousUrl = null;

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
        previousUrl = null;
    }

    if (file && file.type.startsWith('image/')) {
        const previewURL = URL.createObjectURL(file);
        previousUrl = previewURL;

        previewEl.src = previewURL;
        previewEl.style.display = 'block';
        placeholderEl.style.display = 'none';
    } else {
        previewEl.src = '';
        previewEl.style.display = 'none';
        placeholderEl.style.display = 'block';
    }
});
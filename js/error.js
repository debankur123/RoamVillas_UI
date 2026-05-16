function showError(message) {
    const alertBox = document.getElementById("errorAlert");
    const errorText = document.getElementById("errorMessage");
    errorText.innerText = message;
    alertBox.classList.remove("d-none");
}
function hideError() {
    const alertBox = document.getElementById("errorAlert");

    alertBox.classList.add("d-none");
}

/* SUCCESS MESSAGE */

function showSuccess(message) {
    const alertBox = document.getElementById("successAlert");
    const successText = document.getElementById("successMessage");
    successText.innerText = message;
    alertBox.classList.remove("d-none");
}
function hideSuccess() {
    const alertBox = document.getElementById("successAlert");
    alertBox.classList.add("d-none");
}

function showNoVillaMessage() {
    const block = document.getElementById("noVillaBlock");
    block.classList.remove("d-none");
}

function hideNoVillaMessage() {
    const block = document.getElementById("noVillaBlock");
    block.classList.add("d-none");
}
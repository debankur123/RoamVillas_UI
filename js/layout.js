// JavaScript source code
async function LoadLayout() {
    const navbarContainer = document.getElementById("navbarContainer");
    const response = await fetch("../html/navbar.html");
    const navbarHtml = await response.text();
    navbarContainer.innerHTML = navbarHtml;
}
LoadLayout();
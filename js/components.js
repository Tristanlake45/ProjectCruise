async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    const response = await fetch(file);

    element.innerHTML = await response.text();

}

document.addEventListener("DOMContentLoaded", () => {

    loadComponent("nav-placeholder", "components/nav.html");

    loadComponent("footer-placeholder", "components/footer.html");

});
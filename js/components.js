async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`${file} could not be loaded`);
        element.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

function setupNavigation() {
    const navLinks = document.getElementById('navlinks');
    const toggle = document.querySelector('.nav-toggle');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('#navlinks a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) link.classList.add('active');

        link.addEventListener('click', () => {
            navLinks?.classList.remove('open');
            toggle?.setAttribute('aria-expanded', 'false');
        });
    });

    toggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('open');
        const isOpen = navLinks?.classList.contains('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadComponent('nav-placeholder', 'components/nav.html'),
        loadComponent('footer-placeholder', 'components/footer.html')
    ]);

    setupNavigation();
});

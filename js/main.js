document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

    const contactForm = document.getElementById('contactForm');
    const success = document.getElementById('success');

    if (contactForm && success) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!name || !emailOk || !message) {
                alert('Please add your name, a valid sending address, and a message so we can reply.');
                return;
            }

            success.classList.add('show');
            contactForm.reset();
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
});

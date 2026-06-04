
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Responsive UI Viewport Navigation Switch Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

            // Toggle navigation tracking classes and assistive text variables
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');

            // Swap out structural text icons accessibly
            menuToggle.textContent = isExpanded ? '☰' : '✕';
        });
    }

    // 2. Client Side Aesthetics Vibe Toggle Action State 
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentVibe = htmlElement.getAttribute('data-vibe');

            if (currentVibe === 'grounded') {
                htmlElement.removeAttribute('data-vibe');
                themeBtn.textContent = 'Shift Vibe';
            } else {
                htmlElement.setAttribute('data-vibe', 'grounded');
                themeBtn.textContent = 'Restore Vibe';
            }
        });
    }
});
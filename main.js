document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (themeToggle) {
            themeToggle.innerHTML = currentTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        }
    } else {
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme') || 'dark';
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // Set Active Nav Link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Custom Theme Color Picker Logic
    const savedColor = localStorage.getItem('primary-color');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        document.documentElement.style.setProperty('--primary-hover', savedColor);
    }

    const colorPickerBtn = document.createElement('label');
    colorPickerBtn.style.cssText = 'position:fixed; bottom:30px; left:30px; z-index:100; display:flex; align-items:center; justify-content:center; width:60px; height:60px; background-color:var(--primary-color); color:white; border-radius:50%; box-shadow:0 10px 15px -3px rgba(0, 0, 0, 0.5); cursor:pointer; transition:all 0.3s ease;';
    colorPickerBtn.title = 'تغيير اللون الأساسي للموقع';
    colorPickerBtn.innerHTML = '<i class="fas fa-palette" style="font-size:24px;"></i><input type="color" style="opacity:0; width:0; height:0; position:absolute;">';
    
    document.body.appendChild(colorPickerBtn);

    const colorInput = colorPickerBtn.querySelector('input');
    colorInput.value = savedColor || '#f59e0b';

    colorInput.addEventListener('input', (e) => {
        const newColor = e.target.value;
        document.documentElement.style.setProperty('--primary-color', newColor);
        document.documentElement.style.setProperty('--primary-hover', newColor);
        colorPickerBtn.style.backgroundColor = newColor;
        localStorage.setItem('primary-color', newColor);
    });
    
    if(savedColor) colorPickerBtn.style.backgroundColor = savedColor;
    colorPickerBtn.addEventListener('mouseenter', () => colorPickerBtn.style.transform = 'scale(1.1)');
    colorPickerBtn.addEventListener('mouseleave', () => colorPickerBtn.style.transform = 'scale(1)');
});

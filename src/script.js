// ۱. تغییر تم (شب و روز) - روی هر ۳ صفحه کار می‌کند
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            html.classList.add('light');
            themeIcon.textContent = '☀️';
            document.body.style.backgroundColor = '#f9fafb';
            document.body.style.color = '#111827';
        } else {
            html.classList.remove('light');
            html.classList.add('dark');
            themeIcon.textContent = '🌙';
            document.body.style.backgroundColor = '#030305';
            document.body.style.color = '#ffffff';
        }
    });
}

// ۲. فرم تماس هوشمند - فقط در صفحه خانه (index.html) اجرا می‌شود
const contactForm = document.getElementById('contactForm');
const formContainer = document.getElementById('formContainer');

if (contactForm && formContainer) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        formContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10 gap-3 text-center">
                <div class="w-8 h-8 border-4 border-[#F47920] border-t-transparent rounded-full animate-spin"></div>
                <p class="text-xs font-semibold text-gray-400">Sending your Message...</p>
            </div>
        `;

        setTimeout(() => {
            formContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center py-6 gap-2 text-center animate-bounce">
                    <div class="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-xl text-green-500">✓</div>
                    <h4 class="text-base font-black text-green-500">Thank you, ${name}!</h4>
                    <p class="text-xs text-gray-400">Sent from <strong class="text-white">${email}</strong></p>
                </div>
            `;
        }, 1800);
    });
}
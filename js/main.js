/* ===== ТЕМА (светлая/тёмная) ===== */
(function setupThemeToggle() {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') root.dataset.theme = 'dark';

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            root.dataset.theme = root.dataset.theme === 'dark' ? '' : 'dark';
            localStorage.setItem('theme', root.dataset.theme || 'light');
        });
    }
})();

/* ===== МОДАЛКА НА СТРАНИЦЕ КОНТАКТОВ ===== */
(function setupContactModal() {
    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('contactOpenBtn');
    const form = document.getElementById('feedbackForm');

    if (!modal) return;

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            if (typeof modal.showModal === 'function') modal.showModal();
            else modal.setAttribute('open', 'open'); // на случай старых браузеров
        });
    }

    // закрытие кликом по фону (клик именно по dialog, а не его содержимому)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            // кнопка "Отмена" с method="dialog" закрывает модалку — не мешаем
        });

        const submitBtn = document.getElementById('sendBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                const data = Object.fromEntries(new FormData(form).entries());
                console.log('Данные формы:', data);
                alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');
                if (typeof modal.close === 'function') modal.close();
                form.reset();
            });
        }

        // запрет случайной отправки Enter (кроме textarea)
        form.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });
    }
})();

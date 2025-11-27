document.addEventListener("DOMContentLoaded", () => {
    console.log("Скрипт завантажено!"); 

    const url = window.location.href;

    if (url.includes("index.html") || url.endsWith("/")) {
        initFallingImages();
    }

    if (url.includes("catalog.html")) {
        console.log("Виявлено сторінку Каталог");
        initTypewriterEffect();
        initSearchLogic(); 
    }

    if (url.includes("feedback.html")) {
        initTooltip();
    }
});


function initFallingImages() {
    const header = document.querySelector('header.main-header');
    if (!header) return;

    const images = ['phone_placeholder.jpg', 'chair_placeholder.jpg']; 

    setInterval(() => {
        const img = document.createElement('img');
        img.src = images[Math.floor(Math.random() * images.length)];
        img.classList.add('falling-item');
        img.style.left = Math.random() * 90 + '%';
        img.style.width = '40px'; 
        img.style.animationDuration = Math.random() * 3 + 2 + 's';

        header.appendChild(img);

        setTimeout(() => img.remove(), 5000);
    }, 800);
}

function initTypewriterEffect() {
    const firstProductTitle = document.querySelector('.product-card h3');
    if (firstProductTitle && !firstProductTitle.querySelector('.new-label')) {
        const span = document.createElement('span');
        span.classList.add('new-label');
        firstProductTitle.appendChild(span);

        const text = " Новинка!";
        let i = 0;
        
        function type() {
            if (i < text.length) {
                span.textContent += text.charAt(i);
                i++;
                setTimeout(type, 150);
            }
        }
        type();
    }
}

function initSearchLogic() {
    const input = document.getElementById('search-input');
    const items = document.querySelectorAll('.product-card');

    if (!input) {
        console.error("Помилка: Поле #search-input не знайдено в HTML!");
        return;
    }

    console.log("Пошук ініціалізовано успішно");

    input.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase().trim();

        items.forEach(item => {
            const titleElement = item.querySelector('h3');
            if (titleElement) {
                const title = titleElement.textContent.toLowerCase();
                if (title.includes(term)) {
                    item.style.display = ''; 
                } else {
                    item.style.display = 'none'; 
                }
            }
        });
    });
}

function initTooltip() {
    const textarea = document.getElementById('details');
    if (!textarea) return;

    const tooltipText = "Ваша думка для нас важлива! Конкретизуйте мету звернення, будь ласка";
    let tooltipElem;

    textarea.addEventListener('mouseover', () => {
        textarea.classList.add('details-active');
        tooltipElem = document.createElement('div');
        tooltipElem.classList.add('custom-tooltip');
        tooltipElem.textContent = tooltipText;
        document.body.appendChild(tooltipElem);

        const rect = textarea.getBoundingClientRect();
        tooltipElem.style.top = rect.top + window.scrollY + 'px';
        tooltipElem.style.left = rect.right + 10 + 'px';
    });

    textarea.addEventListener('mouseout', () => {
        textarea.classList.remove('details-active');
        if (tooltipElem) tooltipElem.remove();
    });
}
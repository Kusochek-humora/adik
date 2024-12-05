"use strict";
document.addEventListener('DOMContentLoaded', function () {
    function startCountdown(endDate) {
        const timer = document.getElementById('timer');
        const daysSpan = document.getElementById('days');
        const hoursSpan = document.getElementById('hours');
        const minutesSpan = document.getElementById('minutes');
        const secondsSpan = document.getElementById('seconds');
    
        // Функция для выбора правильного окончания
        function getDeclension(number, one, few, many) {
            const mod10 = number % 10;
            const mod100 = number % 100;
    
            if (mod100 >= 11 && mod100 <= 14) {
                return many;
            } else if (mod10 === 1) {
                return one;
            } else if (mod10 >= 2 && mod10 <= 4) {
                return few;
            } else {
                return many;
            }
        }
    
        function updateTimer() {
            const now = new Date().getTime();
            const timeRemaining = endDate - now;
    
            if (timeRemaining > 0) {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
                // Обновляем текст с правильными окончаниями
                daysSpan.textContent = `${days} ${getDeclension(days, 'день', 'дня', 'дней')}`;
                hoursSpan.textContent = `${hours} ${getDeclension(hours, 'час', 'часа', 'часов')}`;
                minutesSpan.textContent = `${minutes} ${getDeclension(minutes, 'минута', 'минуты', 'минут')}`;
                secondsSpan.textContent = `${seconds} ${getDeclension(seconds, 'секунда', 'секунды', 'секунд')}`;
            } else {
                clearInterval(timerInterval);
                timer.innerHTML = '<span>Сбор завершён!</span>';
            }
        }
    
        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer(); // Запускаем сразу, чтобы не было задержки
    }
    
    // Задаём конечную дату (25 декабря, 23:59:59)
    const endDate = new Date('2024-12-25T23:59:59').getTime();
    startCountdown(endDate);
    const items = document.querySelectorAll(".prize__list-item");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                // Задержка появления каждого элемента
                const delay = Array.from(items).indexOf(target) * 200; // 200ms на элемент
                setTimeout(() => {
                    target.classList.add("visible");
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    items.forEach((item) => observer.observe(item));
    
});
"use strict";
document.addEventListener('DOMContentLoaded', function () {
  // Получаем элемент фото
  const photo = document.getElementById('photo');
  // Получаем аудио элемент
  const sound = document.getElementById('sound');

  // Добавляем обработчик события клика на фото
  photo.addEventListener('click', function (e) {
    // Воспроизводим звук
    sound.play();

    // Функция для создания цветочков
    function createFlower(event) {
      const container = document.querySelector('.photo');
      const flower = document.createElement('div');
      flower.classList.add('flower');

      // Позиционируем цветочек в месте клика
      const x = event.clientX - container.offsetLeft - 25;
      const y = event.clientY - container.offsetTop - 25;

      flower.style.left = `${x}px`;
      flower.style.top = `${y}px`;

      // Добавляем цветочек в контейнер
      container.appendChild(flower);

      // Удаляем цветочек после завершения анимации
      setTimeout(() => {
        flower.remove();
      }, 3000); // через 3 секунды
    }

    // Создаем цветочек при клике
    createFlower(e);
  });
  document.querySelectorAll('.prize-list li').forEach((item) => {
    item.addEventListener('click', () => {
      const amount = item.getAttribute('data-amount');
      alert(`Вы выбрали донат на сумму ${amount} тенге!`);
    });
  });
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
      // Получаем значение из data-code атрибута
      const textToCopy = button.getAttribute('data-code');
      
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          // Воспроизводим звук после копирования
          // const audio = document.getElementById('sound-2');
          // audio.play(); // Воспроизведение звука
  
          alert(`Скопировано: ${textToCopy}`);
        })
        .catch(err => {
          console.error('Ошибка при копировании текста: ', err);
        });
    });
  });
});

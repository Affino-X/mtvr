
const mainSwiper = new Swiper('.slider', {
  loop: true,
  autoplay: {
    delay: 3000,
  },
});

// Второй слайдер
const personalSwiper = new Swiper('.personal-slider', {
  loop: true,
  autoplay: {
    delay: 3000,
  },
  slidesPerView: 4,
  spaceBetween: 20,
});



document.addEventListener("DOMContentLoaded", function () {
  const serviceItems = document.querySelectorAll(".about-services__item");
  const showMoreButton = document.getElementById("show-more");
  let isExpanded = false;
  const itemsToShow = 6;

  // Скрываем все элементы, кроме первых 6
  serviceItems.forEach((item, index) => {
      if (index >= itemsToShow) {
          item.style.display = "none";
      }
  });

  showMoreButton.addEventListener("click", function () {
      isExpanded = !isExpanded;
      
      serviceItems.forEach((item, index) => {
          if (index >= itemsToShow) {
              item.style.display = isExpanded ? "block" : "none";
          }
      });

      showMoreButton.querySelector("span").textContent = isExpanded ? "Скрыть услуги" : "Больше услуг";
  });
});



// staff button
function handleActiveButton(containerSelector, buttonSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return; // Проверка на существование контейнера

  const buttons = container.querySelectorAll(buttonSelector);

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active')); // Убираем `active`
      button.classList.add('active'); // Добавляем `active` на кликнутую кнопку
    });
  });
}

handleActiveButton('.staff__buttons', '.staff__button');




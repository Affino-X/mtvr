document.addEventListener("DOMContentLoaded", function () {
  // Главный слайдер
  const mainSlider = document.querySelector(".slider");
  if (mainSlider) {
    new Swiper(mainSlider, {
      loop: true,
      autoplay: {
        delay: 3000,
      },
    });
  }

  // Второй слайдер (персональный)
  const personalSlider = document.querySelector(".personal-slider");
  if (personalSlider) {
    new Swiper(personalSlider, {
      loop: true,
      autoplay: {
        delay: 3000,
      },
      spaceBetween: 20,
      slidesPerView: 1, // По умолчанию 1 слайд для мобильных (ниже 480px)
      breakpoints: {
        480: { slidesPerView: 2 }, // Телефоны (от 480px)
        768: { slidesPerView: 3 }, // Планшеты (от 768px)
        1280: { slidesPerView: 4 }, // ПК (от 1280px)
      },
    });
  }

  // Кнопка "Показать больше" в блоке услуг
  const serviceItems = document.querySelectorAll(".about-services__item");
  const showMoreButton = document.getElementById("show-more");

  if (serviceItems.length > 0 && showMoreButton) {
    let isExpanded = false;
    const itemsToShow = 6;

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

      showMoreButton.querySelector("span").textContent = isExpanded
        ? "Скрыть услуги"
        : "Больше услуг";
    });
  }

  // Обработка активной кнопки в блоке staff
  function handleActiveButton(containerSelector, buttonSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return; // Проверка на существование контейнера

    const buttons = container.querySelectorAll(buttonSelector);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active")); // Убираем `active`
        button.classList.add("active"); // Добавляем `active` на кликнутую кнопку
      });
    });
  }

  handleActiveButton(".staff__buttons", ".staff__button");

  // Маска для телефона
  const phoneInput = document.getElementById("form-phone");
  if (phoneInput) {
    IMask(phoneInput, {
      mask: "8 (000) 000-00-00",
    });
  }

  // Валидация форм
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", function () {
      this.setCustomValidity("");
    });

    input.addEventListener("invalid", function () {
      this.setCustomValidity("");

      if (this.validity.valueMissing) {
        this.setCustomValidity("Пожалуйста, заполните это поле.");
      }
      if (this.validity.typeMismatch) {
        this.setCustomValidity("Пожалуйста, введите данные корректного типа.");
      }
      if (this.validity.patternMismatch) {
        this.setCustomValidity("Пожалуйста, используйте правильный формат.");
      }
    });
  });
});

//

const quizData = [
  {
    question: "Как часто вы проходите медицинское обследование?",
    answers: ["Раз в год", "Реже, чем раз в 5 лет", "Никогда не проходил"],
  },
  {
    question: "Как вы оцениваете свое самочувствие?",
    answers: [
      "Чувствую себя отлично",
      "Часто ощущаю усталость",
      "Часто чувствую усталость и недомогание",
    ],
  },
  {
    question: "Что вы ожидаете получить в медицинском обследовании?",
    answers: [
      "Узнать о состоянии здоровья",
      "Получить рекомендации врача",
      "Пройти комплексную диагностику",
    ],
  },
];

let currentStep = 0;

function renderStep() {
  const questionElement = document.querySelector(".spring-quiz__question p");
  const answersContainer = document.querySelector(".spring-quiz__answers");
  const steps = document.querySelectorAll(".spring-quiz__step");

  if (!questionElement || !answersContainer || !steps.length) return;

  questionElement.textContent = quizData[currentStep]?.question || "";

  answersContainer.innerHTML = "";

  if (quizData[currentStep]?.answers) {
    quizData[currentStep].answers.forEach((answer, index) => {
      const label = document.createElement("label");
      label.classList.add("spring-quiz__answer");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${currentStep}`;
      input.value = answer;
      if (index === 0) input.checked = true; // Первый вариант всегда выбран

      const span = document.createElement("span");
      span.classList.add("spring-quiz__radio-text");
      span.textContent = answer;

      label.appendChild(input);
      label.appendChild(span);
      answersContainer.appendChild(label);
    });
  }

  steps.forEach((step, index) => {
    step.classList.remove("completed", "active", "upcoming");
    if (index < currentStep) {
      step.classList.add("completed");
    } else if (index === currentStep) {
      step.classList.add("active");
    } else {
      step.classList.add("upcoming");
    }
  });
}

const quizButton = document.querySelector(".spring-quiz__button");

if (quizButton) {
  quizButton.addEventListener("click", () => {
    if (currentStep < quizData.length - 1) {
      currentStep++;
      renderStep();
    } else {
      const quizContainer = document.querySelector(".spring-quiz__container");

      if (quizContainer) {
        quizContainer.innerHTML = `
          <div class="spring-quiz__content"> 
            <div class="spring-quiz__final">
              <div class="spring-quiz__header">
                <h2 class="spring-quiz__title">Отлично! Укажите номер телефона, <br> к которому мы закрепим скидку.</h2>
              </div>
              <div class="spring-quiz__field">
                <label class="spring-quiz__label">Укажите актуальный номер телефона:</label>
                <input class="spring-quiz__input" id="quiz-phone" type="tel" 
                placeholder="+8 (___) ___-__-__"
                maxlength="20"
                pattern="8 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}"
                required
                /> 
              </div>
            </div> 
          </div>
          <button type="submit" class="spring-quiz__button" id="quizButton">
            <span>Закрепить скидку</span>
            <img src="./assets/images/arrow_right.svg" alt="arrow"/>
          </button>
        `;

        const phoneInput = document.getElementById("quiz-phone");
        if (phoneInput) {
          IMask(phoneInput, {
            mask: "8 (000) 000-00-00",
          });
        }
      }
    }
  });
}

renderStep();

function toggleModal(modalId, buttonClass) {
  const modal = document.getElementById(modalId);
  const buttons = document.querySelectorAll(`.${buttonClass}`);

  if (!modal || buttons.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Отключаем стандартный переход по ссылке
      modal.classList.toggle("hidden");
    });
  });

  // Закрытие модального окна при клике вне контента
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
}

// Использование
toggleModal("appointment-modal", "open-appointment-modal");
toggleModal("spring-quiz", "open-spring-quiz");

// hamburger

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuOpen = document.querySelector(".menu-toggle__open");
  const menuClose = document.querySelector(".menu-toggle__close");
  const hamburgerMenu = document.querySelector(".hamburger-menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpenVisible = getComputedStyle(menuOpen).display !== "none";

      if (isOpenVisible) {
        menuOpen.style.display = "none";
        menuClose.style.display = "block";
        hamburgerMenu.classList.remove("collapsed");
      } else {
        menuOpen.style.display = "block";
        menuClose.style.display = "none";
        hamburgerMenu.classList.add("collapsed");
      }
    });
  }
});

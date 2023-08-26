export function customSelect () {
    // Custom dropdown
    const customDropdownsWrapper = document.querySelectorAll("[data-dropdown-wrapper]");
    
    // Проверка, есть ли вообще обертки кастомных dropdown'ов на странице
    if (customDropdownsWrapper.length > 0) {
        customDropdownsWrapper.forEach(function (customDropdownWrapper) {
            const customDropdownButton = customDropdownWrapper.querySelector("[data-dropdown-button]");
            const customDropdownText = customDropdownWrapper.querySelector("[data-dropdown-text]");
            const customDropdownList = customDropdownWrapper.querySelector("[data-dropdown-list]");
            const customDropdownItems = customDropdownWrapper.querySelectorAll("[data-dropdown-item]");
    
            console.log(customDropdownButton.dataset.dropdownButton);
    
            // Открытие выпадающего списка
            customDropdownButton.addEventListener('click', function () {
                customDropdownList.classList.toggle('dropdown-list--active');
                this.classList.toggle('dropdown--active');
            });
    
            if (customDropdownButton.dataset.dropdownButton === "custom-select") {
                // Получить текст первого значения из выпадающего списка
                const dropdownFirstItem = customDropdownItems[0].innerHTML;
                customDropdownText.innerHTML = dropdownFirstItem; 
    
                // Записывать текст первого значения в текст кнопки
                customDropdownItems.forEach(function (customDropdownItem) {
                    customDropdownItem.addEventListener('click', function (e) {
                        const dropdownItemText = customDropdownItem.innerHTML;
                        customDropdownText.innerHTML = dropdownItemText;
                        customDropdownList.classList.remove('dropdown-list--active');
                        customDropdownButton.classList.remove('dropdown--active');
                    });
                });
            }
    
            // Записывать текст первого значения в текст кнопки
            customDropdownItems.forEach(function (customDropdownItem) {
                customDropdownItem.addEventListener('click', function (e) {
                    e.stopPropagation();
                });
            });
    
            window.addEventListener('click', function (e) {
                const target = e.target;
    
                if (target !== customDropdownButton) {
                    customDropdownList.classList.remove('dropdown-list--active');
                    customDropdownButton.classList.remove('dropdown--active');
                }
            });

            customDropdownButton.addEventListener('keydown', function (e) {
                if (e.key === 'Tab' || e.key === "Escape") {
                    customDropdownList.classList.toggle('dropdown-list--active');
                    this.classList.toggle('dropdown--active');
                }
            });
        });
    }
}

export function digitalNumber () {
    // Numbers counter
    window.addEventListener("load", windowLoad);

    function windowLoad() {
        function digitsCountersInit(digitsCountersItems) {
            let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
            if (digitsCounters) {
                digitsCounters.forEach(digitsCounters => {
                    digitsCountersAnimate(digitsCounters);
                });
            }
        }
        function digitsCountersAnimate(digitsCounter) {
            let startTimestamp = null;
            const duration = parseInt(digitsCounter.dataset.digitsCounters) ? parseInt(digitsCounter.dataset.digitsCounters) : 1350;
            const startValue = parseInt(digitsCounter.innerHTML);
            const startPosition = 0;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        let options = {
            threshold: 0.4
        }
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetElement = entry.target;
                    const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
                    if (digitsCountersItems.length) {
                        digitsCountersInit(digitsCountersItems);
                    }
                    observer.unobserve(targetElement);
                }
            });
        }, options);

        let sections = document.querySelectorAll('main>section');
        if (sections.length) {
            sections.forEach(section => {
                observer.observe(section);
                console.log(section);
            });
        }
    }
}
// Аккордеоны
const accordions = document.getElementsByClassName("polls-accordion");
const activePolls = document.querySelector('.polls-panel.polls-active');
const nonActivePolls = document.querySelector('.polls-panel.polls-inactive');
for (let i = 0; i < accordions.length; i++) {
	accordions[i].addEventListener("click", function () {
		this.classList.toggle("active");
		this.querySelector('svg').classList.toggle("active");
		var section = this.nextElementSibling;
		if (section.style.maxHeight) {
			section.style.maxHeight = null;
		} else {
			section.style.maxHeight = section.scrollHeight + "px";
		}
	});
}


// Фильтр по статусу
const statusButton = document.querySelector('#polls-status');
const statusPopup = document.querySelector('#polls-status__popup');

statusButton.addEventListener('click', e => {
	e.stopPropagation();
	statusPopup.classList.toggle('active');
});
document.addEventListener('click', e => {
	let target = e.target;
	let its_menu = target == statusPopup || statusPopup.contains(target);
	let its_button = target == statusButton;
	let menu_is_active = statusPopup.classList.contains('active');

	if (!its_menu && !its_button && menu_is_active) {
		statusPopup.classList.remove('active');
	}
});



// Фильтр по активности
const statusButtonActive = document.querySelector('#polls-status__active');
const statusButtonNonActive = document.querySelector('#polls-status__non-active');


function makeActiveActive() {
	activePolls.style.display = 'block';
	accordions[0].style.display = 'block';
	if (!accordions[0].classList.contains('active')) {
		accordions[0].click();
	}
};

statusButtonActive.addEventListener('click', function () {
	statusButton.innerHTML = statusButtonActive.innerHTML;
	accordions[1].style.display = 'none';
	nonActivePolls.style.display = 'none';

	makeActiveActive();

	let newCount = activePolls.querySelectorAll('a').length;
	document.querySelector('.polls-count').innerHTML = `Найдено ${newCount} записей`;
});

statusButtonNonActive.addEventListener('click', function () {
	statusButton.innerHTML = statusButtonNonActive.innerHTML;
	accordions[0].style.display = 'none';
	activePolls.style.display = 'none';

	nonActivePolls.style.display = 'block';
	accordions[1].style.display = 'block';
	if (!accordions[1].classList.contains('active')) {
		accordions[1].click();
	}

	let newCount = nonActivePolls.querySelectorAll('a').length;
	document.querySelector('.polls-count').innerHTML = `Найдено ${newCount} записей`;
});

makeActiveActive(); // Первоначальное открывание активных заявок

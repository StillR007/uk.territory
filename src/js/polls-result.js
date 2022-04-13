document.addEventListener('DOMContentLoaded', function () {
	const countNode = document.querySelectorAll('.answer__count');

	if (countNode) {
		const counts = [...countNode];

		counts.forEach(count => {
			if (Number(count.innerText) > 0) {
				let closestAnswer = count.closest('.answer');
				let AnswerBar = closestAnswer.querySelector('.answer__answer');
				AnswerBar.classList.add('color');
			}
		});
	}
}, false);



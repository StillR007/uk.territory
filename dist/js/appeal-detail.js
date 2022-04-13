function showPopup(event) {
	event.preventDefault();

	document.querySelector('.form-container').classList.add('active');
	document.querySelector('body').classList.add('lock');

	document.querySelector('#close-form').addEventListener('click', function () {
		document.querySelector('.form-container').classList.remove('active');
		document.querySelector('body').classList.remove('lock');
	});

	const starsNode = document.querySelector('.form-stars').querySelectorAll('svg');
	const stars = [...starsNode];

	stars.forEach(star => {
		star.addEventListener("click", function () {
			while (document.querySelector('.form-stars').querySelector('svg.checked')) {
				document.querySelector('.form-stars').querySelector('svg.checked').classList.remove('checked');
			}
			let index = stars.indexOf(star);
			for (let i = 0; i <= index; i++) {
				stars[i].classList.add('checked');
			}
			document.querySelector('#appeal-rating').setAttribute('value', `${index + 1}`);
		});
	});
}

function sendComment() {
	function closeModal() {
		document.querySelector('.form-container').classList.remove('active');
		document.querySelector('body').classList.remove('lock');
	}

	BX.showWait();
	let raiting = document.querySelector('#appeal-rating').value;
	let comment = document.querySelector('#appeal-comment').value;
	let elementId = document.querySelector('#appeal-id').value;
	$.ajax({
		type: "POST",
		url: '/rest/requests/addFeedback.ajax.php',
		cache: false,
		data: {
			"raiting": raiting,
			"comment": comment,
			"elementId": elementId,
		},
		dataType: "json",
		success: function (res) {
			if (res['data'] && res['code'] == 200) {
				let alert = alertify.alert('Спасибо', 'Ваш отзыв принят');
				alert.set('onok', function () {
					closeModal();
					location.reload();
				});
			}
		},

		error: function (err) {
			let alert = alertify.alert('ВНИМАНИЕ', 'Ошибка отправки запроса!');
			alert.set('onok', function () {
				console.log(err);
				closeModal();
			});
		},

		complete: function () {
			BX.closeWait();
			closeModal();
			location.reload();
		}
	});
}

document.querySelector('#post-comment').addEventListener("click", showPopup);
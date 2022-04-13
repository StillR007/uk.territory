const getUserUrl = '/rest/requests/getUserRequest.ajax.php';
const licId = document.querySelector('#lic-id').innerText;
const main = document.querySelector('.appeals-container');
let data = {
	licId: licId
}

function convertDateToReadable(unrDate) {
	let dateObj = new Date(unrDate);
	let options = { day: '2-digit', month: 'long', year: 'numeric' }
	return dateObj.toLocaleString('ru-RU', options);
}
function appealGetStatus(stage) {
	switch (stage) {
		case 'NEW':
			return 'red';
		case '1':
			return 'blue';
		case 'WON':
			return 'gray';
		case 'LOSE':
			return 'gray';
	}
}
function getRatingStars(rating) {
	let stars = document.createElement('div');
	stars.className = 'stars';
	for (let i = 0; i < rating; i++) {
		stars.insertAdjacentHTML("afterbegin", '<svg class="checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19"><path d="M9.8 15l-5.76 3.09 1.1-6.545L.48 6.91l6.44-.955L9.8 0l2.88 5.955 6.44.955-4.66 4.635 1.1 6.545z"></path></svg>');
	}
	if (rating === 5) {
		return stars
	} else {
		for (let i = 0; i < (5 - rating); i++) {
			stars.insertAdjacentHTML("beforeend", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19"><path d="M9.8 15l-5.76 3.09 1.1-6.545L.48 6.91l6.44-.955L9.8 0l2.88 5.955 6.44.955-4.66 4.635 1.1 6.545z"></path></svg>');
		}
	}

	return stars
}



function clearResults() {
	statusButtonText.innerText = 'Статус';

	dateTo.setAttribute('value', '');
	dateTo.innerText = '';
	dateTo.removeAttribute('min');

	dateFrom.setAttribute('value', '');
	dateFrom.innerText = '';
	dateFrom.removeAttribute('max');

	dateInnerText.innerText = 'Период';


	appealSearchBtnText.innerText = 'Поиск';
	appealSearch.setAttribute('value', '');

	data = {
		licId: licId
	}
}

function noAppealResult() {
	totalAppeals.innerText = '0';
	/* document.querySelector('.appeals-data').style.display = 'none';

	let result = document.createElement('h1');
	let text = document.createElement('p');

	if (document.querySelector('#appeals-delete')) {
		result.innerText = 'К сожалению, ничего не найдено!';
		text.innerHTML = 'Попробуйте уточнить запрос.';
	} else {
		result.innerText = 'У вас пока нет заявок';
		text.innerHTML = 'В этом разделе будут собираться «Обращения» и «Услуги УК»';
	}


	main.append(result);
	main.append(text); */
}

function showDeleteIcon() {
	if (!document.querySelector('#appeals-delete')) {
		let button = document.createElement('button');
		button.className = 'appeals-buttons__button appeals-buttons__button--text';
		button.id = 'appeals-delete';
		button.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" class="cache-0"><path d="M20 5a1 1 0 010 2h-.269l-1.784 13.267a2 2 0 01-1.825 1.727l-.157.006h-7.93a1.998 1.998 0 01-1.982-1.733L4.269 7H4a1 1 0 010-2h16zm-2.287 2H6.287l1.748 13h7.93l1.748-13zM12 9a1 1 0 011 1v7a1 1 0 01-2 0v-7a1 1 0 011-1zm2-7a1 1 0 010 2h-4a1 1 0 010-2h4z"></path></svg>';
		document.querySelector('.appeals-buttons').append(button);

		button.addEventListener('click', () => {
			clearResults();
			appealsAjax(data);
			button.remove();
		})
	}
}


const appealSelect = document.querySelector('#appeal-select');



function getAppeals(res) {
	if (document.querySelector('.appeals-main.active')) {
		let presentResult = document.querySelectorAll('.appeals-main.active');
		[...presentResult].forEach(result => result.remove())
	}
	if (res.code && res.code == "200" && res.data.items.length > 0) {
		totalAppeals.innerText = res.data.total;

		const items = res.data.items;
		items.forEach(appealData => {
			const appeal = document.createElement('a');
			appeal.className = 'appeals-main active';
			appeal.href = `/appeals2/${appealData.ID}/`;


			const column1 = document.createElement('div');
			column1.className = 'appeals-main__column-1';
			const column2 = document.createElement('div');
			column2.className = 'appeals-main__column-2';
			const column3 = document.createElement('div');
			column3.className = 'appeals-main__column-3';
			const column4 = document.createElement('div');
			column4.className = 'appeals-main__column-4';
			const column5 = document.createElement('div');
			column5.className = 'appeals-main__column-5';


			column1.insertAdjacentHTML("afterbegin", `<p class="appeals-main__number">${appealData.ID}</p>`);
			column1.insertAdjacentHTML("beforeend", `<time datetime="${appealData.DATE_CREATE}">${convertDateToReadable(appealData.DATE_CREATE)}</time>`);

			column2.insertAdjacentHTML("afterbegin", `<p>${appealData.SUBJECT}</p>`);

			column3.insertAdjacentHTML("afterbegin", `<p>${appealData.PRICE}</p>`);

			column4.insertAdjacentHTML("afterbegin", `<p><span class="appeals-status-circle ${appealGetStatus(appealData.STAGE)}"></span>${appealData.STATUS}</p>`);
			column4.insertAdjacentHTML("beforeend", `<time datetime="${appealData.DATE_UPDATE}">${convertDateToReadable(appealData.DATE_UPDATE)}</time>`);

			if (appealData.STAGE === "WON") {
				if (appealData.RATING !== 0) {
					column5.append(getRatingStars(appealData.RATING));
				} else {
					column5.insertAdjacentHTML("afterbegin", `<button class="btn btn-territory btn-round-left post-comment">Оценить услугу</button>`);
				}
			}

			appeal.append(column1);
			appeal.append(column2);
			appeal.append(column3);
			appeal.append(column4);
			appeal.append(column5);

			main.append(appeal);
		});
	} else {
		noAppealResult();
	}
}

const totalAppeals = document.querySelector('.appeals-count>span');


function appealsAjax(data) {
	$.ajax({
		type: "POST",
		url: getUserUrl,
		data: data,
		success: function (res) {
			getAppeals(res)
		},
		error: function (err) {
			console.log(err);
			noAppealResult();
		}
	});
}

appealsAjax(data);
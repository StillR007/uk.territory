const statusButton = document.querySelector('#appeals-status');
const statusButtonText = document.querySelector('#appeals-status--text');
const statusPopup = document.querySelector('#appeals-status__popup');

statusButtonText.addEventListener('click', e => {
	statusPopup.classList.add('active');
});
document.addEventListener('click', e => {
	let target = e.target;
	let its_button = target == statusButtonText;
	let menu_is_active = statusPopup.classList.contains('active');
	if (!its_button) {
		statusPopup.classList.remove('active');
	}
});

const stNew = document.querySelector('#appeals-status--new');
const stWork = document.querySelector('#appeals-status--work');
const stStop = document.querySelector('#appeals-status--stop');
const stDone = document.querySelector('#appeals-status--done');
const stCancel = document.querySelector('#appeals-status--cancel');


function sendAjax(query, button) {
	statusButtonText.innerText = button;

	showDeleteIcon();

	let convertedQuery;
	switch (query) {
		case 'Новая':
			convertedQuery = 'NEW';
			break;
		case 'В работе':
			convertedQuery = '1';
			break;
		case 'Выполнена':
			convertedQuery = 'WON';
			break;
		case 'Отменена':
			convertedQuery = 'LOSE';
			break;
		case 'Приостановлена':
			/////////convertedQuery = 'LOSE';////////
			break;
	}
	data.status = convertedQuery;

	appealsAjax(data);
}

const popupInnerVars = document.querySelectorAll('.appeals-status__popup--inner');
[...popupInnerVars].forEach(innerElem => {
	innerElem.addEventListener('click', function () {
		statusPopup.classList.remove('active');
		sendAjax(innerElem.innerHTML, innerElem.innerText);
	});
})
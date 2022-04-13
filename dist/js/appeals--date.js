// Фильтр по дате
const dateInput = document.querySelector('#appeals-period');
const dateLabel = document.querySelector('#date-label');
const dateInnerText = document.querySelector('#appeals-period--text');
const dateFrom = document.querySelector('#date-from');
const dateTo = document.querySelector('#date-to');


/////////////dateTo.setAttribute('max', new Date());//////////////////

function closeDatePicker() {
	dateLabel.classList.remove('active');
	dateInput.classList.remove('active');
	dateFrom.classList.remove('active');
	dateTo.classList.remove('active');
};

let dateFromSpan, dateToSpan;
let dateFromObj, dateToObj;

function insertValues() {
	dateInnerText.innerText = '';

	if (dateFrom.value && !dateTo.value) {
		closeDatePicker();
		dateInnerText.innerText = `с ${new Date(dateFrom.value).toLocaleDateString()}`;

		let dateFromSplit = new Date(dateFrom.value).toLocaleDateString().split('.');
		let dateFromSend = dateFromSplit.reverse().join('-');

		data.dateFrom = dateFromSend;
		appealsAjax(data);

		return
	} else if (!dateFrom.value && dateTo.value) {
		closeDatePicker();
		dateInnerText.innerText = `по ${new Date(dateTo.value).toLocaleDateString()}`;

		let dateToSplit = new Date(dateTo.value).toLocaleDateString().split('.');
		let dateToSend = dateToSplit.reverse().join('-');

		data.dateTo = dateToSend;
		appealsAjax(data);

		return
	} else if (dateFrom.value && dateTo.value) {
		closeDatePicker();
		dateInnerText.innerText = `с ${new Date(dateFrom.value).toLocaleDateString()} по ${new Date(dateTo.value).toLocaleDateString()}`;

		let dateFromSplit = new Date(dateFrom.value).toLocaleDateString().split('.');
		let dateFromSend = dateFromSplit.reverse().join('-');
		let dateToSplit = new Date(dateTo.value).toLocaleDateString().split('.');
		let dateToSend = dateToSplit.reverse().join('-');


		data.dateTo = dateToSend;
		data.dateFrom = dateFromSend;

		appealsAjax(data);

		return
	} else if (!dateFrom.value && !dateTo.value) {
		closeDatePicker();
		dateInnerText.innerText = 'Период';
		return
	}
};

document.addEventListener('click', e => {
	let target = e.target;

	let itsDateFrom = target == dateFrom;
	let itsDateTo = target == dateTo;
	let itsDateLabel = target == dateLabel;
	let isdateInnerText = target == dateInnerText;

	if (!(itsDateFrom || itsDateTo || itsDateLabel || isdateInnerText)) {
		dateLabel.classList.remove('active');
		dateFrom.classList.remove('active');
		dateTo.classList.remove('active');
		dateInput.classList.remove('active');
	}
});

dateInput.addEventListener('click', function () {
	this.classList.add('active');
	dateLabel.classList.add('active');
	dateFrom.classList.add('active');
	dateTo.classList.add('active');
});


dateFrom.addEventListener('change', function () {
	dateTo.setAttribute('min', dateFrom.value);
	insertValues();
	showDeleteIcon();
});
dateTo.addEventListener('change', function () {
	dateFrom.setAttribute('max', dateTo.value);
	insertValues();
	showDeleteIcon();
});


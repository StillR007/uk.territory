const allBtnsNode = document.querySelectorAll('.btn.btn-territory.btn-round-left');
const allBtns = [...allBtnsNode];

const licId = document.querySelector('#lic-id').innerText;

const popup = document.querySelector('#meters-popup');

const ipuType = document.querySelector('#ipu-type');
const ipuNum = document.querySelector('#ipu-num');
const ipuZone = document.querySelector('#ipu-zone');
const ipuDate = document.querySelector('#ipu-date');


const input = document.querySelector('#ipu-meter');
const errorField = document.querySelector('#error-field');


const sendBtn = document.querySelector('#meter-send');



const sendMeterUrl = '/include/api/meters/addReadingsIpuForLic.ajax.php';


function insertPopupValues(type, num, date, minValue, zone) {
	ipuType.setAttribute('value', `${type}`);
	ipuNum.setAttribute('value', `${num}`);
	ipuZone.setAttribute('value', `${zone}`);
	ipuDate.setAttribute('value', `${date}`);

	input.setAttribute('placeholder', `min: ${minValue}`);
	input.setAttribute('min', `${minValue}`);
}


function inputCheck() {
	if (!input.value) {
		errorField.textContent = 'Введите значение счётчика';
		input.style.border = "1px solid red";
		sendBtn.setAttribute('disabled', 'disabled');
		return false
	} else if (Number(input.value) < Number(input.getAttribute('min'))) {
		errorField.textContent = 'Значение ниже допустимого';
		input.style.border = "1px solid red";
		sendBtn.setAttribute('disabled', 'disabled');
		return false
	} else {
		input.style.border = "1px solid #dde3e8";
		errorField.textContent = '';
		sendBtn.removeAttribute('disabled');
		return true
	}
}


function showPopup(btn, index) {
	popup.classList.add('active');
	input.value = "";
	input.innerText = '';


	input.addEventListener("input", inputCheck);
	input.addEventListener("focus", inputCheck);
	input.addEventListener("blur", inputCheck);
	input.addEventListener("keydown", inputCheck);
	input.addEventListener("keyup", inputCheck);
};


let date = new Date();
let yyyy = date.getFullYear();
let mm = date.getMonth() + 1; // Months start at 0!
let dd = date.getDate();
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
let today = dd + '.' + mm + '.' + yyyy;

allBtns.forEach((btn, index) => {
	// удалить!!!!
	btn.removeAttribute('disabled');
	// удалить!!!!


	/* 	////////
			if (20 <= dd <= 25) {
				btn.removeAttribute('disabled');
			}
			//////// */

	btn.addEventListener('click', function () {
		document.querySelector('body').classList.add('lock');



		let meters = this.closest('.meters');

		let minValue = this.getAttribute('data-min');
		let zone = this.getAttribute('data-zone');
		let name = this.getAttribute('data-name');


		let closestNamePrev = this.closest('.meters__right-column');
		let closestName = closestNamePrev.querySelector('.meters__name').innerText;
		let onlyNumbers = closestName.replace('Счётчик ', '');

		insertPopupValues(name, String(onlyNumbers), today, minValue, zone);

		showPopup(this, index);
	})
});


function closePopup() {
	popup.classList.remove('active');
	document.querySelector('body').classList.remove('lock');


	input.style.border = "1px solid #dde3e8";
	errorField.textContent = '';
	input.value = '';

	sendBtn.setAttribute('disabled', 'disabled');
}


document.querySelector('#close-form').addEventListener('click', function () {
	closePopup();
});

function showResultPopup(status) {
	document.querySelector('body').classList.add('lock');

	let result = document.createElement('div');
	result.id = 'result-popup';
	result.className = 'active';

	let popup = document.createElement('popup');

	let button = document.createElement('button');
	button.className = 'btn btn-territory btn-round-right spec-btn-secr';


	let p = document.createElement('p');
	if (status === 'ok') {
		p.innerText = 'Данные успешно отправлены!';
		button.innerText = 'Хорошо';
	} else {
		p.innerText = 'Данные не отправлены!';
		button.innerText = 'Жаль(';
	}

	popup.append(p);
	popup.append(button);


	result.append(popup);

	document.querySelector('body').append(result);



	button.addEventListener('click', function () {
		location.reload();
	})
}

sendBtn.addEventListener('click', () => {
	BX.showWait();
	$.ajax({
		type: "POST",
		url: sendMeterUrl,
		data: {
			licId: `${licId}`,
			data: `${input.value}`,
			ipuName: `${ipuType.value}`,
			ipuNum: `${ipuNum.value}`,
			ipuZone: `${ipuZone.value}`,
			ipuDate: `${ipuDate.value}`,
		},
		success: function (res) {
			if (res.code && res.code == "200") {
				//console.log(data);
				closePopup();
				showResultPopup('ok');
			} else {
				console.log(data);
				closePopup();
				showResultPopup();
			}
		},
		error: function (err) {
			//console.log(data);
			console.log(err);
			closePopup();
			showResultPopup();
		},
		complete: function () {
			BX.closeWait();
		}
	});
});
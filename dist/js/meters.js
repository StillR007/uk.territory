const metersUpdatesNode = document.querySelectorAll('.meters__last-update');
const metersUpdates = [...metersUpdatesNode];

const metersItemsNode = document.querySelectorAll('.meters__items');
const metersItems = [...metersItemsNode];


function updateDates(date, index) {
	if (date) {
		metersUpdates[index].innerHTML = `Последняя передача:<br />${date}`;
	}
}

let maxMeters = [];
function getMonth(monthNumber) {
	switch (monthNumber) {
		case 'янв':
			return 'январь';
		case 'фев':
			return 'февраль';
		case 'мар':
			return 'март';
		case 'апр':
			return 'апрель';
		case 'май':
			return 'май';
		case 'июн':
			return 'июнь';
		case 'июл':
			return 'июль';
		case 'авг':
			return 'август';
		case 'сен':
			return 'сентябрь';
		case 'окт':
			return 'октябрь';
		case 'ноя':
			return 'ноябрь';
		case 'дек':
			return 'декабрь';
	}
}

function showMeters(res, index) {
	console.log(res);
	if (res.code == "200" && res.data.history) {
		let deltas = [];
		let rects = [];

		let maxIPU = [];
		for (let [monthNumber, value] of Object.entries(res.data.history)) {
			let meter = value.meter;
			let delta = value.delta;
			let date = value.date;


			updateDates(date, index);


			let metersNumber = document.createElement('p');
			metersNumber.className = 'meters__item--number';
			if (delta) {
				metersNumber.innerText = delta;
				deltas.push(delta);
			} else {
				deltas.push(0)
			}

			let meterItem = document.createElement('div');
			meterItem.className = 'meters__item';

			let metersRect = document.createElement('p');
			metersRect.className = 'meters__item--rect';

			let metersMonth = document.createElement('p');
			metersMonth.className = 'meters__item--month';
			metersMonth.innerText = monthNumber;

			maxIPU.push(meter);
			rects.push(metersRect);


			let meterPopup = document.createElement('div');
			meterPopup.className = 'meters__item-popup';

			let meterPopupMonth = document.createElement('div');
			meterPopupMonth.className = 'meters__item-popup--bold';
			meterPopupMonth.innerText = getMonth(monthNumber);

			let meterPopupDate = document.createElement('p');
			meterPopupDate.innerText = `${date}`;

			let meterPopupDelta = document.createElement('p');
			meterPopupDelta.innerText = `расход: ${delta}`;

			let meterPopupAll = document.createElement('p');
			meterPopupAll.innerText = `всего: ${meter}`;

			metersRect.addEventListener('mouseover', () => {
				let par = metersRect.closest('.meters__item');
				par.classList.add('active');
			})

			metersRect.addEventListener('mouseout', () => {
				let par = metersRect.closest('.meters__item');
				par.classList.remove('active');
			})



			meterPopup.append(meterPopupMonth);
			meterPopup.append(meterPopupDate);
			meterPopup.append(meterPopupAll);
			meterPopup.append(meterPopupDelta);

			//
			metersRect.append(meterPopup);
			//

			meterItem.append(metersNumber);
			meterItem.append(metersRect);

			meterItem.append(metersMonth);


			metersItems[index].append(meterItem);
		}

		let maxMeter = Math.max(...maxIPU);
		maxMeters.push(maxMeter);
		let maxDelta = Math.max(...deltas);

		colorGrafs(maxDelta, deltas, rects);
	} else {
		noMeters();
	}
}

function colorGrafs(max, deltas, rects) {
	let maxDelta = max;
	deltas.forEach((delta, index) => {

		if (delta > 0) {
			let percent = delta / maxDelta * 100;
			let rect = rects[index];
			rect.style.height = `${percent}px`;
			rect.style.background = '#32bbffb0';
		}
	});
}



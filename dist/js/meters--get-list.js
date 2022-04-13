const url = '/rest/meters/getHistoryReadingsIpu.ajax.php';
let data;

function noMeters() {
	if (!document.querySelector('.no-meters')) {
		let h2 = document.createElement('h2');
		h2.className = 'no-meters';
		h2.innerText = 'Приборы учета не найдены!';
		document.querySelector('main').append(h2);
	}
}

function getMeters(data, index) {
	$.ajax({
		type: "POST",
		url: url,
		data: data,
		success: function (res) {
			showMeters(res, index);
		},
		error: function (err) {
			console.log('err: ', err);
			noMeters();
		}
	});
}
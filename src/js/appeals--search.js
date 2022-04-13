const appealSearchBtn = document.querySelector('#appeal-search-button');
const appealSearch = document.querySelector('#appeal-search');
const appealSearchBtnText = document.querySelector('#appeal-search--text');
appealSearchBtn.addEventListener('click', function () {
	appealSearch.classList.add('active');
})


document.addEventListener('click', e => {
	let target = e.target;
	let its_button = target == appealSearchBtn;
	let its_input = target == appealSearch;
	let its_button_text = target == appealSearchBtnText;
	if (!its_button && !its_input && !its_button_text) {
		appealSearch.classList.remove('active');
	}
});


appealSearch.addEventListener('keydown', function (e) {
	if (e.keyCode === 13) {
		data.search = this.value;
		appealSearchBtnText.innerText = `Поиск: ${this.value}`;
		showDeleteIcon();
		appealsAjax(data);

		appealSearch.classList.remove('active');
	}
})
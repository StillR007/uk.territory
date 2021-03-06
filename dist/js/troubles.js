let main = document.querySelector('main');

let popupFunc = () => {
	if (window.innerWidth < 1366) {
		let body = document.querySelector('body');
		body.classList.add('lock');

		let closeIcon = document.createElement('div');
		closeIcon.id = "close-icon";
		body.append(closeIcon);

		closeIcon.addEventListener('click', function () {
			this.remove();
			document.querySelector('.main-column.form-column.active').classList.remove('active');
			body.classList.remove('lock');
		});
	}
}

function problemSelected(problem) {
	if (document.querySelector('.list-item.problem.active')) {
		document.querySelector('.list-item.problem.active').classList.remove('active');
	}
	problem.classList.add('active');


	const form28 = document.querySelector('#i-message-form-field-28');
	document.querySelector('.main-column.form-column').classList.add('active');
	popupFunc();
	form28.value = '';
	form28.value = problem.innerText;
	form28.setAttribute('readonly', 'readonly');
	document.querySelector('#i-message-form-field-92').setAttribute("value", `${problem.getAttribute('data-cat')}`);
	document.querySelector('#i-message-form-field-93').setAttribute("value", `${problem.getAttribute('data-prob')}`);
	document.querySelector('#i-message-form-field-95').setAttribute("value", 'Бесплатно');
	document.querySelector('#i-message-form-field-97').setAttribute("value", `${problem.innerText}`);
}



/* Выбор категории и проблемы по клику */
let categoriesNode = document.querySelectorAll('.list-item.category');
categories = [...categoriesNode];

categories.forEach(category => {
	category.addEventListener('click', function () {
		this.classList.add('active');

		let activeSecondColumn = document.querySelector('.main-column.second-column')
		let activeCategory = document.querySelector('.list-item.category.active');
		if (activeSecondColumn) {
			activeSecondColumn.remove();
			if (activeCategory) {
				activeCategory.classList.remove('active');
			}
		}

		let activeForm = document.querySelector('.main-column.form-column.active');
		if (activeForm) {
			activeForm.classList.remove('active');
		}

		const secondColumn = document.createElement('div');
		secondColumn.className = 'main-column second-column';
		main.append(secondColumn);

		const secondColumnName = document.createElement('p');
		secondColumnName.className = "main-column-name";

		secondColumnName.innerText = "Проблема";
		secondColumn.append(secondColumnName);

		var secondColumnContent = document.createElement('div');
		secondColumnContent.className = 'main-column-content';
		secondColumn.append(secondColumnContent);

		const chooseProblem = document.createElement('div');
		chooseProblem.className = "choose-problem";
		chooseProblem.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="116"> <path d="M112 115a1 1 0 11-2 0c0-.992-.014-1.983-.04-2.972a1 1 0 011.999-.054c.027 1.007.041 2.016.041 3.026zm-.294-8.066a1 1 0 01-1.995.146c-.072-.991-.158-1.98-.258-2.966a1 1 0 011.99-.201c.101 1.004.19 2.011.263 3.02zm-.888-8.04a1 1 0 11-1.978.293 105.76 105.76 0 00-.476-2.93 1 1 0 011.97-.348c.175.992.336 1.987.484 2.985zm-1.476-7.927a1 1 0 11-1.952.44c-.217-.968-.448-1.932-.693-2.892a1 1 0 111.938-.494c.25.978.485 1.96.707 2.946zm-2.071-7.824a1 1 0 11-1.913.583c-.29-.947-.592-1.89-.907-2.828a1 1 0 111.896-.637c.321.956.63 1.917.924 2.882zm-2.652-7.65a1 1 0 11-1.864.724c-.36-.923-.731-1.842-1.116-2.755a1 1 0 111.843-.777c.392.93.771 1.866 1.137 2.807zm-3.192-7.382a1 1 0 01-1.805.862c-.426-.894-.865-1.782-1.316-2.663a1 1 0 111.78-.911c.46.897.907 1.802 1.341 2.712zm-3.754-7.166a1 1 0 11-1.736.993c-.492-.86-.996-1.713-1.511-2.559a1 1 0 011.707-1.041c.526.862 1.04 1.73 1.54 2.607zm-4.275-6.867a1 1 0 11-1.657 1.119c-.554-.82-1.12-1.634-1.697-2.44a1 1 0 011.626-1.164c.588.82 1.164 1.649 1.728 2.485zm-4.776-6.538a1 1 0 01-1.57 1.238 107.532 107.532 0 00-1.874-2.308 1 1 0 111.535-1.282c.647.775 1.283 1.559 1.909 2.352zm-5.238-6.158a1 1 0 11-1.475 1.352c-.669-.73-1.348-1.452-2.037-2.163a1 1 \
		 0 011.437-1.392c.702.725 1.393 1.46 2.075 2.203zm-5.629-5.709a1 1 0 01-1.372 1.455c-.72-.68-1.451-1.349-2.19-2.008a1 1 0 111.33-1.493c.754.672 1.498 1.354 2.232 2.046zm-6.081-5.323a1 1 0 01-1.261 1.552 107.493 107.493 0 00-2.333-1.841 1 1 0 011.218-1.587c.8.614 1.593 1.24 2.376 1.876zm-6.458-4.861a1 1 0 01-1.143 1.64c-.813-.565-1.634-1.12-2.462-1.663a1 1 0 111.097-1.672c.844.553 1.68 1.118 2.508 1.695zm-6.81-4.376a1 1 0 01-1.018 1.721c-.853-.505-1.713-.997-2.58-1.478a1 1 0 11.97-1.75c.883.49 1.76.993 2.628 1.507zm-7.105-3.854a1 1 0 01-.888 1.792c-.887-.439-1.78-.866-2.68-1.28a1 1 0 11.837-1.817c.916.422 1.827.857 2.73 1.305zm-7.383-3.318a1 1 0 11-.751 1.853c-.918-.372-1.842-.73-2.77-1.077a1 1 0 01.699-1.874c.946.353 1.887.719 2.822 1.098zm-7.612-2.758a1 1 0 11-.61 1.904c-.943-.302-1.89-.591-2.843-.867a1 1 0 01.557-1.921c.97.281 1.935.576 2.896.884zM28.505 9a1 1 0 11-.466 1.945c-.963-.23-1.93-.448-2.9-.652a1 1 0 01.412-1.957c.988.208 1.973.43 2.954.664zm-7.951-1.594a1 1 0 11-.32 1.974c-.977-.158-1.957-.302-2.94-.434a1 1 0 01.265-1.982c1 .134 2 .281 2.995.442zm-7.997-.993a1 1 0 11-.173 1.993c-.986-.086-1.975-.158-2.965-.217a1 1 0 11.118-1.996c1.009.06 2.015.133 3.02.22zm-7.926-.4a1 1 0 01.028 1.993l5.918 4.177a1 1 0 01-1.154 1.634l-8.5-6a1 1 0 010-1.634l8.5-6a1 1 0 011.154 1.634L4.63 6.014z"></path></svg>';

		const chooseProblemText = document.createElement('div');
		chooseProblemText.className = "choose-problem-text";
		chooseProblemText.innerText = 'Уточните детали проблемы';


		chooseProblem.append(chooseProblemText);
		document.querySelector('main').append(chooseProblem);


		let problemsNode = this.closest(".main-column-content__item").querySelector('.category-hidden').querySelectorAll('.category-hidden-value');
		problems = [...problemsNode]
		problemsNode.forEach(problemNode => {
			let textProblem = problemNode.innerText;
			let problem = document.createElement('div');
			problem.innerText = textProblem;
			problem.className = 'list-item problem';

			problem.setAttribute('data-cat', `${problemNode.getAttribute('data-cat')}`);
			problem.setAttribute('data-prob', `${problemNode.getAttribute('data-prob')}`);
			secondColumnContent.append(problem);

			problem.addEventListener('click', function () {
				problemSelected(this);
			});
		});
	});
});
/* Выбор категории и проблемы по клику */



var inputs = document.querySelectorAll('.inputfile');
Array.prototype.forEach.call(inputs, function (input) {
	var label = input.nextElementSibling;
	var labelVal = label.innerHTML;

	input.addEventListener('change', function (e) {
		var fileName = '';
		if (this.files && this.files.length > 1)
			fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
		else
			fileName = e.target.value.split('\\').pop();
		if (fileName)
			label.querySelector('span').innerHTML = fileName;
		else
			label.innerHTML = labelVal;
	});
});



/* Показ мини-изображений прикрепленных файлов в форме */
function showFile(input) {
	let files = input.files;
	files = [...files];

	let readFiles = (file) => {
		console.log(file);
		if (imageTypes.indexOf(file.type) !== -1) {
			let fileLoad = document.createElement('div');
			fileLoad.className = 'loaded-file';
			inputContainer.append(fileLoad);

			let fileImg = document.createElement('img');
			let fileURL = URL.createObjectURL(file);
			fileImg.src = fileURL;
			fileLoad.append(fileImg);
		} else {
			let lastDot = file.name.lastIndexOf(".");
			let format = file.name.slice(lastDot);

			let fileLoad = document.createElement('div');
			fileLoad.className = 'loaded-file';
			inputContainer.append(fileLoad);

			let fileText = document.createElement('p');
			fileText.innerHTML = format;
			fileLoad.append(fileText);
		}
	}


	const inputFieldLabel = document.querySelector('label[for="i-message-form-field-35"]');
	inputFieldLabel.querySelector('span').style.display = 'none';
	inputFieldLabel.querySelector('i.fa.fa-paperclip').style.display = 'none';

	const inputContainer = document.createElement('div');
	inputContainer.id = 'input-container';

	document.querySelector('#input-container') ? inputFieldLabel.remove() : inputFieldLabel.append(inputContainer);


	const imageTypes = ['image/webp', 'image/svg+xml', 'image/png', 'image/jpeg', 'image/pjpeg', 'image/vnd.wap.wbmp', 'image/vnd.microsoft.icon'];
	const reader = new FileReader();

	files.forEach(file => readFiles(file))
}
/* Показ мини-изображений прикрепленных файлов в форме */



/* Ресайз для корректного отображения попапа с формой */
window.addEventListener('resize', function () {
	let prevWidth = this.window.innerWidth;

	if (prevWidth + 1 > 1365 && this.window.innerWidth <= 1365) {
		console.log('yes')
		location.reload();
	}
});
/* Ресайз для корректного отображения попапа с формой */



/* Выпадающее меню */
$(function () {
	$('.troubles-select').select2({
		placeholder: {
			id: '-1', // the value of the option
			text: 'Select an option'
		},
		placeholder: "Select an option",
		allowClear: true
	});
});

$('.troubles-select').on('select2:select', function (event) {
	let selectedText = event.params.data.text;
	let origOption = document.querySelector(`option[value="${selectedText}"]`);

	let activeSecondColumn = document.querySelector('.main-column.second-column')
	let activeCategory = document.querySelector('.list-item.category.active');
	let activeForm = document.querySelector('.main-column.form-column.active');
	if (activeForm) {
		activeForm.classList.remove('active');
	}
	if (activeSecondColumn) {
		activeSecondColumn.remove();
	}
	if (activeCategory) {
		activeCategory.classList.remove('active');
	}

	let secondColumn = document.createElement('div');
	secondColumn.className = 'main-column second-column';
	main.append(secondColumn);

	let secondColumnName = document.createElement('p');
	secondColumnName.className = "main-column-name";

	secondColumnName.innerText = "Проблема";
	secondColumn.append(secondColumnName);

	let secondColumnContent = document.createElement('div');
	secondColumnContent.className = 'main-column-content';
	secondColumn.append(secondColumnContent);

	let origDataCat = origOption.getAttribute('data-cat');
	let choosedCategory = document.querySelector(`.list-item.category[data-cat="${origDataCat}"]`);

	choosedCategory.classList.add('active');


	let problemsNode = choosedCategory.closest(".main-column-content__item").querySelector('.category-hidden').querySelectorAll('.category-hidden-value');
	problems = [...problemsNode]
	problemsNode.forEach(problemNode => {
		let textProblem = problemNode.innerText;
		let problem = document.createElement('div');
		problem.innerText = textProblem;
		problem.className = 'list-item problem';

		problem.setAttribute('data-cat', `${problemNode.getAttribute('data-cat')}`);
		problem.setAttribute('data-prob', `${problemNode.getAttribute('data-prob')}`);
		secondColumnContent.append(problem);

	});

	let origDataProblem = origOption.getAttribute('data-prob');
	let choosedProblem = document.querySelector(`.list-item.problem[data-prob="${origDataProblem}"]`);
	problemSelected(choosedProblem);
});
/* Выпадающее меню */



let menu = document.querySelector('#list-user-lic');

if (menu) {
	menu.addEventListener('click', function () {
		let dropdown = this.querySelector('.rd-navbar-dropdown');
		dropdown.classList.contains('active') ? dropdown.classList.remove('active') : dropdown.classList.add('active');
	})
}

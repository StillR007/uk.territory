if (document.querySelector('.select2')) {
	$('select2').selectpicker();
}

const textareasNodes = document.querySelectorAll('textarea.form-control');
if (textareasNodes) {
	const textareas = [...textareasNodes];

	textareas.forEach(textarea => {
		let parent = textarea.closest('.question-answer');
		console.log(parent);
		let label = parent.querySelector('label');
		console.log(label);
		parent.querySelector('label').style.display = 'none';
	});
}
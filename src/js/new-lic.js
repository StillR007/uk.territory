$("#tel").mask("+7(999)999-99-99");

$('#userAgreement').on('change', function () {
	if ($(this).is(':checked')) {
		$('#btnRegister').attr('disabled', false);
	} else {
		$('#btnRegister').attr('disabled', true);
	}
});
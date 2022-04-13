const imagesNode = document.querySelectorAll('img[src^="/upload/medialibrary/"]');

if (imagesNode) {
	const images = [...imagesNode];
	images.forEach((img) => {
		let src = img.getAttribute('src');
		let newSrc = 'https://bx.uk-ter.ru/' + src;
		img.setAttribute("src", `${newSrc}`);
	});
}
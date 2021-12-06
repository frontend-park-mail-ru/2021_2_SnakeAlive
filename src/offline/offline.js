import logo from '../../image/logo.svg';
import headerTemplate from '@/components/header/headerContent.handlebars';

window.addEventListener('offline', () => {

	const contentPlace  = document.createElement('div');
	contentPlace.id = 'content';
	contentPlace.classList.add('content');

	const headerPlace = document.createElement('div');
	headerPlace.id = 'header';
	headerPlace.classList.add('header');
	headerPlace.innerHTML =headerTemplate({
		logo,
		isNotEmpty: false,
		// isUser: metadata.isTrue,
	});

	const root = document.getElementById('root');

	if (root !== null) {
		root.innerHTML = '';
		root.appendChild(headerPlace);
		root.appendChild(contentPlace);
	}
});
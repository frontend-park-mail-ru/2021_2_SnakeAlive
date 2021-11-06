export const initReviewForm = () => {
	const form = document.querySelector('form');
	if (form !== null) {
		form.addEventListener(
			'submit',
			event => {
				event.preventDefault();
				const data = new FormData(form);
				console.log(data.get('rating'));
			},
			false
		);
	}
};


export const setColumnsAmount = (width) => {
	const grid = document.getElementById('card-grid-wrapper');
	if (width < 900) {
		grid.classList.remove('card__grid__3');
		grid.classList.remove('card__grid__2');
		grid.classList.add('card__grid__1');
		return;
	}
	if (width > 1350) {
		grid.classList.remove('card__grid__1');
		grid.classList.remove('card__grid__2');
		grid.classList.add('card__grid__3');
		return;
	}
	grid.classList.remove('card__grid__3');
	grid.classList.remove('card__grid__1');
	grid.classList.add('card__grid__2');
}
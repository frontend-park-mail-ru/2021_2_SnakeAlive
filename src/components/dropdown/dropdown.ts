export const dropDownToggle = (dropdownId: string, trigerId: string): void => {
	const moreBtn = document.getElementById(trigerId);
	if (moreBtn !== null) {
		moreBtn.addEventListener('click', () => {
			if (document.getElementById(dropdownId)?.classList.contains('show')) {
				document.getElementById(dropdownId)?.classList.remove('show');
			} else {
				document.getElementById(dropdownId)?.classList.toggle('show');
			}
		});
	}
} 
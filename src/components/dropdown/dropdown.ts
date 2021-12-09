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
	document.addEventListener(
		'click',
		event => {
			event.preventDefault();
			const target = <HTMLDivElement>event.target
			if (!target.classList.contains('dropdown_item')){
			  	dropDownHide(dropdownId); 
			};
		},
		false
	);	
} 

export const dropDownHide = (dropdownId: string): void =>{
	if (document.getElementById(dropdownId)?.classList.contains('show')) {
		document.getElementById(dropdownId)?.classList.remove('show');
	} 
}
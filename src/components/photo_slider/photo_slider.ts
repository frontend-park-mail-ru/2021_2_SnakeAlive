export default class photoSlider {
	#pictures: string[];

	#position = 0;

	#place: Element | null;

	constructor(pictures: string[], place: string) {
		this.#pictures = pictures;
		const foundPlace = document.querySelector(place);
		if (foundPlace === null) {
			throw new Error(`не существует ${place}, куда нужно вставить photoSlider`);
		}
		this.#place = foundPlace;
	}

	// две кнопки-стрелочки по сторонам картинки, их нажатия обрабатываются и картинка переключается
	// это кажется самое простое
}

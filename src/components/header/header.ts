import './header.scss';
import headerTemplate from './headerContent.handlebars';
import logo from '../../../image/logo.svg';

interface dataLoggedTemplate {
	isUser: boolean;
	name: string;
	avatarPath: string;
	logo?: string;
}
interface dataMainTemplate {
	isUser: boolean;
	btnText: string;
	logo?: string;
}

interface dataEmptyTemplate {
	isUser: boolean;
	logo?: string;
}

export const makeHeader = (
	info: dataLoggedTemplate | dataMainTemplate | dataEmptyTemplate
): string => {
	// eslint-disable-next-line no-param-reassign
	info.logo = logo;
	return headerTemplate(info);
};

export const addFlavicon = () => {
	const headHTML = document.querySelector('head');
	if (headHTML !== null) {
		const icon = document.createElement('link');
		icon.rel = 'icon';
		icon.href = logo;
		headHTML.appendChild(icon);
	}
};
addFlavicon();

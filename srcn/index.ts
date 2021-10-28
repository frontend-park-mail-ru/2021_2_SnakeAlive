import { router } from "./router/index"
// import { Header } from "./view/components/header/header.js";

import './index.css';
import './drop_default.css';



router.start(window.location.pathname);

window.addEventListener('popstate', () => {
	router.popstate();
});

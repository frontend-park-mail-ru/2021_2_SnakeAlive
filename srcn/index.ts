import { router } from "./router/index"

import './index.css';
import './drop_default.css';



router.start(window.location.pathname);

window.addEventListener('popstate', () => {
	router.popstate();
});

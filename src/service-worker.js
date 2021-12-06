import { frontEndEndPoint } from './constants';

const CACHE_NAME = 'newCash';
const OFFLINE_CACHE_NAME = 'offline_v34';
const OFFLINE_HTML = '/offline/offline.html';
const OFFLINE_URLS = [
	OFFLINE_HTML,
	'/offline/offline.js',
	'/offline/offline.handlebars',
	'/offline/offline.css',
];

// const API_REGEX = /\/api\//;
// const WEBSOCKET_REGEX = /\/ws*/;
// const SERVICE_WORKER_REGEX = /\/service-worker*/;

const STATIC_URIS = [/.jpeg$/, /.jpg$/, /.png$/, /.svg$/];
const CASH_URIS = [/.html$/, /.css$/, /.js$/, /\/$/];

self.addEventListener('install', event => {
	console.log('SELF LOG: SW installed');

	event.waitUntil(caches.open(OFFLINE_CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS)));

	// event.waitUntil(
	//   // Cache the offline page when installing the service worker
	//   fetch(frontEndEndPoint + OFFLINE_URL, { credentials: 'include' }).then(response => {
	//     console.log("trying to get offline page ", response.clone());
	//     caches.open(CACHE_NAME).then(cache => cache.put(OFFLINE_URL, response));
	//   })
	// );
});

self.addEventListener('activate', event => {
	event.preventDefault();
	console.log('SELF LOG: SW activated');
});

self.addEventListener('register', event => {
	event.preventDefault();
	console.log('SELF LOG: SW registered');
});

const showOfflinePage = () => {};

self.addEventListener('fetch', event => {
	event.preventDefault();

	if (STATIC_URIS.findIndex(regex => regex.test(event.request.url)) !== -1) {
		console.log('statics', event.request.url);
		event.respondWith(
			caches.match(event.request).then(
				resp =>
					resp ||
					fetch(event.request).then(response => {
						event.waitUntil(
							caches.open(CACHE_NAME).then(cache => {
								cache.put(event.request, response);
							})
						);
						return response.clone();
					})
			)
		);
	} else {
		if (CASH_URIS.findIndex(regex => regex.test(event.request.url)) !== -1) {
			console.log('main files', event.request.url);
			event.respondWith(
				fetch(event.request).then(response => {
					event.waitUntil(
						caches.open(CACHE_NAME).then(cache => {
							cache.put(event.request, response);
						})
					);
					return response.clone();
				}).catch(() => {
					return caches.match(event.request).then( resp => resp);
				})
      )
		} else {
      event.respondWith(
        fetch(event.request)
					.then(response => response)
					.catch(() => {
						return caches.match('/').then( resp => resp);
					})
      );
    }

		// console.log('not static', event.request.url);
		// event.respondWith(
		// 	fetch(event.request)
		// 		.then(response => {
		// 			if (CASH_URIS.findIndex(regex => regex.test(event.request.url)) !== -1) {
		// 				console.log(CASH_URIS);
		// 				event.waitUntil(
		// 					caches
		// 						.open(CACHE_NAME)
		// 						.then(cache => {
		// 							cache.put(event.request, response);
		// 						})
		// 						.catch(err => {
		// 							console.log('no cash opened', err);
		// 						})
		// 				);
		// 			}
		// 			return response.clone();
		// 		})
		// 		.catch(() => {
		// 			console.log('here. fetch -> catch');
		// 			return caches.match(event.request);
		// 		})
		// );
	}
});

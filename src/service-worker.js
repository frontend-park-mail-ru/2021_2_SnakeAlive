const CACHE_NAME = 'cash_v1';

const OFFLINE_STATIC = ['/offline/aircraft_offline.svg'];

const STATIC_URIS = [/.jpeg$/, /.jpg$/, /.png$/, /.svg$/];
const CASH_URIS = [/.html$/, /.css$/, /.js$/, /\/$/];

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames =>
			Promise.all(
				cacheNames
					.filter(
						cacheName => cacheName !== CACHE_NAME
					)
					.map(cacheName => caches.delete(cacheName))
			)
		)
	);
	event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_STATIC)));
});

self.addEventListener('fetch', event => {
	event.preventDefault();

	if (STATIC_URIS.findIndex(regex => regex.test(event.request.url)) !== -1) {
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
	} else if (CASH_URIS.findIndex(regex => regex.test(event.request.url)) !== -1) {
		event.respondWith(
			fetch(event.request)
				.then(response => {
					event.waitUntil(
						caches.open(CACHE_NAME).then(cache => {
							cache.put(event.request, response);
						})
					);
					return response.clone();
				})
				.catch(() => caches.match(event.request).then(resp => resp))
		);
	} else {
		event.respondWith(
			fetch(event.request)
				.then(response => response)
				.catch(() => caches.match('/').then(resp => resp))
		);
	}
});

const CACHE_NAME = "v5";

// self.addEventListener('install', (event) => {
//   console.log(event);
//   event.waitUntil(
//       caches.open(CACHE_NAME).then((cache) =>
//           cache.addAll(['/image/favicon.ico']))
//   );
// });

self.addEventListener('activate', event => {
  // // delete any caches that aren't in expectedCaches
  // // which will get rid of static-v1
  // event.waitUntil(
  //   caches.keys().then(keys => {
  //     keys.forEach(key => caches.delete(key));
  //   }).catch(console.log('error while activiting (smth with updating of old caches)'))
  // );
  console.log('activated');
});

// при событии fetch, мы используем кэш, и только потом обновляем его данным с сервера
// self.addEventListener('fetch', function(event) {
//   let responseClone = null;
//   // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера.
//   console.log(tryFromCache(event.request).then((resp) => {return resp;}));
//   // event.respondWith(tryFromCache(event.request));
//   // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновиться.
//   // if (responseClone) {
//   //   caches.open(CACHE_NAME).then((cache) =>
//   //     cache.put(event.request, responseClone)
//   //   );
//   // } else {
//   //   event.waitUntil(update(event.request));
//   // }
// });

self.addEventListener('fetch', function(event) {
  // console.log(event.request);
  // event.respondWith(
  // console.log(
  console.log(caches.keys());
  event.waitUntil(
    caches.match(event.request)
      .then((response) => {
        // console.log("response : ", response);
        if (response !== undefined) {
          event.respondWith(response);
        } else {
          console.log("in else");
          event.waitUntil(fetch(event.request)
            .then((response) => {
              // console.log("response : ", response);
              // responseClone = response.clone();
              event.respondWith(response);
            })
          )
        }
      })
  );
    
  // );
  // let responseClone = caches.match(event.request)
  // .then((response) => {
  //   // console.log("response : ", response);
  //   if (response !== undefined) {
  //     return response;
  //   } else {
  //     console.log("in else");
  //     fetch(event.request)
  //       .then((response) => {
  //         // console.log("response : ", response);
  //         // responseClone = response.clone();
  //         return response;
  //       })
  //   }
  // });
  // if (responseClone) {
  //   event.respondWith(responseClone);
  // }
  // if(responseClone){
  //   caches.open(CACHE_NAME).then((cache) =>
  //     cache.put(event.request, responseClone)
  //   );
  // }
  // else {
  //     event.waitUntil(
  //       // поход в сеть для обновления кэша
  //   );
  // }

}
)

// function tryFromCache(request) {
//   return caches.match(request)
//     .then((response) => {
//       if (response !== undefined) {
//         return response;
//       } else {

//       }
//     }).catch(() => {
//       fetch(request)
//         .then((response) => {
//           console.log("response : ", response);
//           // responseClone = response.clone();
//           return Promise.resolve(response);
//         })
//     });
// }

// function update(request) {
//   return caches.open(CACHE_NAME).then((cache) =>
//       fetch(request).then((response) =>
//           cache.put(request, response)
//       )
//   );
// }

// self.addEventListener('fetch', function(event) {
//   event.respondWith(caches.match(event.request).then(function(response) {
//     // caches.match() always resolves
//     // but in case of success response will have value
//     if (response !== undefined) {
//       return response;
//     } else {
//       return fetch(event.request).then(function (response) {
//         // response may be used only once
//         // we need to save clone to put one copy in cache
//         // and serve second one
//         let responseClone = response.clone();
        
//         caches.open(CACH_NAME).then((cache) => {
//           cache.put(event.request, responseClone);
//         });
//         return response;
//       }).catch(() => {
//         // вроде тут как раз ошибка в связи с отсутствием сети
//         return caches.match('/sw-test/gallery/myLittleVader.jpg');
//       });
//     }
//   }));
// });
  
  



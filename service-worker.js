'use strict';

const CACHE_NAME = 'APP_CACHE';

const FILES_TO_CACHE = [
   
    'Images/icons/favicon.ico',
    'Images/background2.jpg',
    'Images/Instagram.png',
    'Images/logo3.png',
    'Images/whatsapp.jpeg',
    'styles.css',
    'bootstrap/css/bootstrap.min.css',
    'bootstrap/maxcdn/css/bootstrap.min.css',
    'bootstrap/maxcdn/css/bootstrap.min.css.map',
    'bootstrap/js/bootstrap.min.js',
    'bootstrap/js/bootstrap.min.js.map',
    'js/jquery-3.5.1.min.js',
    'js/popper.min.js',
    'js/popper.min.js.map',
    'offline.html'

];

self.addEventListener('install', (evt)=>{
    
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
            return cache.addAll(FILES_TO_CACHE);
        })
    )
    self.skipWaiting();
});

self.addEventListener('activate', (evt)=>{
    evt.waitUntil(
        caches.keys().then((keylist)=>{
            return Promise.all(keylist.map((key)=>{
                if(key !== CACHE_NAME)
                    return caches.delete(key);
            }))
        })
    )

    self.clients.claim();
});

self.addEventListener('fetch', (evt)=>{
    // console.log('[ServiceWorker] Recebendo', evt.request.url);
    if(evt.request.mode !== 'navigate'){
        return;
    }
    
    evt.respondWith(fetch(evt.request).catch(()=>{
        
        return caches.open(CACHE_NAME).then((cache)=>{
            
             return cache.match('offline.html');
        })
        
    }))
});

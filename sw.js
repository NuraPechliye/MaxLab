const cacheName = 'cacheSite'
self.addEventListener ('install', function(event){

    event.waitUntil(

        caches.open(cacheName).then(function(cache){

            cache.addAll ([
                'https://github.com/NuraPechliye/MaxLab.git',
                'https://github.com/NuraPechliye/MaxLab.git/index.html',
                'https://github.com/NuraPechliye/MaxLab.git/sw.js',
                'https://github.com/NuraPechliye/MaxLab.git/misturas.js',
                'https://github.com/NuraPechliye/MaxLab.git/style.css',
                'https://github.com/NuraPechliye/MaxLab.git/sobre.html',
                'https://github.com/NuraPechliye/MaxLab.git/sobre.css',
                'https://github.com/NuraPechliye/MaxLab.git/feedback.html',
                'https://github.com/NuraPechliye/MaxLab.git/feedback.css',
                'https://github.com/NuraPechliye/MaxLab.git/ranking.html',
                'https://github.com/NuraPechliye/MaxLab.git/ranking.css',
                'https://github.com/NuraPechliye/MaxLab.git/misturar.php',
                'https://github.com/NuraPechliye/MaxLab.git/manifest.json',
                'https://github.com/NuraPechliye/MaxLab.git/feedback.php',
                'https://github.com/NuraPechliye/MaxLab.git/bioquimica.png',
                'https://github.com/NuraPechliye/MaxLab.git/pessoa1.jpg',
                'https://github.com/NuraPechliye/MaxLab.git/lab.js',
                'https://github.com/NuraPechliye/MaxLab.git/img/launchericon-48x48.png',
                'https://github.com/NuraPechliye/MaxLab.git/img/launchericon-72x72.png',
                'https://github.com/NuraPechliye/MaxLab.git/img/launchericon-96x96.png',
                'https://github.com/NuraPechliye/MaxLab.git/img/launchericon-144x144.png',
                'https://github.com/NuraPechliye/MaxLab.git/img/launchericon-192x192.png',
                'https://github.com/NuraPechliye/MaxLab.git/img/launchericon-512x512.png'


            ])

        })

    ) .then(() => self.skipWaiting())

})

self.addEventListener('activate', e =>{

    self.clients.claim()

})

self.addEventListener ('fetch', async e => {

    const req = e.request
    const url = new URL(req.url)

    if(url.origin === location.origin){


        e.respondWith(cacheFirst(req))

    } else {

        e.respondWith(networkAndCache(req))

    }

})

async function cacheFirst(req) {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req) 

    return cached || fetch(req)
    
}

async function networkAndCache(req) {

    const cache = await caches.open(cacheName)

    try {
        const refresh = await fetch(req)
        await cache.put(req, refresh.clone())
        return refresh
    } catch(e) {
        const cached = await cache.match(req)
        return cached
    }
    
}
const C='picu-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(clients.claim());});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.open(C).then(c=>c.match(e.request).then(r=>
      r||fetch(e.request).then(res=>{
        try{if(res.ok&&new URL(e.request.url).origin===location.origin){c.put(e.request,res.clone());}}
        catch(err){}
        return res;
      }).catch(()=>r)
    ))
  );
});
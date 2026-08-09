// 有網路時走 network-first（永遠拿最新版本，同時偷偷更新快取）
// 沒網路時走快取（回上一次成功載入過的版本），才是真的離線可用
// 想強制使用者更新快取（例如大幅改了行程資料結構），把版本號 +1 即可
// 這個版本號要跟 index.html 裡的 SW_CACHE_NAME 保持一致
const CACHE_NAME = 'trip-console-v1';
// 只放固定不太會變的外殼檔案；data/*.json 是由 index.html 的 loadData() 直接寫入快取，不用在這裡列
const APP_SHELL = ['index.html', 'manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // 只快取同網域的 GET 請求。天氣／匯率這類外部 API 不快取，
  // 離線時交給 index.html 裡既有的 try/catch 顯示參考值
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        return res;
      })
      .catch(() =>
        caches.match(event.request).then((cached) =>
          cached || (event.request.mode === 'navigate' ? caches.match('index.html') : undefined)
        )
      )
  );
});

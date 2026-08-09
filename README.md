# 🗼 trip-console — 你的旅遊行程 PWA

一個可安裝到手機主畫面、離線也能用的旅遊行程規劃工具。復古終端機／像素風介面，行程、待辦、匯率、天氣通通裝進一個 app 裡。

> 這個專案原本是我自己的東京行程，現在整理成任何人都能套用自己行程的模板 🎒

## 目錄

- [✨ 功能](#features)
- [🚀 快速開始](#quick-start)
- [🧳 客製化成你自己的行程](#customize)
  - [🆕 開始你自己的新行程](#new-trip)
  - [每日行程](#day-json)
  - [待辦清單](#checklist-json)
  - [基本設定與天氣城市](#config-json)
  - [其他基本資訊](#misc)

<a id="features"></a>

## ✨ 功能

- **📅 行程時間軸**：按天顯示行程，每個行程項目可帶時間、圖示、地點、交通方式、詳細說明、待辦任務
- **🔍 行程搜尋**：首頁輸入關鍵字即時搜尋所有天數的行程（標題、地點、交通方式、memo、待辦、必吃推薦都會比對），點選結果直接跳到那一天並展開
- **📋 待辦清單**：分類管理購票、預約、打包等待辦事項
- **🛠 旅遊工具**
  - 多城市天氣查詢
  - 即時匯率換算 + 快速換算表，目的地幣別可在介面直接切換
- **🎨 主題色**：5 種主題色，介面直接切換
- **📱 PWA**：可「加到主畫面」，像原生 app 一樣使用，支援離線瀏覽

<a id="quick-start"></a>

## 🚀 快速開始

### 直接使用

```bash
git clone https://github.com/roserosejump/trip-console.git
```

1. Fork 或 Clone 這個 repo
2. **不能直接雙擊打開 `index.html`**——行程資料是用 `fetch()` 讀取 JSON，瀏覽器會擋掉本地檔案的讀取，畫面會停在錯誤訊息。要用「本地伺服器」打開，最簡單的方法：
   - VS Code：用 VS Code 打開這個資料夾時會自動提示安裝 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 擴充功能，裝好後在 `index.html` 上按右鍵 →「Open with Live Server」
   - 或終端機執行 `npm run dev`（不需要先 `npm install`）
   - 或執行 `python3 -m http.server 8000`，瀏覽器打開 `http://localhost:8000`
   - 或直接部署到 GitHub Pages / Netlify / Vercel（見下方）
3. 打開網頁後，手機瀏覽器選單 → 「加入主畫面」，就會變成一個 app icon

### 部署到 GitHub Pages

1. Repo → Settings → Pages → Source 選擇 `main` branch
2. `manifest.json` 的 `start_url` 已設定為：
```json
   "start_url": "/trip-console/"
```
   如果你之後又改 repo 名稱，記得同步改這裡。

<a id="customize"></a>

## 🧳 客製化成你自己的行程

所有行程資料都放在 `data/` 資料夾裡，**純 JSON 檔案，不用懂程式也能改**。用純文字編輯器打開，照著格式改文字內容即可（線上可用 [jsonlint.com](https://jsonlint.com/) 檢查格式有沒有寫錯）。

> ⚠️ JSON 格式要注意：字串要用雙引號 `"..."`，每個項目最後一個逗號要刪掉（最後一項後面不能有 `,`）。

<a id="new-trip"></a>

### 🆕 開始你自己的新行程

不想從別人的東京行程改起、想從空白開始的話，`data/example/` 資料夾裡有三個只填了佔位文字的範例檔（`config.json`、`day1.json`、`checklist.json`），示範了所有支援的欄位：

1. 把 `data/example/` 裡的檔案複製出來，蓋掉 `data/` 底下對應的檔案（記得先備份，或用 git 開一個新分支再改）
2. 依照下面的欄位說明，把每個檔案裡的佔位文字換成你自己的行程內容
3. 要幾天行程就建立幾個 `data/dayN.json`，並同步修改 `index.html` 裡 `loadData()` 函式的 `length: 8`（改成你的天數）

<a id="day-json"></a>

### 每日行程（`data/day1.json` ~ `data/day8.json`）

`index.html` 會用 `fetch()` 依序讀取 `day1.json` ~ `day8.json` 組成行程列表。要增減天數，就同步增減 JSON 檔案數量，並修改 `index.html` 裡 `loadData()` 函式的 `length: 8`。

單日 JSON 的欄位：

```json
{
  "day": 1,// 第幾天
  "date": "5/24",// 日期顯示
  "wd": "週日",// 星期
  "cities": ["桃園", "東京", "熱海"],// 當日經過的城市
  "hotel": "ロマンス座カド / 熱海",// 當晚住宿
  "highlight": "日本我來了！...",// 當日亮點文案
  "items": [
    {
      "id": "1-1",// 唯一 ID
      "time": "06:35–11:00",// 時間 / 時段
      "icon": "✈️", // 顯示圖示
      "title": "TPE → NRT｜虎航 IT200",// 所在地區
      "area": "桃園",// 所在地區
      "trs": "台灣虎航 IT200",// 交通方式
      "desc": "多行說明文字...可用 \n 換行",// 詳細說明（可用 \n 換行）
      "tasks": ["要辦的事 1", "要辦的事 2"], // 這個行程項目附帶的待辦
      "mapUrl": "https://maps.app.goo.gl/...",// 地圖連結
      "hours": "09-15:30",// 營業時間（選填）
      "mustEat": [
        { "name": "附近必吃美食", "hours": "09-18", "mapUrl": "https://maps.app.goo.gl/..." }
      ]
    }
  ]
}
```

欄位說明：`day` 第幾天、`date` 日期顯示、`wd` 星期、`cities` 當日經過的城市、`hotel` 當晚住宿、`highlight` 當日亮點文案；`items` 裡每個行程項目：`id` 唯一 ID、`time` 時間/時段、`icon` 顯示圖示、`title` 標題、`area` 所在地區、`trs` 交通方式、`desc` 詳細說明（選填）、`tasks` 這個行程附帶的待辦（選填）、`mapUrl` 地圖連結（選填）、`hours` 營業時間（選填）、`mustEat` 附近必吃清單（選填）。

還有兩個比較少用、但範例檔裡有示範的欄位：

- `reservation`：訂位資訊，包含 `id`（訂位碼）、`time`、`menu`、`tcUrl`（TableCheck 連結，選填）
- `isReserved` / `isTicket`：設為 `true` 時，畫面上會分別多顯示「✓ 已訂位」「🎫 已購票」標籤

<a id="checklist-json"></a>

### 待辦清單（`data/checklist.json`）

```json
{
  "GTASKS": {
    "待購票": [
      { "id": "g1", "date": "5/24 週日", "text": "[機場] 成田特快N'EX -> 東京" }
    ],
    "行前準備": [
      { "id": "g13", "text": "護照" }
    ]
  },
  "SHOP_DEF": [
    { "id": "s1", "text": "小山園抹茶粉" }
  ]
}
```

- `GTASKS`：以分類（如「待購票」「已購票交通」「行前準備」）為 key，每筆待辦包含 `id`、`date`（選填）、`text`
- `SHOP_DEF`：預設的購物清單，每筆包含 `id`、`text`

<a id="config-json"></a>

### 基本設定與天氣城市（`data/config.json`）

app 標題、旅行日期區間、天氣查詢城市都集中在這個檔案，**改這裡就好，不用碰 `index.html`**：

```json
{
  "title": "🗼 TOKYO Birthday & Hanabi 2026",
  "shortTitle": "Tokyo 2026",
  "theme": "pink",
  "currency": { "from": "JPY", "to": "TWD", "referenceRate": 0.218 },
  "tripStartDate": "2026-05-24",
  "tripEndDate": "2026-05-31",
  "cities": {
    "Atami": { "lat": 35.0964, "lon": 139.0709, "label": "熱海", "days": ["2026-05-24", "2026-05-25"] }
  }
}
```

欄位說明：

- `title`：頁面標題、頂部列顯示的文字
- `shortTitle`：加到主畫面時顯示的簡短名稱
- `theme`：預設主題色，可選 `pink`（粉櫻）、`latte`（奶茶）、`mist`（霧灰）、`charcoal`（墨石）、`indigo`（靛藍）
- `currency`：匯率換算工具要換算的幣別對，`from` 是旅行目的地的幣別，`to` 通常是 `TWD`。`referenceRate`（選填）是抓不到即時匯率時要顯示的參考值，不填的話抓取失敗會顯示「無法取得即時匯率」而不是一個可能過時的假數字。這只是預設值——使用者也可以直接在「工具」頁的「目的地幣別」按鈕切換，選擇會存在 localStorage，跟主題色一樣不用改設定檔
- `tripStartDate` / `tripEndDate`：整趟旅行的起訖日期（`YYYY-MM-DD`），首頁「出發倒數」與行程進度都靠這個判斷
- `cities`：天氣查詢用的城市清單，key 是內部代號（隨意命名），`label` 是顯示名稱，`lat`/`lon` 是經緯度（可用 Google Maps 右鍵「這是哪裡」查詢），`days` 是這個城市對應的行程日期，用來決定天氣卡片要顯示哪幾天。天氣分頁的按鈕會自動依這個清單產生，增減城市不用改 `index.html`

天氣資料是直接呼叫 [Open-Meteo](https://open-meteo.com/) API，免金鑰；匯率資料是直接呼叫 [exchangerate-api.com](https://www.exchangerate-api.com/) 的免金鑰端點。

`from` 這 12 種常見旅遊目的地的幣別，「工具」頁的「目的地幣別」有現成按鈕可以直接點選，不用改設定檔：

| 地區 | 代碼 | 地區 | 代碼 |
| --- | --- | --- | --- |
| 日本 | `JPY` | 菲律賓 | `PHP` |
| 韓國 | `KRW` | 印尼（峇里島） | `IDR` |
| 香港 | `HKD` | 美國／關島／塞班 | `USD` |
| 中國 | `CNY` | 歐元區 | `EUR` |
| 泰國 | `THB` | 英國 | `GBP` |
| 越南 | `VND` | 澳洲 | `AUD` |

其他幣別（例如新加坡 `SGD`、澳門 `MOP`，或任何 ISO 4217 三碼代號如加拿大 `CAD`、紐西蘭 `NZD`）沒有現成按鈕，但一樣能直接填在 `config.json` 的 `currency.from` 裡使用，`exchangerate-api.com` 支援 150+ 種幣別。`to` 通常固定填 `TWD` 就好。

### 🎨 主題色

除了在 `config.json` 設定預設主題，使用者也可以直接在 app 裡「工具」頁籤點選喜歡的主題色，選擇會存在瀏覽器（localStorage），不會影響 `config.json` 的預設值。目前有 5 種主題：粉櫻（預設，深色系）、奶茶（淺色系，米白＋咖啡棕，暖調）、霧灰（淺色系，冷調灰白＋梅紫松綠）、墨石（深色系，冷灰＋香檳金）、靛藍（深色系，深海軍藍＋香檳金）。

<a id="misc"></a>

### 其他基本資訊

- `manifest.json`：PWA 安裝時的 app 名稱（`name`/`short_name`）、圖示、主題色。這個檔案是瀏覽器在載入網頁「之前」直接讀取的，跟 `data/config.json` 是分開的兩份設定，改行程標題時記得兩邊都要改
- `icon.png`：主畫面圖示。`index.html` 和 `manifest.json` 裡引用時都帶了 `?v=105` 版本號（例如 `icon.png?v=105`），這是用來避開瀏覽器快取的技巧——如果換了新圖示卻沒改這個版本號，使用者的瀏覽器/已加到主畫面的 app 可能還是顯示舊圖示。換圖示時記得把 `index.html`、`manifest.json` 裡所有 `?v=105` 的數字都改成新的（例如 `?v=106`）
- `sw.js`：Service Worker，負責離線快取。有網路時照樣走網路拿最新資料（同時偷偷更新快取），離線時才改用快取版本，所以「離線也能用」是實際成立的，不是口號。快取名稱 `CACHE_NAME` 要跟 `index.html` 裡的 `SW_CACHE_NAME` 保持一致；如果之後大幅改了行程資料結構、想強制所有使用者的快取都更新，把兩邊的版本號一起 +1 即可

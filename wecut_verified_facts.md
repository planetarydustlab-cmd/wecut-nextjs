# WECUT — Verified Facts (Source of Truth)

## 0) Document Control
- Last verified: 2026-01-13
- Verified by: Nai Lee
- Source of truth: Fresha listing(s) only
- Anti-hallucination rule: 本文件僅收錄「來源頁面可直接看到」的資訊；看不到的一律標記 TODO，不得猜測或補寫。

---

## 1) Business Identity
- Name: WECUT惟理髮
- Category/Type (as shown): Hair Salon

---

## 2) Location & Contact (as shown on Fresha)
- Address (full string, as shown):
  - Lane 202, Longan Road 51, New Taipei City
- Directions link:
  - Get directions (Google Maps)（來源頁面有提供此按鈕）
- Contact:
  - TODO: Verify from source (若頁面有電話/Email，需逐字抄錄)

---

## 3) Opening Times (as shown on Fresha)
- Mon: Closed
- Tue: Closed
- Wed: 10:00 am – 9:00 pm
- Thu: 12:00 pm – 9:00 pm
- Fri: 10:00 am – 9:00 pm
- Sat: 10:00 am – 8:00 pm
- Sun: 11:00 am – 9:00 pm

## 4) Locations - Additional (Brisbane)
- Address: 103A/55 Creek Rd, Mount Gravatt, Queensland, Australia 4122
- Opening Times:
  - Mon-Fri: 9am - 5:30pm
  - Sat: 9am - 5pm
  - Sun: 9am - 5pm

---

## 5) About / Policies (as shown on Fresha)
### About (key points, faithful to source meaning)
- 五年前在澳洲布里斯本開設第一家理髮店；今年決定回到故鄉「從頭開始」。
- 強調澳洲與台灣美髮文化的碰撞。
- 強調重視員工福祉、反剝削的工作環境；並連結到「快樂工作 → 才華發揮 → 服務品質」。


## 6) Services (as shown on Fresha)

### Service categories (labels shown on page)
- Featured
- 洗加剪 shampoo and cut
- 縮毛矯正 Permanent hair straightening
- 染髮
- 護髮
- 燙髮 Perm
- 指定設計師 Zoe
- 單剪
- 調整或其他預約用
- 造型

### Example services visible (name / duration / price)
> 注意：以下僅為來源頁面截圖區塊「可見」項目；若要完整上架到官網，需從來源頁面展開完整清單後再補齊。

- 短髮洗加剪 — 35 mins — TWD 500
- 短髮剪髮（15公分以內） — 25 mins — TWD 400
- Zoe_短髮洗加剪 — 40 mins — TWD 700
- Zoe_肩下染護（2 services） — 3 hrs 20 mins — TWD 2,900（頁面顯示 Save 12%）

- TODO: capture full list from source（展開 “See all” 後逐筆抄錄）

---

## 7) Technical Notes (for dev / CMS governance)

### Fields that MUST be locked and rendered from DB (immutable facts)
- Address (full string)
- Opening times (weekly schedule)
- Booking URL / Directions link
### Fields allowed to be rewritten as marketing copy (editable story)
- Hero tagline / brand manifesto / section headings
- Journal / articles / designer bios / recruitment copy
> 但不得在文案中「新增」店址、城市、營業時間、價格等事實性內容；需要提及時，必須引用上方 locked fields。

---

## Sources
- https://fresha.com/p/wecut-3729638
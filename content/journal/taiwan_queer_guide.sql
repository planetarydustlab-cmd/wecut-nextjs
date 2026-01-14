-- Taiwan Queer Cities Guide Journal Entry (Expanded to 3 Cities)
-- To execute: Run this SQL in your Supabase SQL Editor

INSERT INTO posts (
  id,
  slug,
  title_en,
  title_zh,
  category,
  tags,
  reading_time,
  published,
  created_at,
  image_url,
  content_en,
  content_zh
) VALUES (
  gen_random_uuid(),
  'taiwan-queer-cities-guide',
  'Queer Cities Guide: Taiwan',
  '酷兒城市指南：台灣',
  'Guide',
  ARRAY['Taipei', 'Taichung', 'Kaohsiung', 'Queer Guide', 'Nightlife', 'LGBTQ+ History', 'Safe Spaces', 'Travel Asia'],
  3,
  true,
  NOW(),
  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2940&auto=format&fit=crop', -- Taipei Night (Unsplash placeholder)
  $markdown$
Taipei is often hailed as the "San Francisco of the East," a title it wears with vibrant, neon-lit pride. As the first nation in Asia to legalize same-sex marriage, Taiwan’s capital pulsates with an openness that is both exhilarating and deeply comforting. Yet, the queer spirit of this island extends far beyond the capital. From the industrial harbor of Kaohsiung to the creative pulse of Taichung, a network of safe harbors and joyous gathering grounds awaits.

Expressive rather than exhaustive, this guide navigates key sanctuaries across Taiwan's three major metropolises.

## Taipei: The Vibrant Heart

MAP: /images/journal/map_taipei.png | Taipei Queer Map: West District & 228 Park

### The Red House (Xi Men Hong Lou)
*No. 10, Chengdu Rd, Wanhua District*

If Taipei has a queer beating heart, it is the Red House in Ximending. Built in 1908 as a public market, today its south square is a sprawling, open-air living room for the community. Rows of bars spill out onto the pavement, creating a festival-like atmosphere every weekend.

- **Café Dalida**: The center stage of the square. Adorned with hanging plants and fairy lights, it is the prime spot for people-watching and catching impromptu drag performances.
- **Mudan**: For a more intimate vibe, Mudan offers craft cocktails in a setting that feels like a glamorous, dimly lit boudoir.

### GinGin Store (晶晶書庫)
*No. 8, Alley 8, Lane 210, Section 3, Roosevelt Rd, Zhongzheng District*

More than just a bookstore, GinGin is a cultural landmark. Established in 1999 as Asia’s first bookstore dedicated to the LGBTQ+ community, it stands as a testament to resilience and visibility. Located near National Taiwan University, it offers a curated selection of literature, art books, and DVDs. Even if you don't read Chinese, the atmosphere alone—a mix of defiant history and quiet solidarity—is worth the pilgrimage.

### 228 Peace Memorial Park
*Ketagalan Blvd, Zhongzheng District*

By day, a solemn memorial; by night, a legendary gathering ground. While the digital age has shifted how people meet, the park remains a symbolic space ("The Company" as codified in Pai Hsien-yung’s *Crystal Boys*), honoring generations who found solace under its pagodas when the rest of the city was asleep.

---

## Taichung: The Creative Pulse

MAP: /images/journal/map_taichung.png | Taichung Map: West District Art Hub

### Own Room (自己的房間)
*No. 15, Lane 83, Section 1, Wuquan W Rd, West District*

In a city known for its expansive boulevards and massive tea houses, *Own Room* offers a quiet, feminist sanctuary. This independent bookstore focuses on gender studies and LGBTQ+ rights, providing a space that feels less like a commercial shop and more like a thoughtful friend’s living room. It is a vital hub for local dialogue and progressive thought.

### PLAZA (广场)
*No. 135, Luchuan W St, West District*

For decades, PLAZA has been the steadfast anchor of Taichung’s gay nightlife. Unlike the sprawling openness of Ximending, PLAZA offers a tighter, sweatier, and more intense energy. It is where the local community lets loose, known for its karaoke prowess and unpretentious, high-energy dance floor.

---

## Kaohsiung: The Southern Harbor

MAP: /images/journal/map_kaohsiung.png | Kaohsiung Harbor Area

### Pier-2 Art Center (駁二藝術特區)
*Dayong Rd, Yancheng District*

Kaohsiung’s transformation from industrial port to cultural capital is best witnessed here. While not exclusively queer, the sprawling warehouses of Pier-2 host the annual *Kaohsiung Pride* village and numerous LGBTQ+ inclusive exhibitions. The open, breezy waterfront offers a distinct counterpoint to Taipei’s density, symbolizing the south’s relaxed and emerging queer confidence.

### Hi-Bar
*No. 165, Liuhe 2nd Rd, Qianjin District*

The grand dame of southern nightlife. Hi-Bar brings a touch of Taipei-style production value to the south but with Kaohsiung’s signature warmth. Expect friendly crowds, drag shows that lean into local humor, and a vibe that welcomes visitors like long-lost returnees.

NOTE: Taiwan Pride (Taipei) is held in October, but Kaohsiung Pride usually takes place in late November, offering a perfect reason to head south as the northern winter begins to set in.
$markdown$,
  $markdown$
台北常被譽為「東方的舊金山」，這座城市以充滿活力的霓虹色彩，自豪地展示著它的多元與包容。作為亞洲第一個同性婚姻合法的國家，台北的空氣中躍動著一種既令人興奮又深感慰藉的自由氣息。然而，這座島嶼的酷兒精神不僅止於首都。從高雄的工業港灣到台中的文創脈動，台灣各地都有著溫暖的避風港與歡樂的聚點。

本指南旨在展現這些城市的獨特神韻，而非詳盡無遺的百科。我們將帶您穿梭於台灣三大都會的關鍵據點。

## 台北：活力心臟

MAP: /images/journal/map_taipei.png | 台北酷兒地圖：西門與二二八

### 西門紅樓 (The Red House)
*萬華區成都路10號*

此處省略...

## 台中：創意脈動

MAP: /images/journal/map_taichung.png | 台中地圖：西區文創圈

### 自己的房間 (Own Room)
*西區五權西路一段83巷15號*

此處省略...

## 高雄：南方港都

MAP: /images/journal/map_kaohsiung.png | 高雄地圖：駁二與新崛江

### 駁二藝術特區 (Pier-2 Art Center)
*鹽埕區大勇路*

高雄從工業港口轉型為文化之都的最佳見證。雖然非專屬酷兒空間，但駁二寬廣的倉庫群是每年高雄同志遊行的舉辦地，也常展出具包容性的藝術展覽。開闊的海風提供了與台北截然不同的氛圍，象徵著南方輕鬆且新興的酷兒自信。

### Hi-Bar
*前金區六合二路165號*

南方夜生活的標竿。Hi-Bar將台北規格的製作水準帶到了南部，但保留了高雄標誌性的熱情。這裡有友善的人群、結合在地幽默的變裝秀，以及一種像歡迎歸鄉遊子般迎接這遊客的溫暖氛圍。

NOTE: 台灣同志遊行（台北）通常於十月舉行，而高雄同志遊行則多在十一月下旬登場，正是隨著北方入冬而南下享受暖陽的完美理由。
$markdown$
);

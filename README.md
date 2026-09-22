Matching Game

React, TypeScript, Vite, Tailwind CSS ve React Router kullanılarak geliştirilmiş bir hafıza eşleştirme oyunudur.

Oyundaki amaç, kartların eşlerini mümkün olan en kısa sürede ve en az hamleyle bulmaktır.

Özellikler

- Kolay, orta ve zor olmak üzere 3 seviye
- Kolay: 4x4 grid
- Orta: 5x5 grid
- Zor: 6x6 grid
- Oyun başlamadan önce 3-2-1 geri sayım
- Süre takibi
- Hamle sayacı
- Kart çevirme animasyonu
- Kart eşleştirme kontrolü
- Oyun tamamlandığında sonuç modalı
- Yeni oyun başlatma
- Ana sayfaya dönüş
- Responsive tasarım
- Sticky oyun header'ı
- Tailwind CSS ile stillendirme
- TypeScript kullanımı
- Absolute path import yapısı

Component Yapısı
HomePage Oyunun ana sayfasıdır.

Kullanıcı burada:

- Kolay
- Orta
- Zor

seviyelerinden birini seçer. Seçilen seviyeye göre React Router ile oyun sayfasına yönlendirme yapılır.

GamePage URL içerisindeki zorluk seviyesini okur.

Örneğin: /game/easy adresinde:
difficulty = "easy" değeri alınır. Daha sonra ilgili oyun ayarı  GAME_CONFIG  içerisinden bulunur ve  GameSession  componentine gönderilir.
GamePage  içerisinde oyun state'i veya kart eşleştirme işlemi bulunmaz.

GameSession Oyunun genel akışını yönetir.

Oyunun aşamaları:  
countdown
↓
playing
↓
finishing
↓
finished

Burada yönetilen temel bilgiler:
- Oyunun mevcut aşaması
- Oyun sonucu
- Yeni oyun başlatma
- Timer ve GameBoard arasındaki iletişim
- Sonuç modalının açılması

Countdown Oyunun başındaki geri sayımı yönetir.
count  state'i doğrudan  Countdown  componenti içerisinde tutulur.
Sayaç tamamlandığında  GameSession  bilgilendirilir ve oyun başlatılır.

GameTimer Oyun süresini hesaplar.
seconds  state'i doğrudan  GameTimer  componentinin içerisindedir.
Her saniyede: seconds + 1 işlemi yapılır.
Oyun tamamlandığında timer durdurulur.

GameBoard Oyunun temel kart mantığını yönetir. Bu component içerisinde bulunan state'ler: 
cards
firstChoiceId
secondChoiceId
boardLocked
moves

GameBoard  şu işlemlerden sorumludur:
- Kart destesini oluşturmak
- Kart seçimini yönetmek
- İki kartı karşılaştırmak
- Eşleşen kartları açık bırakmak
- Eşleşmeyen kartları tekrar kapatmak
- Hamle sayısını artırmak
- Bütün kartların eşleşip eşleşmediğini kontrol etmek. İki kart seçildiğinde bir hamle olarak kabul edilir.

Card Tek bir kartın görünümünü oluşturur.
Kartın iki yüzü bulunur: Kapalı yüz Açık yüz Kart dönüş animasyonu Tailwind CSS ile yapılır.

GameHeader Oyun sayfasının üst kısmını oluşturur.

Burada:
- Seviye bilgisi
- Oyun başlığı
- Süre
- Ana sayfa butonu
- Yeni oyun butonu
bulunur. Header  sticky  yapıdadır ve sayfa aşağı kaydırıldığında üst tarafta sabit kalır.

GameOverModal Bütün kartlar eşleştiğinde açılır.

Modal içerisinde: Süre, Hamle sayısı, Yeni oyun, Ana sayfa bilgileri bulunur.

Oyun Ayarları: Zorluk seviyeleri  gameConfig.ts içerisinde tutulur.

Örnek:   
easy: {
  key: "easy",
  label: "Kolay",
  rows: 4,
  columns: 4,
  pairCount: 8,
  hasBlockedCell: false,
Orta seviyede 5x5 grid toplam 25 hücre oluşturduğu için merkezde bir kilitli alan kullanılır.

Yardımcı Fonksiyonlar
createDeck() 
Seçilen seviyeye göre kart destesini oluşturur.
Örneğin: createDeck(8), 8 farklı sembolden toplam 16 kart üretir. Her sembolden iki adet bulunur.

shuffleArray() 
Kartların sırasını rastgele değiştirir.
Kartların her yeni oyunda farklı konumlarda başlamasını sağlar.

formatTime() 
Saniye değerini dakika ve saniye formatına dönüştürür.
Örnek:75 saniye = 01:15
   
State Yönetimi: State'ler mümkün olduğunca ilgili component içerisinde tutulur.
   
Countdown → count
GameTimer → seconds
GameBoard
→ cards
→ firstChoiceId
→ secondChoiceId
→ boardLocked
→ moves
GameSession
→ phase
→ result
→ gameId

Bu yapı sayesinde  GamePage  gereksiz oyun mantığı içermez ve componentlerin sorumlulukları ayrılmış olur.

Absolute Path Kullanımı: Projede dynamic path yerine  @  alias kullanılır. @  işareti  src  klasörünü temsil eder.

 
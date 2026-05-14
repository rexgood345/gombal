// ===== DAFTAR GOMBAL BUCIN LUCU =====
const gombalList = [
  { text: "Kamu tau nggak sih, kenapa aku sering salah ketik? Karena setiap kali mau nulis sesuatu, yang kepikiran cuma kamu terus.", emoji: "🥺" },
  { text: "Kalau kamu adalah WiFi, aku mau jadi HP yang baterainya nggak pernah habis biar bisa konek sama kamu selamanya.", emoji: "📶" },
  { text: "Aku bukan dokter, tapi aku tau obat buat aku: namanya kamu. Diminum dua kali sehari, pagi sama malam.", emoji: "💊" },
  { text: "Kamu itu kayak mie instan — bikin nagih, bikin hangat, dan aku nggak bisa hidup tanpa kamu.", emoji: "🍜" },
  { text: "Kalau hidup itu kayak Google Maps, kamu adalah tujuan akhirku. Rerouting pun aku tetap balik ke kamu.", emoji: "🗺️" },
  { text: "Aku udah coba diet dari mikirin kamu, tapi gagal terus. Kayaknya kamu emang nggak bisa dikurangin dari hidupku.", emoji: "😩" },
  { text: "Kamu tau nggak, kamu itu kayak charger? Setiap kali aku down, lihat kamu langsung full lagi.", emoji: "🔋" },
  { text: "Kalau kamu adalah hujan, aku mau jadi tanah yang selalu nunggu kamu turun.", emoji: "🌧️" },
  { text: "Aku nggak percaya cinta pada pandangan pertama... sampai aku lihat kamu. Sekarang aku percaya.", emoji: "👀" },
  { text: "Kamu itu kayak kuota internet — kalau habis, hidup aku rasanya nggak ada artinya.", emoji: "📱" },
  { text: "Kalau kamu adalah bintang, aku mau jadi langit malam yang selalu memeluk kamu.", emoji: "⭐" },
  { text: "Aku udah tanya Google 'cara berhenti mikirin seseorang', tapi hasilnya malah foto kamu.", emoji: "🔍" },
  { text: "Kamu tau nggak, senyum kamu itu lebih terang dari layar HP aku yang brightness-nya 100%.", emoji: "😊" },
  { text: "Kalau aku adalah kucing, aku mau jadi kucing kamu — biar bisa minta dielus-elus setiap hari.", emoji: "🐱" },
  { text: "Aku nggak butuh kopi buat melek pagi-pagi, cukup ingat kamu aja, langsung semangat.", emoji: "☕" },
  { text: "Kamu itu kayak playlist favoritku — nggak pernah bosen diulang-ulang.", emoji: "🎵" },
  { text: "Kalau cinta itu adalah PR, aku mau ngerjain kamu seumur hidup tanpa ngeluh.", emoji: "📝" },
  { text: "Kamu tau nggak, setiap kali kamu ketawa, dunia aku jadi lebih berwarna dari filter Instagram manapun.", emoji: "🌈" },
  { text: "Aku bukan tukang sihir, tapi entah kenapa setiap kali lihat kamu, semua masalah aku ilang.", emoji: "✨" },
  { text: "Kalau kamu adalah buku, aku mau jadi pembaca yang nggak pernah bosen baca kamu dari halaman pertama.", emoji: "📖" },
];

let lastIndex = -1;

// ===== GET RANDOM GOMBAL =====
function getGombal() {
  let index;
  do {
    index = Math.floor(Math.random() * gombalList.length);
  } while (index === lastIndex);
  lastIndex = index;

  const { text, emoji } = gombalList[index];
  const textEl  = document.getElementById('gombalText');
  const emojiEl = document.getElementById('cardEmoji');

  // Fade out
  textEl.style.opacity = '0';
  emojiEl.style.opacity = '0';

  setTimeout(() => {
    textEl.textContent  = text;
    emojiEl.textContent = emoji;
    textEl.style.opacity  = '1';
    emojiEl.style.opacity = '1';
  }, 300);

  // Burst flowers on click
  burstFlowers();
}

// ===== SHARE / COPY GOMBAL =====
function shareGombal() {
  const text = document.getElementById('gombalText').textContent.trim();
  if (text === 'Klik tombol di bawah untuk dapat gombal spesial untukmu~') {
    getGombal();
    showToast('🌸 Dapet dulu gombalnya ya~');
    return;
  }

  if (navigator.share) {
    navigator.share({
      title: '💕 Gombal Bucin Lucu',
      text: text,
      url: window.location.href,
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => {
      showToast('💕 Disalin! Kirim ke doi sekarang~');
    }).catch(() => {
      showToast('😅 Salin manual ya, blok teksnya!');
    });
  }
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===== FLOATING FLOWERS BACKGROUND =====
const flowerEmojis = ['🌸', '🌺', '🌼', '🌻', '🌹', '💐', '🌷', '✿', '💮', '🏵️'];

function createFlower() {
  const el = document.createElement('span');
  el.classList.add('flower');
  el.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];

  const size   = Math.random() * 1.2 + 0.8;   // 0.8 – 2rem
  const left   = Math.random() * 100;           // 0 – 100%
  const dur    = Math.random() * 8 + 7;         // 7 – 15s
  const delay  = Math.random() * 10;            // 0 – 10s

  el.style.cssText = `
    left: ${left}%;
    font-size: ${size}rem;
    animation-duration: ${dur}s;
    animation-delay: -${delay}s;
  `;

  document.getElementById('flowersBg').appendChild(el);

  // Remove after animation to avoid DOM bloat
  setTimeout(() => el.remove(), (dur + delay) * 1000);
}

// Spawn flowers continuously
setInterval(createFlower, 600);
// Initial burst
for (let i = 0; i < 18; i++) createFlower();

// ===== BURST FLOWERS ON BUTTON CLICK =====
function burstFlowers() {
  for (let i = 0; i < 10; i++) {
    setTimeout(createFlower, i * 80);
  }
}

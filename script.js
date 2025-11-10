// Sayfanın tamamen yüklenmesini bekle
document.addEventListener('DOMContentLoaded', () => {

    // HTML'deki elementleri seç
    const form = document.getElementById('davaFormu');
    const sonucAlani = document.getElementById('sonucAlani');
    const sonucBaslik = document.getElementById('sonucBaslik');
    const sonucPuan = document.getElementById('sonucPuan');
    const sonucMesaj = document.getElementById('sonucMesaj');
    const gercekCevaplar = document.getElementById('gercekCevaplar');

    // =======================================================================
    // --- BURAYI KENDİ OYUNUNUZA GÖRE DÜZENLEYİN ---
    // =======================================================================

    // 1. Anahtar Kelimeler: Oyuncunun cevabında olması gereken KİLİT kelimeler.
    const ANAHTAR_KELIMELER = {
        ne: ['cinayet', 'zehirleme'], // Oyuncu 'zehirleme' VE 'cinayet' demeli
        nerede: ['kütüphane'],
        nezaman: ['gece yarısı', 'parti sırasında'],
        neden: ['miras', 'intikam'],
        nasil: ['şarap', 'kolye'],
        katil: ['uşak', 'alfred'] // 'Uşak Alfred' cevabını yakalar
    };

    // 2. Gerçek Cevaplar: Başarılı olursa gösterilecek tam cevap metinleri.
    const GERCEK_CEVAPLAR = {
        ne: "Lord Harrington, zehirli bir kolye ile işlenmiş bir cinayete kurban gitti.",
        nerede: "Ceset, Lord'un özel kütüphanesinde bulundu.",
        nezaman: "Cinayet, dün gece yarısı düzenlenen maskeli balo sırasında işlendi.",
        neden: "Katilin motivasyonu, Lord'un vasiyetini değiştirip onu mirastan men etme planıydı.",
        nasil: "Katil, kurbana hediye ettiği kolyenin iğnesine temas eden bir zehir sürdü.",
        katil: "Katil, yıllardır aileye hizmet eden Uşak Alfred'di."
    };

    // 3. Puanlama: Hangi soru kaç puan?
    const PUANLAMA = {
        ne: 10,
        nerede: 10,
        nezaman: 10,
        neden: 20, // Neden daha önemli olabilir
        nasil: 20, // Nasıl daha önemli olabilir
        katil: 30, // Katil en önemlisi
        basariSiniri: 70 // Başarılı sayılmak için gereken minimum puan
    };
    // =======================================================================
    // --- DÜZENLEME ALANI BİTTİ ---
    // =======================================================================


    // Form gönderildiğinde çalışacak fonksiyon
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

        let toplamPuan = 0;

        // Oyuncunun girdiği cevapları al (küçük harfe çevir)
        const oyuncuCevaplari = {
            ne: document.getElementById('ne').value.toLowerCase(),
            nerede: document.getElementById('nerede').value.toLowerCase(),
            nezaman: document.getElementById('nezaman').value.toLowerCase(),
            neden: document.getElementById('neden').value.toLowerCase(),
            nasil: document.getElementById('nasil').value.toLowerCase(),
            katil: document.getElementById('katil').value.toLowerCase()
        };

        // Puanlama Fonksiyonu
        const checkKeywords = (oyuncuCevabi, gerekliKelimeler) => {
            return gerekliKelimeler.every(kelime => oyuncuCevabi.includes(kelime.toLowerCase()));
        };

        // Her bir cevabı kontrol et ve puan ekle
        if (checkKeywords(oyuncuCevaplari.ne, ANAHTAR_KELIMELER.ne)) {
            toplamPuan += PUANLAMA.ne;
        }
        if (checkKeywords(oyuncuCevaplari.nerede, ANAHTAR_KELIMELER.nerede)) {
            toplamPuan += PUANLAMA.nerede;
        }
        if (checkKeywords(oyuncuCevaplari.nezaman, ANAHTAR_KELIMELER.nezaman)) {
            toplamPuan += PUANLAMA.nezaman;
        }
        if (checkKeywords(oyuncuCevaplari.neden, ANAHTAR_KELIMELER.neden)) {
            toplamPuan += PUANLAMA.neden;
        }
        if (checkKeywords(oyuncuCevaplari.nasil, ANAHTAR_KELIMELER.nasıl)) {
            toplamPuan += PUANLAMA.nasil;
        }
        if (checkKeywords(oyuncuCevaplari.katil, ANAHTAR_KELIMELER.katil)) {
            toplamPuan += PUANLAMA.katil;
        }

        // Sonuçları göster
        sonucAlani.classList.remove('hidden');
        sonucPuan.textContent = `Toplam Puanınız: ${toplamPuan} / 100`;

        // Başarı durumunu kontrol et
        if (toplamPuan >= PUANLAMA.basariSiniri) {
            sonucBaslik.textContent = "Dava Çözüldü!";
            sonucBaslik.className = 'basarili';
            sonucMesaj.textContent = "Tebrikler, usta dedektif! Gerçekleri ortaya çıkardınız. İşte davanın tüm detayları:";
            
            // Gerçek cevapları doldur ve göster
            document.getElementById('cevap-ne').textContent = GERCEK_CEVAPLAR.ne;
            document.getElementById('cevap-nerede').textContent = GERCEK_CEVAPLAR.nerede;
            document.getElementById('cevap-nezaman').textContent = GERCEK_CEVAPLAR.nezaman;
            document.getElementById('cevap-neden').textContent = GERCEK_CEVAPLAR.neden;
            document.getElementById('cevap-nasil').textContent = GERCEK_CEVAPLAR.nasil;
            document.getElementById('cevap-katil').textContent = GERCEK_CEVAPLAR.katil;
            
            gercekCevaplar.classList.remove('hidden');
        } else {
            sonucBaslik.textContent = "Dava Başarısız!";
            sonucBaslik.className = 'basarisiz';
            sonucMesaj.textContent = "Neredeyse... Görünüşe göre bazı kritik detayları gözden kaçırdınız. İpuçlarını tekrar inceleyin.";
            
            // Başarısız olduysa cevapları gösterme
            gercekCevaplar.classList.add('hidden');
        }

        // Sayfayı sonuç alanına kaydır
        sonucAlani.scrollIntoView({ behavior: 'smooth' });
    });
});

/* =======================================================
   1. SWIPER JS (GALERİ SLİDER AYARLARI)
   Otomatik sonsuz döngü (loop) ve parmakla/mouse'la kaydırma
======================================================== */
var swiperOptions = {
    slidesPerView: "auto", // Ekrana sığdığı kadar göster
    spaceBetween: 30, // Kartlar arası boşluk
    centeredSlides: false,
    loop: true, // Sonsuz döngü
    autoplay: {
        delay: 2500, // 2.5 saniyede bir otomatik kayar
        disableOnInteraction: false, // Elle kaydırınca otomatik döngü durmaz
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
    }
};

// Hem fotoğraflar hem videolar için Swiper'ı başlat
var photoSwiper = new Swiper(".photoSwiper", swiperOptions);
var videoSwiper = new Swiper(".videoSwiper", { ...swiperOptions, autoplay: { delay: 3500, disableOnInteraction: false } });


/* =======================================================
   2. MODAL İŞLEMLERİ (Harita ve Lightbox/Tam Ekran Medya)
======================================================== */
const mapModal = document.getElementById('mapModal');
const mapIframe = document.getElementById('mapIframe');

const lightboxModal = document.getElementById('lightboxModal');
const lightboxContent = document.getElementById('lightboxContent');

// Haritayı Aç
function openMap(iframeSrc) {
    mapIframe.src = iframeSrc;
    mapModal.classList.add('active');
}

// Haritayı Kapat
function closeMapModal() {
    mapModal.classList.remove('active');
    setTimeout(() => { mapIframe.src = ''; }, 300); // Kapanma animasyonu bitince haritayı sıfırla
}

// Lightbox (Galeri Tam Ekran) Aç
function openLightbox(type, src) {
    lightboxContent.innerHTML = ''; // İçini temizle

    if (type === 'image') {
        lightboxContent.innerHTML = `<img src="${src}" alt="Galeri Büyük Görsel">`;
    } else if (type === 'video') {
        lightboxContent.innerHTML = `<video src="${src}" controls autoplay></video>`;
    }

    lightboxModal.classList.add('active');
}

// Lightbox Kapat
function closeLightbox() {
    lightboxModal.classList.remove('active');
    setTimeout(() => { lightboxContent.innerHTML = ''; }, 300); // Kapanınca videoyu/müziği durdur
}


/* =======================================================
   3. ARAYÜZ, MENU VE KAYDIRMA (SCROLLSPY) ANİMASYONLARI
======================================================== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };
});

// Menü aktif sekme (Scrollspy) takibi
let sections = document.querySelectorAll('section, footer');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 50);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                let targetLink = document.querySelector('header nav a[href*="' + id + '"]');
                if (targetLink) targetLink.classList.add('active');
            });
        }
    });

    // EKRAN EN ALTA DEĞDİĞİNDE KESİNLİKLE "İLETİŞİM" SEÇİLİ OLSUN (Sorunun Çözümü)
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
        navLinks.forEach(links => links.classList.remove('active'));
        let contactLink = document.querySelector('header nav a[href*="contact"]');
        if (contactLink) contactLink.classList.add('active');
    }
});

// ScrollReveal (Sayfa Yüklenirken Gelen Animasyonlar)
const sr = ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: false
});

sr.reveal('.reveal-top', { origin: 'top', interval: 200 });
sr.reveal('.reveal-left', { origin: 'left', interval: 200 });
sr.reveal('.reveal-right', { origin: 'right', delay: 400 });
sr.reveal('.reveal-bottom', { origin: 'bottom', delay: 600 });
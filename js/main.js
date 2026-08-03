/* ==========================================================================
   ARC EDITZ - MAIN JAVASCRIPT & REACTIVE CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Auto-update Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. Sticky Header Nav & Active Link Highlight
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 3. Mobile Navigation Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                if (mobileToggle.querySelector('i')) {
                    mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // 4. Reactive Buttons Audio SFX Feedback
    let audioCtx = null;
    let sfxEnabled = true;
    const sfxBtn = document.getElementById('sfx-btn');

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playBeep(freq = 800, type = 'sine', duration = 0.05) {
        if (!sfxEnabled) return;
        try {
            initAudio();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {}
    }

    if (sfxBtn) {
        sfxBtn.addEventListener('click', function() {
            sfxEnabled = !sfxEnabled;
            const icon = sfxBtn.querySelector('i');
            if (sfxEnabled) {
                icon.className = 'fa-solid fa-volume-high';
                sfxBtn.style.color = 'var(--accent-cyan)';
                playBeep(1200, 'sine', 0.08);
            } else {
                icon.className = 'fa-solid fa-volume-xmark';
                sfxBtn.style.color = 'var(--text-dim)';
            }
        });
    }

    document.querySelectorAll('.reactive-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => playBeep(900, 'sine', 0.03));
        btn.addEventListener('click', () => playBeep(1200, 'triangle', 0.06));
    });

    // 5. Portfolio Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // 6. Lightbox Modal logic
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-img-box').forEach(box => {
        box.addEventListener('click', function() {
            const img = this.querySelector('img');
            const card = this.closest('.gallery-card');
            const title = card ? card.querySelector('h4').textContent : '';

            if (lightboxModal && lightboxImg && img) {
                lightboxImg.src = img.src;
                lightboxCaption.textContent = title;
                lightboxModal.classList.remove('hidden');
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => lightboxModal.classList.add('hidden'));
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.add('hidden');
            }
        });
    }

    // 7. Direct WhatsApp Message Builder Form
    const waForm = document.getElementById('wa-builder-form');
    if (waForm) {
        waForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('c-name').value.trim();
            const service = document.getElementById('c-service').value;
            const message = document.getElementById('c-message').value.trim();

            const text = `Hi ARC Solutions, my name is ${name}.\nI am interested in your service: ${service}.\nDetails: ${message}`;
            const encodedText = encodeURIComponent(text);
            const waUrl = `https://wa.me/237673286459?text=${encodedText}`;

            window.open(waUrl, '_blank');
        });
    }
});

(function () {
  'use strict';

  var filters  = document.querySelectorAll('.gallery__filter');
  var items    = document.querySelectorAll('.gallery__item');
  var lightbox = document.getElementById('lightbox');
  var lbImg    = document.getElementById('lightbox-img');
  var lbCap    = document.getElementById('lightbox-caption');
  var lbClose  = document.getElementById('lightbox-close');
  var lbBack   = document.getElementById('lightbox-backdrop');

  // ── Filtering ────────────────────────────────────────────

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = this.dataset.filter;

      filters.forEach(function (f) { f.classList.remove('is-active'); });
      this.classList.add('is-active');

      items.forEach(function (item) {
        var match = category === 'all' || item.dataset.category === category;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });

  // ── Lightbox ──────────────────────────────────────────────

  function openLightbox(img, caption) {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = caption || img.alt;
    lightbox.hidden = false;
    lbBack.hidden   = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lbBack.hidden   = true;
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.classList.contains('is-hidden')) return;
      var img     = this.querySelector('img');
      var caption = this.querySelector('.gallery__overlay span');
      if (img) openLightbox(img, caption ? caption.textContent : '');
    });

    // Keyboard accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBack.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

})();

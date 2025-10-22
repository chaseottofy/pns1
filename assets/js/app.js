
// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-nav');
if(navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true':'false');
  });
}

// CTA tracking helpers
function track(eventName, params) {
  if (window.gtag) { gtag('event', eventName, params || {}); }
}

document.querySelectorAll('[data-cta]').forEach(el => {
  el.addEventListener('click', () => track('cta_click', {location: el.dataset.cta}));
});

document.querySelectorAll('a[href^="tel:"]').forEach(el => el.addEventListener('click', () => track('click_call')));
document.querySelectorAll('a[href^="sms:"]').forEach(el => el.addEventListener('click', () => track('click_sms')));

// FAQ tracking
document.querySelectorAll('details').forEach((d,i) => {
  d.addEventListener('toggle', () => {
    if (d.open) track('faq_open', {question_id: d.querySelector('summary')?.textContent?.trim() || ('q'+i)});
  });
});

// Quote modal (if present)
const quoteOpeners = document.querySelectorAll('[data-open="quote-modal"]');
const quoteModal = document.getElementById('quote-modal');
const quoteClose = document.querySelector('#quote-modal .close');
if (quoteOpeners && quoteModal) {
  quoteOpeners.forEach(btn => btn.addEventListener('click', (e)=>{
    e.preventDefault();
    quoteModal.classList.add('open');
    track('cta_click', {location:'hero-modal'});
  }));
}
if (quoteClose) quoteClose.addEventListener('click', ()=> quoteModal.classList.remove('open'));
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') quoteModal?.classList.remove('open'); });

// Add-on toggle tracking
document.querySelectorAll('[data-addon]').forEach(el => el.addEventListener('click', ()=> track('add_on_toggle', {name: el.dataset.addon})));

// Netlify form enhancement (no interception so Netlify can capture)

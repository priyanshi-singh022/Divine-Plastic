// Divine Plastic — shared behaviour

// Mobile nav toggle
(function(){
  const toggle = document.querySelector('.nav-toggle');
  if(!toggle) return;
  toggle.addEventListener('click', function(){
    document.body.classList.toggle('nav-open');
    const open = document.body.classList.contains('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.mobile-nav a').forEach(function(a){
    a.addEventListener('click', function(){ document.body.classList.remove('nav-open'); });
  });
})();

// Product filtering — all product cards are already in the HTML (good for SEO);
// this just shows/hides them by category and keeps the count in sync.
(function(){
  const grid = document.querySelector('#all-products-grid');
  if(!grid) return;

  const countEl = document.querySelector('#results-count');
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = grid.querySelectorAll('.product-card');

  function updateCount(n){
    if(countEl) countEl.textContent = `Showing ${n} product${n === 1 ? '' : 's'}`;
  }

  function applyFilter(group){
    let visible = 0;
    cards.forEach(card => {
      const show = group === 'all' || card.dataset.group === group;
      card.style.display = show ? '' : 'none';
      if(show) visible++;
    });
    updateCount(visible);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.group);
    });
  });

  updateCount(cards.length);

  // Respect ?category= in the URL (used by links from the homepage)
  const params = new URLSearchParams(location.search);
  const preset = params.get('category');
  if(preset){
    const match = document.querySelector(`.filter-btn[data-group="${preset}"]`);
    if(match) match.click();
  }
})();

// Contact form: prefill product + friendly mailto submit
(function(){
  const form = document.getElementById('contact-form');
  if(!form) return;

  const params = new URLSearchParams(location.search);
  const product = params.get('product');
  if(product){
    const msgField = form.querySelector('#message');
    if(msgField) msgField.value = `Hi Divine Plastic, I'd like to know more about the ${product}.`;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const message = form.querySelector('#message').value.trim();

    const subject = encodeURIComponent(`Website enquiry from ${name || 'a customer'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:mayankbabariya888@gmail.com?subject=${subject}&body=${body}`;

    const success = document.querySelector('.form-success');
    if(success) success.classList.add('show');
  });
})();

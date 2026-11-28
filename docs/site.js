(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar = document.getElementById('bar');
  var ticking = false;

  function progress() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
    if (bar) bar.style.width = (p * 100).toFixed(2) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(progress);
    }
  }, { passive: true });
  window.addEventListener('resize', progress, { passive: true });
  progress();

  var reveals = document.querySelectorAll('[data-reveal]');
  function showAll() {
    for (var i = 0; i < reveals.length; i++) reveals[i].classList.add('is-in');
  }

  if (reduce || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        ro.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    for (var r = 0; r < reveals.length; r++) ro.observe(reveals[r]);
  }

  // Counters
  var counters = document.querySelectorAll('[data-count]');
  if (!reduce && 'IntersectionObserver' in window) {
    var counted = new WeakSet();
    function countUp(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (!isFinite(target)) return;
      var start = null;
      var dur = 680;
      function step(ts) {
        if (start === null) start = ts;
        var t = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-US');
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('en-US');
      }
      requestAnimationFrame(step);
    }
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || counted.has(entry.target)) return;
        counted.add(entry.target);
        countUp(entry.target);
        co.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    for (var c = 0; c < counters.length; c++) co.observe(counters[c]);
  }

  // Interactive 12-Stage Workbench
  var stageBtns = document.querySelectorAll('[data-stage]');
  var codeLines = document.querySelectorAll('.wb-code .code-line');
  var noteTag = document.getElementById('wb-note-tag');
  var noteText = document.getElementById('wb-note-text');
  var codeBox = document.getElementById('wb-code');

  if (stageBtns.length && codeLines.length) {
    stageBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var stage = btn.getAttribute('data-stage');
        var note = btn.getAttribute('data-note');
        stageBtns.forEach(function (b) {
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        if (noteTag) noteTag.textContent = '<' + stage + '>';
        if (noteText && note) noteText.textContent = note;

        var firstMatch = null;
        codeLines.forEach(function (line) {
          var match = line.getAttribute('data-block') === stage;
          line.classList.toggle('is-active', match);
          if (match && !firstMatch) firstMatch = line;
        });

        if (firstMatch && codeBox) {
          codeBox.scrollTo({
            top: Math.max(0, firstMatch.offsetTop - codeBox.offsetTop - 16),
            behavior: reduce ? 'auto' : 'smooth'
          });
        }
      });
    });
  }

  // Proof filter pills
  var filterBtns = document.querySelectorAll('[data-filter]');
  var caseCards = document.querySelectorAll('[data-case]');
  var railLinks = document.querySelectorAll('[data-rail-link]');

  if (filterBtns.length && caseCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        caseCards.forEach(function (card) {
          var status = card.getAttribute('data-status');
          var show = filter === 'all' || status === filter;
          card.hidden = !show;
        });
        railLinks.forEach(function (link) {
          var status = link.getAttribute('data-status');
          var show = filter === 'all' || status === filter;
          link.hidden = !show;
        });
      });
    });
  }

  // Sticky rail scroll tracking
  if (railLinks.length && caseCards.length && 'IntersectionObserver' in window) {
    var active = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        railLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 });
    caseCards.forEach(function (card) {
      active.observe(card);
    });
  }
})();

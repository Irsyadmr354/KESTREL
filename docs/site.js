(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar = document.getElementById('bar');
  var ticking = false;

  function progress(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
    if(bar) bar.style.width = (p * 100).toFixed(2) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function(){
    if(!ticking){ ticking = true; requestAnimationFrame(progress); }
  }, {passive:true});
  window.addEventListener('resize', progress, {passive:true});
  progress();

  var reveals = document.querySelectorAll('[data-reveal]');
  function showAll(){
    for(var i = 0; i < reveals.length; i++) reveals[i].classList.add('is-in');
  }

  if(reduce || !('IntersectionObserver' in window)){
    showAll();
  } else {
    var ro = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        ro.unobserve(entry.target);
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold:0.08});
    for(var r = 0; r < reveals.length; r++) ro.observe(reveals[r]);
  }

  var counters = document.querySelectorAll('[data-count]');
  if(!reduce && 'IntersectionObserver' in window){
    var counted = new WeakSet();
    function countUp(el){
      var target = parseInt(el.getAttribute('data-count'), 10);
      if(!isFinite(target)) return;
      var start = null;
      var dur = 760;
      function step(ts){
        if(start === null) start = ts;
        var t = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-US');
        if(t < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('en-US');
      }
      requestAnimationFrame(step);
    }
    var co = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting || counted.has(entry.target)) return;
        counted.add(entry.target);
        countUp(entry.target);
        co.unobserve(entry.target);
      });
    }, {threshold:0.6});
    for(var c = 0; c < counters.length; c++) co.observe(counters[c]);
  }

  var railLinks = document.querySelectorAll('[data-rail-link]');
  var cases = document.querySelectorAll('[data-case]');
  if(railLinks.length && cases.length && 'IntersectionObserver' in window){
    var active = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        var id = entry.target.id;
        for(var i = 0; i < railLinks.length; i++){
          var link = railLinks[i];
          if(link.getAttribute('href') === '#' + id) link.setAttribute('aria-current','true');
          else link.removeAttribute('aria-current');
        }
      });
    }, {rootMargin:'-18% 0px -62% 0px', threshold:0});
    for(var k = 0; k < cases.length; k++) active.observe(cases[k]);
  }
})();

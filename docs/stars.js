(function(){
  var els = document.querySelectorAll('.stars');
  if(!els.length) return;
  fetch('https://img.shields.io/github/stars/Irsyadmr354/KESTREL.json', {
    headers: { Accept: 'application/json' },
    cache: 'no-store'
  }).then(function(r){
    if(!r.ok) throw new Error(r.status);
    return r.json();
  }).then(function(d){
    var v = d && d.message ? String(d.message) : '';
    if(!v) return;
    els.forEach(function(el){
      var n = el.querySelector('.num');
      if(n) n.textContent = v;
      el.hidden = false;
    });
  }).catch(function(){});
})();

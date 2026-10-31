(function(){
  var els = document.querySelectorAll('.stars');
  if(!els.length) return;
  var REPO = 'Irsyadmr354/KESTREL';

  function paint(v){
    if(v === null || v === undefined || v === '') return;
    var s = (typeof v === 'number') ? v.toLocaleString('en-US') : String(v);
    els.forEach(function(el){
      var n = el.querySelector('.num');
      if(n) n.textContent = s;
      el.hidden = false;
    });
  }

  function shields(){
    return fetch('https://img.shields.io/github/stars/' + REPO + '.json', {
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    }).then(function(r){
      if(!r.ok) throw new Error(r.status);
      return r.json();
    }).then(function(d){
      if(d && d.message) paint(d.message);
    });
  }

  fetch('https://api.github.com/repos/' + REPO + '?t=' + Date.now(), {
    headers: { Accept: 'application/vnd.github+json' },
    cache: 'no-store'
  }).then(function(r){
    if(!r.ok) throw new Error(r.status);
    return r.json();
  }).then(function(d){
    if(typeof d.stargazers_count !== 'number') throw new Error('no count');
    paint(d.stargazers_count);
  }).catch(function(){
    return shields().catch(function(){});
  });
})();
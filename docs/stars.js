(function(){
  var els = document.querySelectorAll('.stars');
  if(!els.length) return;
  fetch('https://api.github.com/repos/Irsyadmr354/KESTREL', {
    headers: { Accept: 'application/vnd.github+json' },
    cache: 'no-store'
  }).then(function(r){
    if(!r.ok) throw new Error(r.status);
    return r.json();
  }).then(function(d){
    if(typeof d.stargazers_count !== 'number') return;
    var v = d.stargazers_count.toLocaleString('en-US');
    els.forEach(function(el){
      var n = el.querySelector('.num');
      if(n) n.textContent = v;
      el.hidden = false;
    });
  }).catch(function(){});
})();

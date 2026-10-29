(function(){
  var el = document.getElementById('stars');
  var num = document.getElementById('stars-num');
  if(!el || !num) return;
  fetch('https://api.github.com/repos/Irsyadmr354/KESTREL', {
    headers: { Accept: 'application/vnd.github+json' },
    cache: 'no-store'
  }).then(function(r){
    if(!r.ok) throw new Error(r.status);
    return r.json();
  }).then(function(d){
    if(typeof d.stargazers_count !== 'number') return;
    num.textContent = d.stargazers_count.toLocaleString('en-US');
    el.hidden = false;
  }).catch(function(){});
})();

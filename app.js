const K='ep_',get=(k,d)=>{try{return JSON.parse(localStorage.getItem(K+k))??d}catch{return d}},set=(k,v)=>{try{localStorage.setItem(K+k,JSON.stringify(v))}catch{}};
const STAGES=['formal','informal','sharp','curve','journal'];
function paint(){const d=get('done',[]),p=Math.round(d.length/STAGES.length*100);
document.querySelectorAll('[data-bar]').forEach(b=>b.style.width=p+'%');
document.querySelectorAll('[data-pct]').forEach(t=>t.textContent=p+'% of Quarter 1 complete'+(p==100?' 🎉 Quarter 1 cleared!':''));
document.querySelectorAll('[data-stage]').forEach(b=>{const on=d.includes(b.dataset.stage);b.classList.toggle('done',on);b.textContent=on?'Completed ✓':'Mark complete ✓'})}
document.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>{let d=get('done',[]);d=d.includes(b.dataset.stage)?d.filter(x=>x!=b.dataset.stage):[...d,b.dataset.stage];set('done',d);paint()});
paint();
const hb=document.getElementById('hbar');if(hb){const r=()=>{const h=get('hours',0);hb.style.width=Math.min(h/10*100,100)+'%';document.getElementById('htxt').textContent=h+' / 10 hours'};
document.getElementById('addh').onclick=()=>{const v=parseFloat(document.getElementById('hrs').value);if(v>0){set('hours',Math.round((get('hours',0)+v)*100)/100);document.getElementById('hrs').value='';r()}};r()}
const ql=document.getElementById('quotes');if(ql){const r=()=>{ql.textContent='';get('quotes',[]).forEach(t=>{const c=document.createElement('div');c.className='card';c.textContent='“'+t+'”';ql.append(c)})};
document.getElementById('addq').onclick=()=>{const i=document.getElementById('q');if(i.value.trim()){set('quotes',[i.value.trim(),...get('quotes',[])]);i.value='';r()}};r()}

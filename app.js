const K='fgc_web_v1';let db=JSON.parse(localStorage.getItem(K)||'{"reports":[],"money":[]}');
const save=()=>{localStorage.setItem(K,JSON.stringify(db));render()};
const faDate=()=>new Intl.DateTimeFormat('fa-IR',{dateStyle:'full'}).format(new Date());
document.getElementById('date').textContent=faDate();
document.getElementById('reportForm').onsubmit=e=>{e.preventDefault();db.reports.unshift({project:project.value,place:place.value,hours:hours.value,desc:desc.value,date:faDate()});e.target.reset();save()};
document.getElementById('moneyForm').onsubmit=e=>{e.preventDefault();db.money.unshift({type:type.value,amount:Number(amount.value),desc:moneyDesc.value,date:faDate()});e.target.reset();save()};
function render(){projects.textContent=new Set(db.reports.map(x=>x.project)).size;reports.textContent=db.reports.length;let c=db.money.filter(x=>x.type==='cost').reduce((a,x)=>a+x.amount,0);costs.textContent=c.toLocaleString('fa-IR')+' تومان';
reportList.innerHTML=db.reports.slice(0,8).map(x=>`<div class=item><b>${x.project}</b> <span class=muted>${x.date}</span><div>${x.place||''} — ${x.hours||0} ساعت</div><div>${x.desc||''}</div></div>`).join('')||'<div class=muted>هنوز گزارشی ثبت نشده.</div>';
moneyList.innerHTML=db.money.slice(0,8).map(x=>`<div class=item><b>${x.type==='cost'?'هزینه':'واریزی'}: ${x.amount.toLocaleString('fa-IR')} تومان</b><div>${x.desc||''}</div><span class=muted>${x.date}</span></div>`).join('')||'<div class=muted>هنوز موردی ثبت نشده.</div>'}
render();
let deferred;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;install.hidden=false});install.onclick=async()=>{if(deferred){deferred.prompt();deferred=null;install.hidden=true}};
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');

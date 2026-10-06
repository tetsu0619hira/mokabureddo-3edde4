'use strict';
const toggle = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');
function closeMenu(){ nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.querySelector('span').textContent='＋'; }
toggle.addEventListener('click',()=>{ const open=toggle.getAttribute('aria-expanded')!=='true'; nav.classList.toggle('open',open); toggle.setAttribute('aria-expanded',String(open)); toggle.querySelector('span').textContent=open?'−':'＋'; });
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
// Use Japan's date even when the visitor is abroad. No live opening-status claim.
function renderCalendar(){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date());
 const value=type=>Number(parts.find(p=>p.type===type).value);
 const year=value('year'),month=value('month')-1,today=value('day');
 const first=new Date(Date.UTC(year,month,1)).getUTCDay();
 const days=new Date(Date.UTC(year,month+1,0)).getUTCDate();
 const table=document.createElement('table');
 const caption=table.createCaption();caption.textContent=`${year}年 ${month+1}月`;
 const head=table.createTHead().insertRow();
 ['日','月','火','水','木','金','土'].forEach(day=>{const th=document.createElement('th');th.scope='col';th.textContent=day;head.append(th);});
 const body=table.createTBody();
 for(let cell=0;cell<Math.ceil((first+days)/7)*7;cell++){
  if(cell%7===0)body.insertRow();
  const td=body.lastElementChild.insertCell(),day=cell-first+1;
  if(day<1||day>days)continue;
  const span=document.createElement('span');span.textContent=day;td.append(span);
  if(cell%7===3){td.classList.add('closed');td.setAttribute('aria-label',`${day}日 水曜定休（祝日の営業は要確認）`);}
  if(day===today){td.classList.add('today');td.setAttribute('aria-current','date');}
 }
 document.querySelector('#calendar').replaceChildren(table);
}
renderCalendar();
document.addEventListener('visibilitychange',()=>{if(!document.hidden)renderCalendar();});

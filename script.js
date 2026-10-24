(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const root=document.documentElement;
// loader (<1s)
const hide=()=>$('#loader').classList.add('off');addEventListener('load',()=>setTimeout(hide,250));setTimeout(hide,900);
// theme
const tb=$('#theme');const setIcon=()=>tb.firstElementChild.textContent=root.dataset.theme==='dark'?'☀️':'🌙';setIcon();
tb.onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('theme',root.dataset.theme)}catch(e){}setIcon()};
// typing
const words=['Web Developer','Problem Solver','BCA Student'],ty=$('#typed');
if(!rm){let w=0,c=words[0].length,del=true;const tick=()=>{const t=words[w];if(del){c--;if(c<=0){del=false;w=(w+1)%words.length}}else{c++;if(c>=words[w].length){del=true;return setTimeout(tick,1600)}}ty.textContent=words[w].slice(0,c);setTimeout(tick,del?40:80)};setTimeout(tick,1600)}
// glow
if(fine&&!rm){const g=$('#glow');addEventListener('pointermove',e=>{g.style.transform=`translate(${e.clientX}px,${e.clientY}px)`},{passive:true})}
// scroll: progress, back-to-top, active nav
const pb=$('#progress'),tp=$('#top-btn');let tk=false;
addEventListener('scroll',()=>{if(tk)return;tk=true;requestAnimationFrame(()=>{const h=root.scrollHeight-innerHeight;pb.style.transform=`scaleX(${h>0?scrollY/h:0})`;tp.hidden=scrollY<600;tk=false})},{passive:true});
tp.onclick=()=>scrollTo({top:0,behavior:rm?'auto':'smooth'});
const links=$$('.nav nav a'),secs=links.map(a=>$(a.hash));
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'}).observe&&secs.forEach(s=>s&&new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'}).observe(s));
// reveal + count up
const count=el=>{const n=+el.dataset.n,s=el.dataset.s||'';if(rm){el.textContent=n+s;return}let i=0;const t=setInterval(()=>{i++;el.textContent=i+s;if(i>=n)clearInterval(t)},900/n)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');$$('[data-n]',e.target).forEach(count);io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));
// project filters
$$('.filters [data-f]').forEach(b=>b.onclick=()=>{$$('.filters [data-f]').forEach(x=>x.classList.toggle('on',x===b));$$('.card').forEach(c=>c.hidden=b.dataset.f!=='all'&&!c.dataset.c.split(' ').includes(b.dataset.f)||(b.dataset.f==='full'&&c.dataset.c==='tools full'&&false))});
// missing screenshots: show placeholder
$$('.shot img').forEach(i=>{i.onerror=()=>i.remove()});
// tilt
if(fine&&!rm)$$('.tilt').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`});c.addEventListener('pointerleave',()=>c.style.transform='')});
// flip cards
$$('.flip').forEach(f=>f.onclick=()=>f.classList.toggle('on'));
// Q&A
const qa=$('#qa-a'),qd=qa.textContent;$$('#qa [data-a]').forEach(b=>b.onclick=()=>qa.textContent=b.dataset.a);$('#qa-r').onclick=()=>qa.textContent=qd;
// skills
$$('.sk .chip').forEach(c=>{const s=()=>$('#sk-note').textContent=c.dataset.t;c.onmouseenter=s;c.onfocus=s;c.onclick=s});
// contact form (Formspree)
$('#form').addEventListener('submit',async e=>{e.preventDefault();const f=e.target,s=$('#form-s');s.textContent='Sending…';
try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});if(r.ok){s.textContent='Thanks! I will reply soon.';f.reset()}else throw 0}catch(_){s.textContent='Could not send. Please email me directly.'}});
// chatbot
const kb=[
[['project','built','work','portfolio'],'I have 6 projects: Lab Aggregator, Weather App, Scholarship Finder, Callwise, Gather, and Pulsewatch (in progress). Scroll to Projects to open any live demo.'],
[['pulse','monitor','uptime','telegram'],'Pulsewatch is an uptime monitor built with FastAPI and SQLite. It checks a site every 60 seconds and sends a Telegram alert when it goes down or recovers. Still in progress, code is on GitHub.'],
[['gather','expense','trip','gemini'],'Gather reads a group trip chat, uses the Gemini API to extract expenses, then calculates the fewest payments needed to settle up.'],
[['scholar','scheme'],'Scholarship Finder matches students to West Bengal scholarships by age, gender, category and income using Flask and PostgreSQL.'],
[['lab','price','pincode'],'Lab Aggregator compares lab test prices by name and pincode, sorted by total price including home collection fee.'],
[['callwise','voice','chatbot'],'Callwise is a voice chatbot: speak or type, and it replies in text and speech.'],
[['weather'],'The Weather App shows temperature, humidity, wind, UV and air quality, with a background that matches conditions.'],
[['skill','stack','tech','language','know'],'Front end: HTML, CSS, JavaScript, React.js. Back end: Python (Flask, FastAPI) and Node.js. Data: PostgreSQL, SQLite. Tools: Git, GitHub, Vercel, Render.'],
[['study','education','college','university','bca','degree'],'Sania is doing a BCA at Aliah University, Kolkata (graduating 2029). She finished ISC at Grace Ling Liang English School in 2025.'],
[['intern','hire','job','available','looking'],'Yes! Sania is looking for a frontend or backend internship. Use the contact form or email saniashamim.98311@gmail.com.'],
[['contact','email','reach','linkedin','phone'],'Email: saniashamim.98311@gmail.com. LinkedIn and GitHub links are in the footer and contact section.'],
[['resume','cv'],'Tap the Resume button in the top bar to download the PDF.'],
[['hi','hello','hey'],'Hello! Ask me about Sania\'s projects, skills or internship availability.']];
const fab=$('#bot-fab'),bot=$('#bot'),log=$('#log'),sug=$('#sug');
const add=(t,c)=>{const d=document.createElement('div');d.className='m '+c;d.textContent=t;log.append(d);log.scrollTop=log.scrollHeight};
const spark=()=>{if(rm)return;const r=fab.getBoundingClientRect();for(let i=0;i<8;i++){const s=document.createElement('span');s.className='spark';s.textContent='✨';s.style.left=r.left+20+'px';s.style.top=r.top+'px';s.style.setProperty('--x',(Math.random()*120-60)+'px');s.style.setProperty('--y',-(Math.random()*100+20)+'px');document.body.append(s);setTimeout(()=>s.remove(),900)}};
const ask=q=>{add(q,'u');const l=q.toLowerCase();const m=kb.find(([k])=>k.some(w=>l.includes(w)));setTimeout(()=>add(m?m[1]:'Hmm, I am not sure. Try asking about projects, skills, education or internships.','b'),rm?0:450)};
['Show projects','Tech stack','Pulsewatch','Hire Sania'].forEach(q=>{const b=document.createElement('button');b.className='chip';b.textContent=q;b.onclick=()=>ask(q==='Hire Sania'?'internship':q);sug.append(b)});
const open=o=>{bot.hidden=!o;fab.setAttribute('aria-expanded',o);if(o){spark();if(!log.children.length)add('Hi! I am Sania\'s assistant ✨ Ask me anything about her work.','b');$('#bot-i').focus()}};
fab.onclick=()=>open(bot.hidden);$('#bot-x').onclick=()=>{open(false);fab.focus()};
addEventListener('keydown',e=>{if(e.key==='Escape'&&!bot.hidden)open(false)});
$('#bot-f').onsubmit=e=>{e.preventDefault();const i=$('#bot-i'),v=i.value.trim();if(v){ask(v);i.value=''}};
})();

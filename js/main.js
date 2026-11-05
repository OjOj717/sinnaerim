/* 화면 전환과 사용자 동작. 점수 계산은 data.js의 scoreAnswers에서 수행합니다. */
(() => {
  'use strict';
  const {questions,gods,scoreAnswers,evidenceFor} = window.SIN_DATA;
  const art=window.SIN_ART;
  const app=document.getElementById('app');
  const dialog=document.getElementById('about-dialog');
  const KEY='sinnaerim-journey-v1';
  let state={answers:[],phase:'question'};
  let toastTimer;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  try {
    const saved=JSON.parse(sessionStorage.getItem(KEY));
    if(saved && Array.isArray(saved.answers) && saved.answers.length<=8 && saved.answers.every(a=>a===0||a===1) && ['question','feedback','reveal','result'].includes(saved.phase)) state=saved;
  } catch (_) { /* 시크릿 모드나 저장소 차단이어도 실행됩니다. */ }
  function save(){try{sessionStorage.setItem(KEY,JSON.stringify(state));}catch(_){}}
  function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2800);}
  function show(html){app.innerHTML=`<div class="page-enter">${html}</div>`;window.scrollTo({top:0,behavior:'instant'});app.focus({preventScroll:true});}
  function go(hash){if(location.hash===hash)render();else location.hash=hash;}
  function guide(message){return `<div class="guide"><div class="guide-avatar">${art.guide}</div><div><div class="guide-label">길잡이 · 버추얼 무당</div><p>${esc(message)}</p></div></div>`;}
  function home(){
    const resume=state.answers.length>0?`<div class="resume"><button data-action="resume">${state.answers.length===8?'내 결과 다시 보기':`${state.answers.length}번째 선택부터 이어가기`} →</button><button class="text-button" data-action="restart">처음부터</button></div>`:'';
    show(`<section class="hero"><div class="hero-copy"><p class="eyebrow">EIGHT PATHS, ONE GUARDIAN</p><h1>신<span style="color:var(--gold)">神</span>내림<small>여덟 갈림길</small></h1><p class="lead">당신은 무엇을 지키며<br>여기까지 왔나요?</p><p class="subcopy">지도를 벗어난 밤길, 여덟 번의 선택.<br>그 끝에서 당신에게 찾아올 신을 만나보세요.</p><div class="hero-actions"><button class="button" data-action="start">나의 신 만나러 가기 <span aria-hidden="true">→</span></button>${resume}<div class="meta"><span>약 3분</span><span>8개의 선택</span><span>6명의 신</span></div><button class="text-button" data-action="gallery">어떤 신들이 기다릴까? <span aria-hidden="true">↗</span></button><p class="intro-note">한국 신화에서 영감을 얻은 이야기형 성격테스트<br>오늘의 당신과 가까운 길을 골라주세요.</p></div></div><div class="hero-visual">${art.scene('gate')}<span class="vertical-note">잊힌 신들이 당신을 찾아왔다</span><span class="visual-caption">THE GATE IS OPEN</span></div></section>`);
  }
  function prologue(){show(`<section class="prologue"><p class="eyebrow">PROLOGUE · 청신의 문</p><h2>지도에 없는 마을</h2>${art.scene('gate')}<p class="narrative">하루를 마치고 돌아가던 길.\n늘 지나던 골목 끝에 낯선 문이 생겼습니다.\n문 너머에서 한 사람이 당신을 기다립니다.</p>${guide('어서 오세요. 이곳에서는 당신이 고른 길로 신을 청합니다. 여덟 갈림길을 지나며 오늘의 마음과 가까운 쪽으로 걸어주세요.')}<button class="button" data-action="begin">문을 지나가기 <span aria-hidden="true">→</span></button><p class="footnote">정답은 없습니다. 답을 바꾸고 싶으면 한 걸음 돌아가도 좋아요.</p></section>`);}
  function progress(i){return `<div class="progress-head"><button data-action="back">← 한 걸음 뒤로</button><span>${String(i+1).padStart(2,'0')} / 08</span></div><div class="steps" role="progressbar" aria-label="여정 진행" aria-valuemin="0" aria-valuemax="8" aria-valuenow="${i}">${questions.map((_,j)=>`<span class="step ${j<i?'done':j===i?'active':''}"></span>`).join('')}</div>`;}
  function question(){
    const i=state.answers.length;
    if(i>=8){state.phase='reveal';save();return reveal();}
    const q=questions[i];
    show(`<section class="journey">${progress(i)}<p class="chapter">${esc(q.chapter)}</p><h1 class="question-title">${esc(q.title)}</h1>${art.scene(q.scene,true)}<p class="story">${esc(q.story)}</p>${guide(q.prompt)}<div class="choices">${q.choices.map((c,a)=>`<button class="choice" data-action="choose" data-choice="${a}"><span class="choice-letter">${a?'B':'A'}</span><span><span class="choice-title">${esc(c.text)}</span><span class="choice-hint">${esc(c.hint)}</span></span></button>`).join('')}</div><p class="footnote">마음이 향하는 길을 하나 골라주세요.</p></section>`);
  }
  function feedback(){
    const i=state.answers.length-1;
    if(i<0)return question();
    const c=questions[i].choices[state.answers[i]];
    show(`<section class="journey">${progress(i)}<div class="transition"><div class="guide-avatar">${art.guide}</div><p class="eyebrow">당신의 선택을 기억합니다</p><h2>${esc(c.reply)}</h2><p class="selected-path">${esc(c.text)}</p><button class="button" data-action="next">${i===7?'문 너머의 신 만나기':'다음 갈림길로'} <span aria-hidden="true">→</span></button><button class="text-button" data-action="back">이 선택 다시 고르기</button></div></section>`);
  }
  function reveal(){
    if(state.answers.length!==8)return question();
    const result=scoreAnswers(state.answers), g=gods[result.god];
    const evidence=evidenceFor(state.answers,result.god);
    show(`<section class="reveal"><div class="guide-avatar">${art.guide}</div><p class="eyebrow" style="margin-top:20px">여덟 갈림길의 끝</p><h2>${result.hidden?'잠깐, 다른 신이<br>당신을 부릅니다.':'당신이 지나온 길을<br>지켜본 신이 있습니다.'}</h2><p>${evidence.map(esc).join('<br>')}</p><div style="--accent:${g.color}">${art.deity(g.object)}</div><p>${result.hidden?'“왜 다들 네가 더 참으라고만 하느냐.”':'“이제, 당신에게 건넬 말을 들을 시간입니다.”'}</p><button class="button" data-action="result">나에게 내린 신 확인하기</button></section>`);
  }
  function resultPage(id,preview=false){
    const g=gods[id]; if(!g)return home();
    const evidence=preview?[]:evidenceFor(state.answers,id);
    show(`<section class="result" style="--accent:${g.color}">${preview?'<div class="preview-banner">결과 미리보기 · 실제 답변으로 받은 결과가 아닙니다.</div>':''}<div class="result-top"><p class="eyebrow">${id==='H'?'HIDDEN GUARDIAN · 숨겨진 신':'YOUR GUARDIAN · '+esc(g.direction)}</p><h1>${esc(g.name)}</h1><p class="result-type">${esc(g.type)}</p><div class="result-art">${art.deity(g.object)}</div><div class="tags">${g.tags.map(t=>`<span>#${esc(t)}</span>`).join('')}</div></div><div class="oracle"><p class="eyebrow">당신에게 건네는 말</p><blockquote>${esc(g.oracle)}</blockquote></div><p class="result-intro">${esc(g.intro)}</p>${evidence.length?`<div class="result-section"><h2>당신이 걸어온 길</h2><ul>${evidence.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`:''}<div class="two-cols"><div class="result-section"><h2>당신이 가진 힘</h2><p>${esc(g.strength)}</p></div><div class="result-section"><h2>잠시 쉬어도 되는 순간</h2><p>${esc(g.care)}</p></div></div><div class="mission"><h2>오늘의 작은 실천</h2><p>${esc(g.mission)}</p></div><div class="result-actions"><button class="button" data-action="download" data-god="${id}" data-preview="${preview}">카드 이미지 저장 ↓</button><button class="button secondary" data-action="share" data-god="${id}" data-preview="${preview}">결과 공유하기 ↗</button><button class="button secondary wide" data-action="restart">나의 길 다시 걷기</button></div><details><summary>이 신의 원래 이야기가 궁금하다면</summary><p>${esc(g.lore)}</p><a href="${g.source}" target="_blank" rel="noopener noreferrer">전승 자료 읽기 ↗</a><p>성격 유형·방위 배치·신탁·일러스트는 전시 기획을 위한 현대적 창작입니다.</p></details><div style="text-align:center"><button class="text-button" data-action="gallery">다른 신들도 만나보기 →</button></div><p class="footnote">오늘의 선택을 해석한 이야기입니다. 당신의 모든 모습을 규정하지 않습니다.</p></section>`);
  }
  function gallery(){show(`<section class="gallery"><p class="eyebrow">MEET THE GUARDIANS</p><h1>여섯 신의 이야기</h1><p>각각 다른 힘으로 당신의 길을 지켜봅니다.<br>신을 누르면 결과 카드를 미리 볼 수 있어요.</p><div class="god-grid">${Object.entries(gods).map(([id,g])=>`<button class="god-tile" style="--accent:${g.color}" data-action="preview" data-god="${id}"><small>${id==='H'?'HIDDEN':esc(g.direction)}</small>${art.deity(g.object)}<h2>${esc(g.name)}</h2><p>${esc(g.type)}</p></button>`).join('')}</div><button class="button secondary" data-action="home">처음으로 돌아가기</button>${state.answers.length===8?'<button class="text-button" data-action="own-result">내 결과 다시 보기 →</button>':''}</section>`);}
  function render(){
    const hash=location.hash;
    if(hash==='#prologue')return prologue();
    if(hash==='#journey')return state.phase==='feedback'?feedback():state.phase==='reveal'?reveal():state.phase==='result'&&state.answers.length===8?resultPage(scoreAnswers(state.answers).god):question();
    if(hash==='#result'&&state.answers.length===8)return resultPage(scoreAnswers(state.answers).god);
    if(hash==='#gods')return gallery();
    if(/^#god=[EJSBKH]$/.test(hash))return resultPage(hash.slice(-1),true);
    home();
  }
  function restart(){state={answers:[],phase:'question'};save();go('#prologue');}
  app.addEventListener('click',async event=>{
    const button=event.target.closest('button[data-action]'); if(!button)return;
    const action=button.dataset.action;
    if(action==='home')go('#home');
    if(action==='start')go('#prologue');
    if(action==='begin'||action==='restart'){
      if(action==='restart')return restart();
      state={answers:[],phase:'question'};save();go('#journey');
    }
    if(action==='resume')go(state.answers.length===8?'#result':'#journey');
    if(action==='gallery')go('#gods');
    if(action==='preview')go('#god='+button.dataset.god);
    if(action==='own-result')go('#result');
    if(action==='choose'&&state.answers.length<8&&state.phase==='question'){
      state.answers.push(Number(button.dataset.choice));state.phase='feedback';save();feedback();
    }
    if(action==='next'){
      state.phase=state.answers.length===8?'reveal':'question';save();render();
    }
    if(action==='back'){
      if(state.answers.length){state.answers.pop();state.phase='question';save();question();}
      else go('#prologue');
    }
    if(action==='result'){state.phase='result';save();go('#result');}
    if(action==='share')await share(button.dataset.god,button.dataset.preview==='true');
    if(action==='download'){
      button.disabled=true;button.textContent='카드를 그리고 있어요…';
      try{await downloadCard(button.dataset.god,button.dataset.preview==='true');toast('이미지를 저장했습니다. 다운로드 목록을 확인해주세요.');}
      catch(_){toast('이미지 저장이 어려워요. 화면 캡처로 간직해주세요.');}
      finally{button.disabled=false;button.textContent='카드 이미지 저장 ↓';}
    }
  });
  async function share(id,preview){
    const g=gods[id];const url=new URL(location.href);url.hash='god='+id;
    const title=preview?`${g.name} · 신내림 결과 미리보기`:`내게 내린 신은 ${g.name}`;
    const text=`${title}\n${g.type}\n“${g.oracle.replace(/\n/g,' ')}”\n당신에게 찾아올 신은?`;
    if(location.protocol==='file:'){toast('GitHub Pages에 올린 뒤 공유 링크를 사용할 수 있어요.');return;}
    try{
      if(navigator.share){await navigator.share({title,text,url:url.href});return;}
      await navigator.clipboard.writeText(text+'\n'+url.href);toast('결과 링크와 소개를 복사했습니다.');
    }catch(error){
      if(error.name==='AbortError')return;
      // 클립보드 권한이 막힌 환경에서도 직접 복사할 수 있습니다.
      const d=document.createElement('dialog');d.innerHTML=`<h2>결과 링크 복사</h2><p>아래 주소를 길게 눌러 복사해주세요.</p><input aria-label="공유 주소" readonly style="width:100%;padding:12px;background:#102024;color:#eee;border:1px solid #aaa" value="${esc(url.href)}"><button class="button" style="margin-top:20px">닫기</button>`;
      document.body.append(d);d.querySelector('button').onclick=()=>d.close();d.onclose=()=>d.remove();d.showModal();d.querySelector('input').select();
    }
  }
  async function downloadCard(id,preview){
    const g=gods[id];const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;const ctx=canvas.getContext('2d');
    ctx.fillStyle='#111e22';ctx.fillRect(0,0,1080,1440);ctx.strokeStyle=g.color;ctx.lineWidth=2;ctx.strokeRect(50,50,980,1340);
    ctx.textAlign='center';ctx.fillStyle=g.color;ctx.font='22px "Malgun Gothic", sans-serif';ctx.fillText(preview?'신내림 · 결과 미리보기':'신내림 · 나에게 찾아온 신',540,130);
    ctx.fillStyle='#eee8dc';ctx.font='72px Batang, serif';ctx.fillText(g.name,540,245);ctx.font='30px "Malgun Gothic", sans-serif';ctx.fillStyle=g.color;ctx.fillText(g.type,540,310);
    const svg=art.deity(g.object).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replaceAll('currentColor',g.color);
    const blob=new Blob([svg],{type:'image/svg+xml'});const objectURL=URL.createObjectURL(blob);
    try{const img=new Image();await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=objectURL;});ctx.drawImage(img,240,345,600,500);}finally{URL.revokeObjectURL(objectURL);}
    ctx.fillStyle=g.color;ctx.font='22px "Malgun Gothic", sans-serif';ctx.fillText('당신에게 건네는 말',540,900);
    ctx.fillStyle='#eee8dc';ctx.font='36px Batang, serif';
    let y=980;for(const line of g.oracle.split('\n')){ctx.fillText(line,540,y,900);y+=64;}
    ctx.fillStyle='#a6b4b3';ctx.font='22px "Malgun Gothic", sans-serif';ctx.fillText('신을 부르는 여덟 갈림길',540,1280);ctx.font='18px "Malgun Gothic", sans-serif';ctx.fillText('한국 신화에서 영감을 얻은 이야기형 성격테스트',540,1320);
    const png=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!png)throw new Error('이미지 생성 실패');
    const url=URL.createObjectURL(png);const link=document.createElement('a');link.href=url;link.download=`신내림_${g.name}${preview?'_미리보기':''}.png`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
  }
  document.getElementById('home-button').onclick=()=>go('#home');
  document.getElementById('about-button').onclick=()=>dialog.showModal();
  document.getElementById('close-about').onclick=()=>dialog.close();
  document.getElementById('clear-session').onclick=()=>{state={answers:[],phase:'question'};try{sessionStorage.removeItem(KEY);}catch(_){}dialog.close();go('#home');toast('이 탭의 진행 기록을 지웠습니다.');};
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  window.addEventListener('hashchange',render);
  render();
})();

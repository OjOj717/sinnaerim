const assert=require('node:assert/strict');
const {questions,gods,scoreAnswers,evidenceFor}=require('../js/data.js');
const counts={E:0,J:0,S:0,B:0,K:0,H:0};
const maxima={E:0,J:0,S:0,B:0,K:0};
for(let n=0;n<256;n++){
  const a=Array.from({length:8},(_,i)=>(n>>(7-i))&1);
  const r=scoreAnswers(a);assert(gods[r.god]);counts[r.god]++;
  assert.equal(r.hidden,a[1]===1&&a[3]===1&&a[5]===0&&a[7]===1);
  assert.equal(scoreAnswers([...a]).god,r.god);
  for(const g in maxima)maxima[g]=Math.max(maxima[g],r.scores[g]);
  assert.equal(evidenceFor(a,r.god).length,2);
  if(!r.hidden){
    assert.equal(r.scores[r.god],Math.max(...Object.values(r.scores)));
    for(const line of evidenceFor(a,r.god)) assert(a.some((choice,i)=>questions[i].choices[choice].evidence===line&&questions[i].choices[choice].scores[r.god]));
  }
}
assert.deepEqual(counts,{E:44,J:51,S:30,B:68,K:47,H:16});
assert(Object.values(maxima).every(v=>v===7));
for(const bad of [[],[0,0,0,0,0,0,0,2],Array(9).fill(0),null])assert.throws(()=>scoreAnswers(bad));
console.log('PASS: 256 routes; all six results reachable; hidden conditions; actual-answer evidence; invalid input rejection.');
console.log(counts);


/* 문항·대사·결과를 수정하는 파일. 신 코드: E 영등, J 조왕, S 성주, B 바리, K 강림, H 측신 */
(function (root) {
  const questions = [
    {title:'두 개의 등불', scene:'gate', chapter:'낯선 마을에 들어서다', story:'마을 입구에 등불 두 개가 켜집니다.\n한쪽에서는 낯선 물소리가, 다른 쪽에는 사람들이 오간 발자국이 보입니다.', prompt:'어느 길로 들어가겠어요?',
      choices:[
        {text:'처음 듣는 물소리를 따라간다',hint:'아직 모르는 곳으로',scores:{E:2},reply:'아직 모르는 곳에도 길은 있지요.',evidence:'낯선 물소리를 따라 새로운 길로 들어갔습니다.'},
        {text:'발자국이 남은 길을 따라간다',hint:'누군가 지나온 길로',scores:{S:2},reply:'지나온 흔적은 발밑을 단단하게 해주지요.',evidence:'발자국이 남은 길에서 시작할 기반을 찾았습니다.'}
      ]},
    {title:'문밖의 손님',scene:'door',chapter:'누군가를 맞이하다',story:'몸을 녹이려고 들어간 빈집.\n문밖에서 목소리가 들립니다.\n“잠깐 쉬어가도 될까요?”',prompt:'당신은 무엇을 먼저 하겠어요?',
      choices:[
        {text:'쉴 자리를 마련하고 들어오라고 한다',hint:'먼저 온기를 내어준다',scores:{J:2},reply:'누군가를 위한 자리를 먼저 만드는군요.',evidence:'문밖의 손님에게 쉴 자리를 먼저 마련했습니다.'},
        {text:'필요한 도움을 묻고 맞을 준비를 한다',hint:'서로 편안할 거리를 살핀다',scores:{S:2},reply:'맞아들이기 전에 필요한 것을 살피는군요.',evidence:'도움을 주기 전에 상대에게 필요한 것을 확인했습니다.',hidden:true}
      ]},
    {title:'끊어진 다리',scene:'bridge',chapter:'막힌 길 앞에 서다',story:'다음 골목으로 가는 다리가 끊어졌습니다.\n옆에는 샛길이, 다리 곁에는 다시 놓을 널빤지가 있습니다. 두 길 모두 건널 수 있어 보입니다.',prompt:'어떻게 건너겠어요?',
      choices:[
        {text:'샛길에서 다른 건널목을 찾는다',hint:'방향을 바꾸어본다',scores:{E:2},reply:'길이 끊겨도 방향까지 사라지는 것은 아니지요.',evidence:'끊어진 다리 앞에서 다른 건널목을 찾았습니다.'},
        {text:'널빤지로 끊어진 길을 다시 잇는다',hint:'다시 걸을 수 있게 만든다',scores:{B:2},reply:'끊어진 자리에서 다시 시작하는군요.',evidence:'널빤지를 놓아 끊어진 길을 다시 이었습니다.'}
      ]},
    {title:'오래된 약속',scene:'letter',chapter:'남겨진 마음을 만나다',story:'우체통에 편지 한 장이 남아 있습니다.\n“여기서 만나자.”\n하지만 약속한 이는 이미 다른 곳으로 떠났다고 합니다.',prompt:'이 약속을 어떻게 정리할까요?',
      choices:[
        {text:'지금이라도 전할 새 편지를 쓴다',hint:'다른 모습으로 이어본다',scores:{B:2},reply:'달라진 모습으로라도 마음을 이어보는군요.',evidence:'오래된 약속에 새 편지를 보내 마음을 이으려 했습니다.'},
        {text:'여기까지였다고 적고 편지를 접는다',hint:'끝을 정하고 다음으로 간다',scores:{K:2},reply:'끝을 정하는 일도 하나의 대답이지요.',evidence:'끝난 약속을 인정하고 편지를 접었습니다.',hidden:true}
      ]},
    {title:'출발 전의 마당',scene:'lights',chapter:'함께 갈 사람을 만나다',story:'마을을 떠날 사람들이 모였습니다.\n몇몇은 지쳐 앉아 있고, 출발 준비도 남았습니다. 모두가 일을 나누어 맡기 시작합니다.',prompt:'당신은 어떤 일을 맡겠어요?',
      choices:[
        {text:'지친 사람에게 물과 쉴 자리를 챙긴다',hint:'함께 갈 사람의 상태를 살핀다',scores:{J:2},reply:'함께 가는 이의 목마름을 알아보는군요.',evidence:'출발 전에 지친 사람에게 물과 쉼을 챙겼습니다.'},
        {text:'남은 준비와 출발 순서를 정리한다',hint:'움직일 다음 순서를 만든다',scores:{K:2},reply:'모두가 움직일 수 있는 순서를 만드는군요.',evidence:'남은 준비와 출발 순서를 정리했습니다.'}
      ]},
    {title:'무거워진 가방',scene:'bag',chapter:'내려놓을 것을 고르다',story:'가방 속에 두 장의 종이가 들어 있습니다.\n“다른 사람의 기대를 모두 들어줘야 한다.”\n“내가 맡은 일은 완벽하게 해내야 한다.”',prompt:'지금 하나를 내려놓는다면?',
      choices:[
        {text:'모두의 기대를 들어줘야 한다는 마음',hint:'모든 부름이 내 몫은 아니니까',scores:{E:1,B:1},reply:'모든 부름에 답하지 않아도 괜찮아요.',evidence:'다른 사람의 기대를 모두 떠맡지 않기로 했습니다.',hidden:true},
        {text:'맡은 일은 완벽해야 한다는 마음',hint:'조금 빈틈이 있어도 괜찮으니까',scores:{J:1,S:1,K:1},reply:'빈틈이 있어도 당신이 한 일은 남아 있어요.',evidence:'모든 일을 완벽하게 해내야 한다는 마음을 내려놓았습니다.'}
      ]},
    {title:'작은 등불',scene:'lantern',chapter:'남은 길을 밝히다',story:'내려놓은 종이가 작은 등불이 됩니다.\n이 빛은 당신 앞에 남은 길을 바꿀 수 있다고 합니다.',prompt:'어떤 방식으로 길을 바꾸고 싶나요?',
      choices:[
        {text:'막힌 곳 하나를 크게 열어 흐름을 바꾼다',hint:'새 움직임을 시작한다',scores:{E:1,K:1},reply:'움직임이 시작될 틈을 만드는군요.',evidence:'막힌 곳을 열어 흐름을 바꾸고 싶다고 답했습니다.'},
        {text:'작은 불빛을 이어 계속 걸을 수 있게 한다',hint:'오래 이어갈 힘을 만든다',scores:{J:1,S:1,B:1},reply:'길이 오래 이어질 힘을 만드는군요.',evidence:'작은 불빛을 이어 계속 걸을 힘을 만들고 싶다고 답했습니다.'}
      ]},
    {title:'마지막 문',scene:'gate',chapter:'나에게 필요한 것을 말하다',story:'마침내 마을 끝에 도착했습니다.\n문 너머의 누군가가 묻습니다.\n“여기까지 온 당신에게, 지금 어떤 도움이 필요하냐.”',prompt:'어떤 대답을 건네겠어요?',
      choices:[
        {text:'잠깐 곁에 있어 줘. 이야기하고 싶어',hint:'함께 마음을 정리한다',scores:{J:1,B:1},reply:'알겠어요. 당신 곁에서 잠시 기다릴게요.',evidence:'곁에서 함께 이야기를 나눠줄 존재를 원했습니다.'},
        {text:'잠깐 혼자 정리할게. 필요할 때 부를게',hint:'나에게 필요한 공간을 만든다',scores:{E:1,S:1,K:1},reply:'알겠어요. 당신이 고른 거리에서 기다릴게요.',evidence:'혼자 정리할 시간을 요청하고 자기 공간을 지켰습니다.',hidden:true}
      ]}
  ];
  const gods = {
    E:{name:'영등할망',type:'길을 여는 사람',direction:'동 · 청',color:'#87bfc3',object:'wind',tags:['가능성','변화','새로운 길'],intro:'길이 막혔을 때, 다른 방향의 가능성을 찾는 당신.',strength:'변화를 빠르게 알아차리고 새로운 시도를 시작합니다. 익숙한 답 밖에서도 길을 찾을 줄 압니다.',care:'계속 움직여야만 괜찮은 사람처럼 느껴질 수 있어요. 멈추는 시간도 당신의 여정에 포함됩니다.',oracle:'바람이 바뀌면\n방향을 바꾸어도 된다.\n잠시 멈추어도 길은 사라지지 않는다.',mission:'평소와 다른 작은 선택을 하나 해보세요. 돌아가는 길이어도 좋습니다.',lore:'제주에서 바람과 바다의 풍요에 관계하는 신으로 모셔집니다. 음력 2월에 맞이하고 보내는 영등굿과 연결됩니다.',source:'https://ichlinks.com/archive/elements/elementsV.do?contentsI18NCd=ko-KR&elementsUid=13829896120372900162'},
    J:{name:'조왕신',type:'온기를 챙기는 사람',direction:'남 · 적',color:'#e49d88',object:'bowl',tags:['돌봄','온기','알아차림'],intro:'일이 잘되는 것만큼, 그 안의 사람이 괜찮은지 살피는 당신.',strength:'누군가에게 필요한 것을 알아차리고 작은 행동으로 옮깁니다. 당신의 배려는 구체적인 온기가 됩니다.',care:'남을 챙기느라 자신의 상태를 뒤로 미룰 수 있어요. 당신도 돌봄을 받을 자격이 있습니다.',oracle:'네가 차린 자리에는\n네 자리도 있어야 한다.\n오늘은 네 밥부터 챙겨라.',mission:'오늘 한 끼는 자신이 먹고 싶은 것으로 챙겨보세요.',lore:'부엌과 불, 음식을 관장하는 가신입니다. 정화수를 올리며 집안의 평안을 빌던 조왕신앙에서 영감을 얻었습니다.',source:'https://encykorea.aks.ac.kr/Article/E0000250'},
    S:{name:'성주신',type:'자리를 지키는 사람',direction:'중앙 · 황',color:'#d9ba7f',object:'paper',tags:['안정','책임','함께할 기반'],intro:'사람들이 안심할 수 있는 기반을 먼저 만드는 당신.',strength:'상황을 차분하게 확인하고 오래 지속할 수 있는 조건을 만듭니다. 주변이 기대어 쉴 자리가 되어줍니다.',care:'자신이 흔들리면 모두 무너질 것처럼 느낄 수 있어요. 책임을 나누는 것도 자리를 지키는 방법입니다.',oracle:'기둥 하나로\n집을 세우지는 않는다.\n오늘은 너도 기대어라.',mission:'혼자 맡고 있던 일 하나를 누군가와 나누어보세요.',lore:'집의 건물과 가운을 수호하는 대표적인 가신입니다. 대들보와 상량 의례에 관계하며, 지역마다 다양한 성주풀이가 전합니다.',source:'https://encykorea.aks.ac.kr/Article/E0029558'},
    B:{name:'바리공주',type:'다시 잇는 사람',direction:'서 · 백',color:'#d6d1e7',object:'bottle',tags:['회복','연결','다시 시작'],intro:'끊어진 자리에서, 다시 이어갈 방법을 찾는 당신.',strength:'실패나 단절 뒤에서도 의미를 찾습니다. 시간이 걸리더라도 다시 시작할 가능성을 놓지 않습니다.',care:'모든 상처와 관계를 자신이 고쳐야 한다고 느낄 수 있어요. 회복에는 내려놓는 선택도 있습니다.',oracle:'다시 이어보는 힘이 네게 있구나.\n그러나 모든 것을\n네가 살려낼 필요는 없다.',mission:'다시 시작하고 싶은 일을 아주 작은 첫 단계로 나누어보세요.',lore:'버림받은 딸이 부모를 살릴 약수를 구하는 서사무가의 주인공입니다. 망자의 저승길을 인도하는 신령으로 중요하게 여겨집니다.',source:'https://encykorea.aks.ac.kr/Article/E0020479'},
    K:{name:'강림도령',type:'다음으로 넘기는 사람',direction:'북 · 흑',color:'#9faed1',object:'scroll',tags:['결단','실행','마무리'],intro:'머뭇거리는 상황에서, 끝과 다음 걸음을 정하는 당신.',strength:'복잡한 일을 정리하고 실행으로 옮깁니다. 무엇부터 해야 할지 모를 때 움직일 순서를 만듭니다.',care:'쉬는 시간까지 해결해야 할 과제처럼 대할 수 있어요. 당신의 속도를 잠시 늦추어도 괜찮습니다.',oracle:'끝낼 것은 끝내라.\n다만 너까지\n몰아붙이지는 마라.',mission:'오늘 끝내도 되는 일 하나와 내일로 미뤄도 되는 일 하나를 골라보세요.',lore:'제주 차사본풀이에서 인간으로 저승을 다녀온 뒤 차사가 되는 인물입니다. 저승의 명령을 수행하고 망자를 인도합니다.',source:'https://encykorea.aks.ac.kr/Article/E0055151'},
    H:{name:'측신',type:'내 몫을 정하는 사람',direction:'숨겨진 신',color:'#b1c497',object:'hair',tags:['경계','비워냄','나의 공간'],intro:'무엇을 받아들이고 거절할지, 자기 경계를 말할 줄 아는 당신.',strength:'무리한 기대를 알아차리고 자기 공간을 확보합니다. 모두의 요구를 자신의 의무로 받아들이지 않습니다.',care:'자신을 지키려다 필요한 도움까지 밀어낼 수 있어요. 경계를 지키면서 손을 내미는 것도 가능합니다.',oracle:'참지 마라.\n네 몫이 아닌 것까지\n담아두지 마라.',mission:'오늘 하지 않아도 되는 일 하나를 정해보세요.',lore:'뒷간을 관장하는 가신으로, 관련 금기와 두려움의 대상이었습니다. 이 테스트의 ‘경계와 비워냄’이라는 성격 해석은 전시용 창작입니다.',source:'https://encykorea.aks.ac.kr/Article/E0058336'}
  };
  function scoreAnswers(answers) {
    if (!Array.isArray(answers) || answers.length !== 8 || answers.some(a => a !== 0 && a !== 1)) throw new Error('여덟 개의 답변이 필요합니다.');
    const scores = {E:0,J:0,S:0,B:0,K:0};
    const last = {E:-1,J:-1,S:-1,B:-1,K:-1};
    answers.forEach((a,i) => Object.entries(questions[i].choices[a].scores).forEach(([g,n]) => { scores[g]+=n; if(i<5) last[g]=i; }));
    const highest = Math.max(...Object.values(scores));
    const tied = Object.keys(scores).filter(g => scores[g] === highest);
    const base = tied.sort((a,b) => last[b]-last[a])[0];
    const hidden = answers[1]===1 && answers[3]===1 && answers[5]===0 && answers[7]===1;
    return {god:hidden?'H':base,base,scores,hidden};
  }
  function evidenceFor(answers, god) {
    if (god === 'H') return ['도움의 범위를 확인하고 끝난 약속을 정리했습니다.','과한 기대를 내려놓고 혼자 정리할 시간을 요청했습니다.'];
    return answers.map((a,i) => ({...questions[i].choices[a],i})).filter(c => c.scores[god]).sort((a,b) => b.scores[god]-a.scores[god] || a.i-b.i).slice(0,2).map(c=>c.evidence);
  }
  const api = {questions,gods,scoreAnswers,evidenceFor};
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
  root.SIN_DATA = api;
})(typeof window !== 'undefined' ? window : globalThis);

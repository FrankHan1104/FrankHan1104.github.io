import { updateWinner } from './firebaseModule.js';
//window.han = window.han || {};
//if(!window['han']) {

var han = han || {};
	( function (_O) {
    _O.init = () => {
      const v = _O.Vars;
      v.curRound = 16;
      v.curStage = 0;
      v.gameHistory = {
        '16': [],
        '8': [],
        '4': [],
        '2': [],
        '1': []
      };
      v.lists = _O.Ctrl.getLists();
      _O.Ctrl.prevCancelOnOff();
    };
_O.start = () => {
      _O.init();
      _O.Ctrl.gameNewStart.bind(_O.Ctrl)();
    };

    
    _O.Vars = {
      lists:null,
      curRound: 0,
      curStage: 0,
      maxRound: 16,
      gameHistory: null
    };
    _O.Ctrl = {
      getLists() {
        return [
          {
            name: '도깨비 (2016~2017)',
            imgSrc: 'images/01.jpg',
            selected: false
          },
          {
            name: '태양의 후예 (2016)',
            imgSrc: 'images/02.jpg',
            selected: false
          },
          {
            name: '응답하라 1988 (2015~2016)',
            imgSrc: 'images/03.jpg',
            selected: false
          },
          { 
            name: '미스터 션샤인 (2018)',
            imgSrc: 'images/04.jpg',
            selected: false
          },
          {
            name: '오징어 게임 (2021)',
            imgSrc: 'images/05.jpg',
            selected: false
          },
          {
            name: '스물다섯 스물하나 (2022)',
            imgSrc: 'images/06.jpg',
            selected: false
          },
          {
            name: '사랑의 불시착 (2019~2020)',
            imgSrc: 'images/07.jpg',
            selected: false
          },
          {
            name: '더 글로리 (2022~2023)',
            imgSrc: 'images/08.jpg',
            selected: false
          },
          {
            name: '슬기로운 의사생활 시리즈 (시즌1,2)',
            imgSrc: 'images/09.jpg',
            selected: false
          },
          {
            name: '낭만닥터 김사부 시리즈 (시즌1~3)',
            imgSrc: 'images/10.jpg',
            selected: false
          },
          {
            name: '이상한 변호사 우영우 (2022)',
            imgSrc: 'images/11.jpg',
            selected: false
          },
          {
            name: '호텔델루나 (2019)',
            imgSrc: 'images/12.jpg',
            selected: false
          },
          {
            name: '모범택시 시리즈 (시즌1,2)',
            imgSrc: 'images/13.jpg',
            selected: false
          },
          {
            name: '별에서 온 그대 (2013~2014)',
            imgSrc: 'images/14.jpg',
            selected: false
          },
          {
            name: '이태원 클라쓰 (2020)',
            imgSrc: 'images/15.jpg',
            selected: false
          },
          {
            name: '시그널 (2016)',
            imgSrc: 'images/16.jpg',
            selected: false
          }
        ];
      },
      rndLists(arr) { //배열 랜덤 섞음
        return arr.map((n) => { return [Math.random(), n] }).sort().map((n) => {  return n[1] });//n[1].selected = false;
      },
      selectedLists(arr) {
        return arr.filter((n) => n.selected === true);
      },
      gameNewStart() {
        const v = _O.Vars;
        v.gameHistory[v.curRound.toString()] = this.rndLists(v.lists);
        _O.Html.set.bind(_O.Html)();
      },
      copyObj(obj) { //Deep Copy
        let copy = {};
        for (let attr in obj) {
          if (obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
          }
        }
        copy.selected = false;
        return copy;
      },
      nextRound() {
        const v = _O.Vars;
        if(v.curRound <= 1) return;
        v.lists = _O.Ctrl.selectedLists(v.gameHistory[v.curRound.toString()]).map((n) => _O.Ctrl.copyObj(n));
        if(v.curRound > 1) v.curRound /= 2;
        v.curStage = 0;
        v.gameHistory[v.curRound.toString()] = this.rndLists(v.lists);
        // console.log('v.lists::',v.lists, 'v.gameHistory::',v.gameHistory);
        _O.Html.setRoundTitle();
      },
      prevCancelOnOff() {
        const footerObj = document.getElementById('footer');
        if(_O.Vars.curRound === _O.Vars.maxRound) {
          if(_O.Vars.curRound > 1 && _O.Vars.curStage > 0) footerObj.className = 'footer';
          else footerObj.className = 'footer soff';
        } else {
          if(_O.Vars.curRound > 1) footerObj.className = 'footer';
          else footerObj.className = 'footer soff';
        }
      }
    };
    _O.Event = {
      clickItem(obj) {
        const v = _O.Vars;
        if(v.curRound === 1) return;
        const idx = obj.id.split('_')[1];
        v.gameHistory[v.curRound.toString()][idx].selected = true;
        if(v.curStage < v.curRound/2) v.curStage++;
        if(v.curStage === v.curRound/2) _O.Ctrl.nextRound();
	     
        _O.Html.setItem();
        _O.Ctrl.prevCancelOnOff();
	obj.classList.add('clicked');
      },
      overItem(obj) {
        const objs = document.querySelectorAll('#list_ideal li a[hover="true"]');
        objs.forEach((itm) => itm.setAttribute('hover', 'false'));
        if(obj.getAttribute('hover') === 'true') return;
        obj.setAttribute('hover', 'true');
	      obj.classList.add('hovered');
      },
      outItem(obj) {
        if(obj.getAttribute('hover') === 'false') return;
        obj.setAttribute('hover', 'false');
	      obj.classList.remove('hovered');
      },
      clickCancel() {
        _O.start();
      },
      clickPrev() {
        const v = _O.Vars;
        if(v.curStage > 0) v.curStage--;
        else {
          v.gameHistory[v.curRound.toString()] = [];
          if(v.curRound < _O.Vars.maxRound) {
            v.curRound *= 2;
            v.curStage = v.curRound / 2 - 1;
          }
          _O.Html.setRoundTitle();
          v.lists = v.gameHistory[v.curRound.toString()];
        }

        v.lists[v.curStage * 2].selected = false;
        v.lists[v.curStage * 2 + 1].selected = false;
        _O.Html.setItem();
        _O.Ctrl.prevCancelOnOff();
      }
    };




		
		
    _O.Html = {
      set() {
        this.setRoundTitle();
        this.setContent();
      },
      setHistory() {
        const tObj = document.getElementById('modal');
        let key, roundDiv, imgObj, roundTitleDiv, roundImgWrapDiv;
        let historyTitleDiv = document.createElement('DIV');
        historyTitleDiv.className = 'tit';
        historyTitleDiv.innerText = '히스토리';
        tObj.appendChild(historyTitleDiv);
        let wrapDiv = document.createElement('DIV');
        wrapDiv.className = 'history_box';
        for(key in _O.Vars.gameHistory) {
          roundDiv = document.createElement('DIV');
          roundDiv.className = 'round';
          roundTitleDiv = document.createElement('h5');
          roundTitleDiv.innerText = (key === '1' ? `최종 이상형` : `${key}강`);
          roundDiv.appendChild(roundTitleDiv);
          roundImgWrapDiv = document.createElement('DIV');
          _O.Vars.gameHistory[key].forEach((itm) => {
            imgObj = document.createElement('IMG');
            imgObj.setAttribute('src', itm.imgSrc);
            imgObj.className = `history_item ${itm.selected ? '' : (key !== '1' ? 'dim' : '')}`;
            roundImgWrapDiv.appendChild(imgObj);
          });
          roundDiv.appendChild(roundImgWrapDiv);
          wrapDiv.appendChild(roundDiv);
        }
        tObj.appendChild(wrapDiv);
      },
      setRoundTitle() {
        if(_O.Vars.curRound > 1) document.getElementById('roundTitle').innerText = `${_O.Vars.curRound}강 선택`;
        else document.getElementById('roundTitle').innerText = `축하합니다. 최종 이상형이 선정되었습니다.`;
	     
      },
      setItem() {
        const s = _O.Html.getItem();
        const tObj = document.getElementById('list_ideal');
        if(!tObj) return;
        tObj.innerHTML = s;
        if(_O.Vars.curRound === 1) { 

			
			_O.Html.setHistory();
			//document.getElementById('statusText').innerText = "작동중1...";
			let winnerName = _O.Vars.gameHistory["1"][0].name; // 여기서는 게임 히스토리의 첫 번째 요소가 우승자라고 가정
			updateWinner(winnerName);
			showFinalButtons(); // 여기서 showFinalButtons 함수 호출
  
		
		
				    
				   }
      },
      getItem() {
        let s = '', i = _O.Vars.curStage * 2, length = i + (_O.Vars.curRound > 1 ? 2 : _O.Vars.curRound);
        for(i; i < length && length <= _O.Vars.curRound; i++) {
          s += `
          <li>
            <a class="item ${_O.Vars.curRound === 1 ? 'final' : ''}" id="item_${i}" hover="false" href="javascript:void(0);" onclick="han.Event.clickItem(this);" onmouseover="han.Event.overItem(this);" onmouseout="han.Event.outItem(this);">
              <span class="thumb"><img src="${_O.Vars.gameHistory[_O.Vars.curRound.toString()][i]['imgSrc']}" alt="사진"></span>
              <strong> ${_O.Vars.gameHistory[_O.Vars.curRound.toString()][i]['name']}</strong>
            </a>
          </li>
          `;
          if(_O.Vars.curRound === 1) {
            s += `
            <li id="history">
              <a class="modal final" id="modal" href="javascript:void(0);"></a>
            </li>
            `;
          }
        }
        return s;
      },
      setContent() {
        const tObj = document.getElementById('content');
        tObj.className = 'content in_game';
        let s = `
          <ul class="list_ideal" id="list_ideal">
          ${this.getItem()}
          </ul>
        `;
        tObj.innerHTML = s;
      }
    }
	window.han=han;	
	}) (han);
	

window.start = window.han.start;
// 기존 han 객체 및 함수 정의...

function showFinalButtons() {
    var resetButton = document.getElementById('resetButton');
    var resultsButton = document.getElementById('resultsButton');

    if(resetButton && resultsButton) {
        resetButton.style.display = 'block';
        resultsButton.style.display = 'block';
    } else {
        // 요소가 없을 경우의 처리
        console.error('버튼 요소를 찾을 수 없습니다.');
    }
}

// 페이지 로드 완료 후 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('btnGameStart');
    if(startButton) {
        startButton.addEventListener('click', han.start);
    }
});


//=============================для разработчиков==========================================================
document.getElementById('dev').addEventListener('click', function (e) {
   tglCls('dev-p', 'active');
})

document.getElementById('dev-p-s').addEventListener('click', function (e) {
   tglCls('dev-p-s', 'active');
   game.computer.secret = !game.computer.secret;
})
document.getElementById('campstep').addEventListener('click', function (e) {
   tglCls('campstep', 'active');
   flsOrdrPc = !flsOrdrPc;
})
document.getElementById('playerstep').addEventListener('click', function (e) {
   tglCls('playerstep', 'active');
   flsOrdrPlr = !flsOrdrPlr;
})

document.getElementById('dev-dev').addEventListener('click', function (e) {
   tglCls('dev-dev', 'active');
   developer = !developer;
})

//========================================основной блок===================================================

document.getElementById('btn_play').addEventListener('click', function (e) {
   if (!playerReady) { return }
   timer();
   playSound('press')
   game.stage = "play";
   if (game.stage === 'finish') {
      game.stage = "play";
      refrshText('btn_pause', 'прервать');
      playSound('press')
   }

})

document.getElementById('btn_pause').addEventListener('click', function (e) {

   if (game.stage === 'play') {
      playSound('press')
      refrshText('btn_play', 'вернуться');
      game.stage = 'preparation';
      rmvCls('c-p-i', 'active');
   } else { rmvCls('c-p-i', 'active'); }

   if (game.stage === 'finish') {
      playSound('press')
      game.stage = 'preparation';
      rmvCls('dev-p-s', 'active');
      rmvCls('win-c', 'active');
      rmvCls('win-p', 'active');
      rmvCls('time', 'active');
      newGame();
   }
})

document.getElementById('randm').addEventListener('click', function (e) {
   playSound('press')
   game.player.randoming();
   playerReady = true;
})

document.getElementById('manual').addEventListener('click', function (e) {
   playSound('press')
   game.player.ships = [];
   playerReady = false;
})


function setColor(element) {
   if (element.classList.contains('show')) {
      colorField = 'rgb(19,38,148)';
      colorShips = 'rgba(19,38,148, 0.5)';
      colorText = '#b22';
      colorGrid = '#132694';
      colorLine = '#b22'
      colorCheck = 'black'
      colorStrokeShip = 'blue'
      shipTest = '#ff000080'
   }
   else {
      colorField = 'rgba(255,255,255,0.5)';
      colorShips = '#132694CC';
      colorText = '#b22';
      colorGrid = '#fff';
      colorLine = '#b22'
      colorCheck = 'yellow'
      colorStrokeShip = 'black'
      shipTest = '#ff000080'
   }
}

setColor(document.getElementById('dark'));

document.getElementById('dark').addEventListener('click', function (e) {
   tglCls('dark', 'active')
   tglCls('canvas', 'active')
   tglCls('cntnr', 'active')
   tglCls('names', 'active')
   tglCls('n-player', 'active')
   tglCls('n-camp', 'active')
   tglCls('scr', 'active')
   tglCls('boxText', 'active')
   tglCls('btn_pause', 'active')
   tglCls('btn_play', 'active')
   tglCls('vr', 'active')
   tglCls('manual', 'active')
   tglCls('randm', 'active')
   tglCls('campstep', 'show');
   tglCls('playerstep', 'show');
   tglCls('snc', 'show');
   tglCls('n-player', 'show');
   tglCls('n-camp', 'show');
   tglCls('dark', 'show')
   tglCls('nni', 'show');
   tglCls('nnp', 'show');
   tglCls('nnc', 'show');
   tglCls('n-i-ok', 'show');
   tglCls('n-i-cncl', 'show');
   tglCls('lvl', 'show');
   tglCls('lvl-n1', 'show');
   tglCls('lvl-n2', 'show');
   tglCls('lvl-n3', 'show');
   tglCls('dev-p-s', 'show');
   tglCls('c-p-i', 'show');
   tglCls('gameInfo', 'show');
   tglCls('time', 'show');
   tglCls('win-p', 'show');
   tglCls('dev-dev', 'show');
   tglCls('win-c', 'show');
   tglCls('winner', 'show');
   tglCls('timeout','show');
   tglCls('lvlBlock','show')
   setColor(this);
   playSound('sound_click')
})

document.getElementById('snc').addEventListener('click', function (e) {
   playSound('press')
   if (!cntCls('lvl-items', 'active')) {
      rmvCls('lvl-items', 'active');
      addCls('nni', 'active');
   }
})

document.getElementById('n-i-ok').addEventListener('click', function (e) {
   playSound('press')
   let playerName = document.getElementById('u-n').value;
   if (playerName !== '') {
      game.player.name = playerName;
   } else if (playerName === '') {
      game.player.name = "player"
   }

   let pcName = document.getElementById('c-n').value;
   if (pcName !== '') {
      game.computer.name = pcName;
   } else if (pcName === '') {
      game.computer.name = 'computer'
   }
   refrshText('n-player', game.player.name);
   refrshText('n-camp', game.computer.name);
   rmvCls('nni', 'active');

   if (playerName === 'cheat') {
      addCls('dev-p', 'active');
   } 
   
})

document.getElementById('n-i-cncl').addEventListener('click', function (e) {
   playSound('press')
   rmvCls('nni', 'active');
})

document.getElementById('lvl').addEventListener('click', function (e) {
   playSound('press')
   tglCls('lvl-items', 'active');

})

let lvls = document.querySelectorAll('[id^="lvl-n"]');
[].forEach.call(lvls, function (el) {
  
   el.addEventListener('click', function () {
      if (el.id.replace(/[^\d]/g, '') == "" || this.classList.contains('active')) { return }
      game.computer.level = Number(el.id.replace(/[^\d]/g, ''));
      for (let item of lvls) {
         item.classList.remove('active');
      }
      tglCls(el.id, 'active');
      playSound('press')
   })
})

// let lvlBtn = document.querySelectorAll('[id^="lvl-n"]')
// for(let btn of lvlBtn) {
//    btn.addEventListener('click', function() {
//       game.computer.level = Number(btn.id.replace(/[^\d]/g, ''));
//       for (let btnCheck of lvlBtn) {
//          btnCheck.classList.remove('active')
//       }
//       this.classList.add('active')
      
//    })
// }

document.getElementById('timeout').addEventListener('click', function(e){
   tglCls('timeout','active');
   forR=!forR
})


document.getElementById('addLvl').addEventListener('click', function(e) {
   rmvCls('lvlBlock','active')
   game.stage = 'play'
})

document.getElementById('closeLvl').addEventListener('click', function(e) {
   rmvCls('lvlBlock','active')
   game.stage = 'play'
})


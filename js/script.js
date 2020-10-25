const CELL_SIZE = 30
const FIELD_SIZE = 30

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.height = 510
canvas.width = 1050

const mouse = getMouse(canvas)
const game = new Game

let playerReady = true
let forR = false
let r = 0
let s = 0
let flsOrdrPc = false;
let flsOrdrPlr = false;
let developer = false

function clearCanvas() {
   canvas.width |= 0
}





function drawGrid() {
   context.strokeStyle = colorGrid;
   context.lineWidth = 0.5
   for (let i = 0; i < canvas.width / CELL_SIZE; i++) {
      context.beginPath()
      context.moveTo(i * CELL_SIZE, 0)
      context.lineTo(i * CELL_SIZE, canvas.height)
      context.stroke()
   }

   for (let i = 0; i < canvas.height / CELL_SIZE; i++) {
      context.beginPath()
      context.moveTo(0, i * CELL_SIZE)
      context.lineTo(canvas.width, i * CELL_SIZE)
      context.stroke()
   }

   context.lineWidth = 2
   context.strokeStyle = colorLine
   context.beginPath()
   context.moveTo(0, 66)
   context.lineTo(canvas.width, 66)
   context.stroke()

}

function timer() {
   s++;
   let msec = Math.floor(s / 60);

   sec = Math.floor(msec % 60);
   min = Math.floor(msec % 3600 / 60);
   hrs = Math.floor(Math.floor(msec % 360000 / 60) / 60);

   if (hrs < 10) {
      refrshText('hrs', '0' + hrs);
   } else { refrshText('hrs', hrs); }

   if (min < 10) {
      refrshText('min', '0' + min);
   } else { refrshText('min', min); }

   if (sec < 10) {
      refrshText('sec', '0' + sec);
   } else { refrshText('sec', sec); }
}


function getRandomFrom(array) {
   const index = Math.floor(Math.random() * array.length)
   return array[index]
}

function refrshText(id, text) {
   document.getElementById(id).textContent = text;
}

//==============================================================
function addCls (id,cls) {
   document.getElementById(id).classList.add(cls)
}
function rmvCls (id,cls) {
   document.getElementById(id).classList.remove(cls)
}
function tglCls (id,cls) {
   document.getElementById(id).classList.toggle(cls)
}
function cntCls (id,cls) {
   document.getElementById(id).classList.contains(cls)
}
//==============================================================
function newGame() {
   game.player.checkShips = []
   game.computer.secret = true
   s = 0
   game.player = new Topology({
      name: game.player.name,
      offsetX: game.player.offsetX,
      offsetY: game.player.offsetY,
      win: game.player.win,
      ships: game.player.ships,
   })
   for (let ship of game.player.ships) {
		ship.live = ship.size
	}
   game.player.randoming();
   game.computer = new Topology({
      name: game.computer.name,
      offsetX: game.computer.offsetX,
      offsetY: game.computer.offsetY,
      secret: game.computer.secret,
      level: game.computer.level,
      win: game.computer.win,
   })
   game.computer.randoming();
   refrshText('gameInfo', 'игра началась')
}

function playSound(id) {
	let levels = document.querySelectorAll('[id^='+id+']');
	let n = Math.floor(Math.random() * levels.length);
	
	levels[n].pause();
	levels[n].currentTime = 0;
	levels[n].play();
}


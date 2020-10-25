class Game {
   constructor() {
      this.stage = "preparation",
         this.isCheckedPoint = false,
         this.playerOrder = true,
         this.isHit = false,
         this.timeout = true,
         this.hit = false,

         this.player = new Topology({
            name: 'player',
            offsetX: 30,
            offsetY: 90
         })

      this.computer = new Topology({
         name: 'computer',
         offsetX: 690,
         offsetY: 90,
         secret: true,
         level: 3
      })

      this.computer.randoming()

      this.player.randoming()


      requestAnimationFrame(x => this.tick(x))
   }

   tick(timestamp) {

      requestAnimationFrame(x => this.tick(x))
      clearCanvas()
      drawGrid()
      this.player.draw(context)
      this.computer.draw(context)
      this.player.getUnknownFields()
      if (this.stage === "preparation") {
         this.tickPreparation(timestamp)
      }

      if (this.stage === "play") {
         this.player.getCheckenFields()
         this.player.getUnknownFields()
         refrshText('win-c', '🗸')
         refrshText('win-p', '🗸')
         addCls('c-p-i', 'active');
         addCls('time', 'active')
         addCls('manual', 'play')
         addCls('randm', 'play')
         rmvCls('winner', 'active')
         addCls('timeout', 'out')
         timer()
         this.tickPlay(timestamp)


         if (this.computer.isFinish()) {
            playSound('winAudio')
            this.stage = 'finish'
            addCls('win-p', 'active')
            addCls('win-c', 'active')
            refrshText('win-c', '✖')
            this.player.win++
            refrshText('scr-player', this.player.win)
            refrshText('winner', 'победил(а): ' + this.player.name + ' поздравляем!!!')
         }

         else if (this.player.isFinish()) {
            playSound('finish')
            this.stage = 'finish'
            addCls('win-c', 'active')
            addCls('win-p', 'active')
            refrshText('win-p', '✖')
            this.computer.win++
            refrshText('scr-camp', this.computer.win)
            refrshText('winner', 'победил(а): ' + this.computer.name)
         }

      }
      if (this.stage === 'finish') {
         forR = false
         game.computer.secret = false
         rmvCls('n-player', 'order')
         rmvCls('n-camp', 'order')
         refrshText('btn_play', 'новая игра');
         rmvCls('manual', 'play')
         rmvCls('randm', 'play')
         addCls('winner', 'active')
         rmvCls('timeout', 'out')
         rmvCls('timeout', 'active')
      }
      this.timeout = true
      mouse.pleft = mouse.left
   }
   tickPreparation(timestamp) {
      if (!this.player.isPointUnder(mouse)) { return }

      const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
      const shipSize = shipSizes[this.player.ships.length]
      const coordinats = this.player.getCoordinats(mouse)

      const ship = {
         x: coordinats.x,
         y: coordinats.y,
         direct: mouse.s ? 0 : 1,
         size: shipSize,
         live: shipSize,
      }
      if (!this.player.canStay(ship)) {
         if (ship.direct === 0) {
            if (ship.x + ship.size > 10) { ship.x = ship.x - (ship.size + coordinate.x - 10); }
         }
         if (ship.direct === 1) {
            if (ship.y + ship.size > 10) { ship.y = ship.y - (ship.size + coordinate.y - 10); }
         }
      }

      if (this.player.ships.length === 0) {
         refrshText('manual', 'вручную');
      }

      if (this.player.ships.length === 1) {
         refrshText('manual', 'очистить');
      }

      if (this.player.ships.length === 10) {
         playerReady = true
         return
      }

      this.player.drawShip(context, ship)
      if (!this.player.canStay(ship)) {
         this.player.drawShipTest(context, ship);
      }
      if (mouse.left && !mouse.pleft) {
         if (this.player.canStay(ship)) {this.player.addShips(ship)}
      }
   }
   tickPlay(timestamp) {

      if (this.playerOrder) {
         addCls('n-player', 'order')
         rmvCls('n-camp', 'order')
         if (!this.computer.isPointUnder(mouse)) { return }

         const point = this.computer.getCoordinats(mouse)
         this.computer.addHoverPoint(point)
         if (mouse.left && !mouse.pleft) {
            this.computer.addChecks(point)
            if (this.isCheckedPoint) {
               this.computer.update()
               if (!this.computer.isShipUnderPoint(point)) {
                  playSound('shot')
                  if (flsOrdrPlr) { return }
                  this.playerOrder = false
               }
            }
         }
      } else {
         if (this.computer.level === 3 || document.getElementById('lvl-n3').classList.contains('active')) { this.player.lvlHard() }
         if (this.computer.level === 4 ) { this.player.lvlChit() }
         addCls('n-camp', 'order')
         rmvCls('n-player', 'order')
         setTimeout(function () { game.timeout = false; }, r);
         
         if (this.timeout || this.stop === 0) { return };
         let point = 0;
         this.stop = 0;
         
         if (this.computer.level === 1) { point = getRandomFrom(this.player.getUnknownFields()); }
         if (this.computer.level !== 1) {
            if (this.player.getCheckenFields().length === 0) { this.hit = false; }
            if (this.hit) { point = getRandomFrom(this.player.getCheckenFields()); }
            else { point = getRandomFrom(this.player.getUnknownFields()); }
            if (this.player.isShipUnderPoint(point)) { this.hit = true }
         }
         this.player.addChecks(point)
         this.player.update()
         if (!this.player.isShipUnderPoint(point)) {
            playSound('shot')
            this.stop = 1
            if (flsOrdrPc) { return }
            this.playerOrder = true
         }
      }
   }
}

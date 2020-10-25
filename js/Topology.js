class Topology {
   constructor(param) {
      this.name = param.name
      this.lvl = param.lvl
      this.offsetX = param.offsetX
      this.offsetY = param.offsetY
      this.win = param.win || 0
      this.secret = param.secret || false
      this.hover = []
      this.ships = []
      this.checkShips = []
      this.checks = []
      this.isChecks = []
      this.kills = []
      this.injuries = []
      this.isChecksF = []
      this.isChecksF2 = []
      this.number = 0

   }
   addShips(...ships) {
      for (const ship of ships) {
         if (!this.ships.includes(ship)) { this.ships.push(ship) }
      } return this
   }
   addShipsTest(...ships) {
      for (const ship of ships) {
         if (!this.checkShips.includes(ship)) { this.checkShips.push(ship) }
      } return this
   }

   addChecks(...checks) {
      if (game.playerOrder) {
         const coordinate = this.getCoordinats(mouse);
         for (const unk of this.getUnknownFields()) {
            if (unk.x === coordinate.x && unk.y === coordinate.y) {
               game.isCheckedPoint = true;
               for (const check of checks) {
                  if (!this.checks.includes(check)) {
                     this.checks.push(check);
                  }
               }
            }
         }
      }
      else {
         game.isCheckedPoint = false;
         for (const check of checks) {
            if (!this.checks.includes(check)) {
               if (check.x <= 9 && check.y <= 9 && check.x >= 0 && check.y >= 0) {
                  this.checks.push(check);
               }
            }
         }
      }
      return this;
   }

   addIsChecks(...isChecks) {
      if (!game.playerOrder) {
         for (const isCheck of isChecks) {
            if (!this.isChecks.includes(isCheck)) {
               this.isChecks.push(isCheck);
            }
         }
      }
   }

   addIsChecksF(...isChecksF) {
      for (const isCheckF of isChecksF) {
         if (!this.isChecksF.includes(isCheckF)) {
            this.isChecksF.push(isCheckF);
         }
      }
   }
   addIsChecksF2(...isChecksF2) {
      for (const isCheckF2 of isChecksF2) {
         if (!this.isChecksF2.includes(isCheckF2)) {
            this.isChecksF2.push(isCheckF2)
         }
      }
   }

   draw(context) {
      this.drawFields(context)

      if (!this.secret) {
         for (const ship of this.ships) {
            this.drawShip(context, ship)
         }
      }

      for (const check of this.checks) {
         this.drawCheck(context, check)
      }

      for (const ship of this.checkShips) {
         this.drawShipTest(context, ship)
      }

      for (const isCheckF of this.isChecksF) {
         this.drawIsChecksF(context, isCheckF);
      }
      for (const isCheckF2 of this.isChecksF2) {
         this.drawIsChecksF2(context, isCheckF2);
      }

      for (const point of this.hover) {
         this.drawHover(context, point);
      }

      for (const injury of this.injuries) {
         this.drawInjury(context, injury)
      }
      this.drawFields(context)
      return this

   }

   drawInjury(context, injury) {

      context.strokeStyle = 'red'
      context.lineWidth = 3
      context.opacity = 0.3
      context.beginPath()
      context.moveTo(
         this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE,
         this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE
      )
      context.lineTo(
         this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE * 2,
         this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE * 2
      )
      context.stroke()

      context.beginPath()
      context.moveTo(
         this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE * 2,
         this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE
      )
      context.lineTo(
         this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE,
         this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE * 2
      )
      context.stroke()

      return this
   }

   drawFields(context) {
      context.strokeStyle = colorField;
      context.lineWidth = 2.5


      const alphabet = "АБВГДЕЖЗИК"

      for (let i = 1; i <= 10; i++) {
         context.textAlign = "center"
         context.font = "600 20px arial "
         context.fillStyle = colorText;
         context.fillText(
            i,
            this.offsetX + FIELD_SIZE * 0.5,
            this.offsetY + i * FIELD_SIZE + FIELD_SIZE * 0.7
         )
      }

      for (let i = 0; i < 10; i++) {

         const letter = alphabet[i]
         context.fillText(

            letter,
            this.offsetX + i * FIELD_SIZE + FIELD_SIZE * 1.5,
            this.offsetY + FIELD_SIZE * 0.7

         )
      }
      for (let i = 1; i <= 11; i++) {
         context.beginPath()
         context.moveTo(
            this.offsetX + i * FIELD_SIZE,
            this.offsetY + 30
         )
         context.lineTo(
            this.offsetX + i * FIELD_SIZE,
            this.offsetY + 11 * FIELD_SIZE
         )
         context.stroke()
      }

      for (let i = 1; i <= 11; i++) {
         context.beginPath()
         context.moveTo(
            this.offsetX + 30,
            this.offsetY + i * FIELD_SIZE
         )
         context.lineTo(
            this.offsetX + 11 * FIELD_SIZE,
            this.offsetY + i * FIELD_SIZE
         )
         context.stroke()
      }


      return this
   }

   drawShip(context, ship) {
      context.strokeStyle = colorStrokeShip;
      context.lineWidth = 2
      context.beginPath()
      context.rect(
         this.offsetX + ship.x * FIELD_SIZE + FIELD_SIZE + 2,
         this.offsetY + ship.y * FIELD_SIZE + FIELD_SIZE + 2,
         (ship.direct === 0 ? ship.size : 1) * FIELD_SIZE - 4,
         (ship.direct === 1 ? ship.size : 1) * FIELD_SIZE - 4
      )
      context.stroke()

      context.fillStyle = colorShips
      context.beginPath()
      context.rect(
         this.offsetX + ship.x * FIELD_SIZE + FIELD_SIZE + 2,
         this.offsetY + ship.y * FIELD_SIZE + FIELD_SIZE + 2,
         (ship.direct === 0 ? ship.size : 1) * FIELD_SIZE - 4,
         (ship.direct === 1 ? ship.size : 1) * FIELD_SIZE - 4
      )
      context.fill()

      return this
   }

   drawShipTest(context, ship) {
      context.fillStyle = shipTest
      context.beginPath()
      context.rect(
         this.offsetX + ship.x * FIELD_SIZE + FIELD_SIZE + 2,
         this.offsetY + ship.y * FIELD_SIZE + FIELD_SIZE + 2,
         (ship.direct === 0 ? ship.size : 1) * FIELD_SIZE - 4,
         (ship.direct === 1 ? ship.size : 1) * FIELD_SIZE - 4
      )
      context.fill()

      return this
   }





   drawCheck(context, check) {
      context.fillStyle = colorCheck;
      context.beginPath()
      context.arc(
         this.offsetX + check.x * FIELD_SIZE + FIELD_SIZE * 1.5,
         this.offsetY + check.y * FIELD_SIZE + FIELD_SIZE * 1.5,
         3.5,
         0,
         Math.PI * 2
      )
      context.fill()
      return this
   }

   drawIsChecksF(context, isCheck) {
      context.fillStyle = 'rgba(251, 2, 3,0.3)';
      context.beginPath();
      context.arc(
         this.offsetX + isCheck.x * FIELD_SIZE + FIELD_SIZE * 1.5,
         this.offsetY + isCheck.y * FIELD_SIZE + FIELD_SIZE * 1.5,
         8,
         0,
         Math.PI * 2
      );
      context.fill();
      return this;
   }

   drawIsChecksF2(context, isCheck) {
      context.fillStyle = 'rgba(1, 252, 3,0.3)'
      context.beginPath();
      context.arc(
         this.offsetX + isCheck.x * FIELD_SIZE + FIELD_SIZE * 1.5,
         this.offsetY + isCheck.y * FIELD_SIZE + FIELD_SIZE * 1.5,
         8,
         0,
         Math.PI * 2
      );
      context.fill();
      return this;
   }

   drawHover(context, point) {
      context.fillStyle = colorShips
      context.beginPath();
      context.rect(
         this.offsetX + point.x * FIELD_SIZE + FIELD_SIZE,
         this.offsetY + point.y * FIELD_SIZE + FIELD_SIZE,
         FIELD_SIZE,
         FIELD_SIZE,
      );
      context.fill();
      return this;
   }

   addHoverPoint(point) {
      this.hover = [point];
   }


   isPointUnder(point) {
      if (
         point.x < this.offsetX + FIELD_SIZE ||
         point.x > this.offsetX + 11 * FIELD_SIZE ||
         point.y < this.offsetY + FIELD_SIZE ||
         point.y > this.offsetY + 11 * FIELD_SIZE
      ) {
         return false
      }
      return true
   }

   isShipUnderPoint(point) {
      const map = this.getShipsMap()
      return map[point.y][point.x]
   }

   removeCheckenField(ship) {
      for (let i = -1; i < 2; i++) {
         if (i === 0) { continue };
         if (ship.direct === 0) {
            for (let k = 0; k < ship.size; k++) {
               this.addIsChecks({ x: ship.x + k, y: ship.y + i });
            }
         }
         if (ship.direct === 1) {
            for (let k = 0; k < ship.size; k++) {
               this.addIsChecks({ x: ship.x + i, y: ship.y + k });
            }
         }
      }
   }

   getCoordinats(point) {
      if (!this.isPointUnder(point)) {
         return false
      }

      const x = parseInt((point.x - this.offsetX - FIELD_SIZE) / FIELD_SIZE)
      const y = parseInt((point.y - this.offsetY - FIELD_SIZE) / FIELD_SIZE)

      return {
         x: Math.max(0, Math.min(9, x)),
         y: Math.max(0, Math.min(9, y))
      }
   }

   canStay(ship) {
      if (ship.direct === 0 && ship.x + ship.size > 10) {
         return false
      }

      if (ship.direct === 1 && ship.y + ship.size > 10) {
         return false
      }

      const map = [
         [true, true, true, true, true, true, true, true, true, true],
         [true, true, true, true, true, true, true, true, true, true],
         [true, true, true, true, true, true, true, true, true, true],
         [true, true, true, true, true, true, true, true, true, true],
         [true, true, true, true, true, true, true, true, true, true],
         [true, true, true, true, true, true, true, true, true, true],
         [true, true, true, true, true, true, true, true, true, true],
         [true, true, true, true, true, true, true, true, true, true],
         [true, true, true, true, true, true, true, true, true, true],
         [true, true, true, true, true, true, true, true, true, true]
      ]

      for (const ship of this.ships) {
         if (ship.direct === 0) {
            for (let x = ship.x - 1; x < ship.x + ship.size + 1; x++) {
               for (let y = ship.y - 1; y < ship.y + 2; y++) {
                  if (map[y] && map[y][x]) {
                     map[y][x] = false
                  }
               }
            }
         }

         else {
            for (let x = ship.x - 1; x < ship.x + 2; x++) {
               for (let y = ship.y - 1; y < ship.y + ship.size + 1; y++) {
                  if (map[y] && map[y][x]) {
                     map[y][x] = false
                  }
               }
            }
         }
      }

      if (ship.direct === 0) {
         for (let i = 0; i < ship.size; i++) {
            if (!map[ship.y][ship.x + i]) {
               return false
            }
         }
      }
      else {
         for (let i = 0; i < ship.size; i++) {
            if (!map[ship.y + i][ship.x]) {
               return false
            }
         }
      }

      return true
   }



   randoming() {
      this.ships = []

      for (let size = 4; size > 0; size--) {
         for (let n = 0; n < 5 - size; n++) {
            let isStay = false

            while (!isStay) {
               const ship = {
                  x: Math.floor(Math.random() * 10),
                  y: Math.floor(Math.random() * 10),
                  direct: Math.random() > Math.random() ? 0 : 1,
                  live: size,
                  size,

               }
               if (this.canStay(ship)) {
                  this.addShips(ship)
                  isStay = true
               }
            }
         }
      }

      return true
   }
   update() {
      const map = this.getShipsMap()
      if (this == game.player) {
         if (forR) { r = 100; }
         else { r = Math.round(Math.random() * (650 - 250) + 250); }
      }
      for (const check of this.checks) {
         if (map[check.y][check.x]) {
            this.injuries.push(check)
            const index = this.checks.indexOf(check)
            this.checks.splice(index, 1)
            game.isCheckedPoint = false;
            this.getShipsInPoint(check.x, check.y)
            this.getCheckenFields()
         }
      }
   }

   lvlHard() {
      if (this.number >= 10) { return }
      let point = getRandomFrom(this.getUnknownFields())
      this.isShipUnderPoint(point)
      if (this.isShipUnderPoint(point)) { return }
      this.addIsChecks(point);
      this.number++;
   }

   lvlChit() {
      if (this.number >= 78) { return }
      let point = getRandomFrom(this.getUnknownFields())
      this.isShipUnderPoint(point)
      if (this.isShipUnderPoint(point)) { return }
      this.addIsChecks(point);
      this.number++;
   }


   getCheckenFields() {
      const roundChecked = [];
      if (developer) { this.isChecksF2 = roundChecked }
      else { this.isChecksF2 = [] }
      for (let y = 0; y < 10; y++) {
         for (let x = 0; x < 10; x++) {
            for (const injury of this.injuries) {
               if (this == game.computer) { break }
               if (injury.x === x && injury.y === y) {
                  for (let unk of this.getUnknownFields()) {
                     for (let k = 0; k < 5; k++) {
                        for (let l = -1; l < 2; l++) {
                           if (unk.x === x + l && unk.y === y) { 
                              roundChecked.push({ x: x + l, y: y }); 
                           }
                           if (unk.x === x && unk.y === y + l) { 
                              roundChecked.push({ x: x, y: y + l }); 
                           }
                        }
                        break;
                     }
                  }
               }
            }
         }
      }
      return roundChecked;
   }

   getCheckAroundShipTest(ship, x, y) {
      if (this == game.computer) { return }
      if (ship.direct === 0) {
         for (let x = ship.x - 1; x < ship.x + ship.size + 1; x++) {
            for (let y = ship.y - 1; y < ship.y + 2; y++) {
               if (x === ship.x && y === ship.y) { continue }
               if (x <= 9 && x >= 0 && y <= 9 && y >= 0) {
                  this.addIsChecks({ x, y });
               }
            }
         }
      }
      if (ship.direct === 1) {
         for (let x = ship.x - 1; x < ship.x + 2; x++) {
            for (let y = ship.y - 1; y < ship.y + ship.size + 1; y++) {
               if (x === ship.x && y === ship.y) { continue }
               if (x <= 9 && x >= 0 && y <= 9 && y >= 0) {
                  this.addIsChecks({ x, y });
               }
            }
         }
      }
   }


   getShipHit(ship, x, y) {
      playSound('shot1')
      ship.live = ship.live - 1;
      if (game.computer.level === 1 ||  game.computer.level === 2 || game.computer.level === 3 ) { 
         this.removeCheckenField(ship) 
      }
      
      
      setTimeout(function () { game.stop = 1; }, r)
      if (ship.live === 0) {
         playSound('kill')
         this.addShipsTest(ship)
         this.getCheckAroundShipTest(ship, x, y)
         game.stop = 0
      }
   }

   getShipsInPoint(x, y) {
      for (const ship of this.ships) {
         let dx = ship.direct === 0;
         let dy = ship.direct === 1;
         for (let i = 0; i < ship.size; i++) {
            if (ship.x === x && ship.y === y) {
               this.getShipHit(ship, ship.x, ship.y);
               return ship
            }
            if (ship.x === x - i && ship.y === y) {
               if (ship.direct === 0) {
                  this.getShipHit(ship, ship.x, ship.y)
                  return ship
               }
            }
            if (ship.x === x && ship.y === y - i) {
               if (ship.direct === 1) {
                  this.getShipHit(ship, ship.x, ship.y)
                  return ship
               }
            }
         }
      }
      return null;
   }

   getShipsMap() {
      const map = [
         [false, false, false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false, false, false]
      ]

      for (const ship of this.ships) {
         if (ship.direct === 0) {
            for (let x = ship.x; x < ship.x + ship.size; x++) {
               if (map[ship.y] && !map[ship.y][x]) {
                  map[ship.y][x] = true
               }
            }
         }

         else {
            for (let y = ship.y; y < ship.y + ship.size; y++) {
               if (map[y] && !map[y][ship.x]) {
                  map[y][ship.x] = true
               }
            }
         }
      }

      return map
   }




   getUnknownFields() {
      const unknownFields = []
      if (developer) {
         if (this == game.player) { this.isChecksF = unknownFields; }
      }
      else { this.isChecksF = [] }
      for (let y = 0; y < 10; y++) {
         for (let x = 0; x < 10; x++) {
            let isChecked = false

            for (const check of this.checks) {
               if (check.x === x && check.y === y) {
                  isChecked = true
                  break
               }
            }

            for (const isCheck of this.isChecks) {
               if (isCheck.x === x && isCheck.y === y) {
                  isChecked = true;
                  break;
               }
            }

            if (!isChecked) {
               for (const injury of this.injuries) {
                  if (injury.x === x && injury.y === y) {
                     isChecked = true
                     break
                  }
               }
            }

            if (!isChecked) { unknownFields.push({ x, y }) }
         }
      }

      return unknownFields
   }

   isFinish() {
      const map = this.getShipsMap()
      for (const injury of this.injuries) {
         map[injury.y][injury.x] = false
      }
      for (let status of map.flat()) {
         if (status) {
            return false
         }
      }
      game.stage = 'finish'
      refrshText('gameInfo', 'игра окончена')
      return true
   }

}
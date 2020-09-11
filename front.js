//Scaling Options
//Scaling can have values as follows wirth full being default
//"fit" sets canvas and stage to dimensions and scales to fit inside window
var scaling = "fit";
var width = 1280;
var height = 960;
var hero = ["img/arn1.png"];
var frame = new Frame(scaling, width, height);
let hero1 = {};
let token = {};
let token3 = {};
let token4 = {};
let token2 = {};
let positionX = {};
let position2X = {};
let position3X = {};
let position4X = {};
let positionY = {};
const tokenArray = [];

frame.on("ready", function () {
  zog("ready from ZIM Frame");
  var stage = frame.stage;
  var stageW = frame.width;
  var stageH = frame.height;
  frame.outerColor = "#444";
  frame.color = "#ddd";
  var spriteImage = frame.asset("img/arn1.png");
  var holder = new Container();
  var tiles = new Tile(
    new Rectangle(70, 70, frame.light, frame.dark).centerReg(),
    6,
    6
  )
    .rot(0)
    .addTo(holder)
    .outline();
  holder.sca(2, 2).center();
  window.tiles = tiles;
  tiles.on("click", function (e) {
    console.log(e);
  });
  tiles.on("mouseover", function (e) {
    e.target.color = frame.grey;
    stage.update();
  });
  tiles.on("mouseout", function (e) {
    e.target.color = frame.light;
    stage.update();
  });

  class Hero extends Sprite {
    constructor(image, cols, rows, name, attack, health, team) {
      super(image, cols, rows);
      this.name = name;
      this.attack = attack;
      this.health = health;
      this.team = team;
      this.active = false;
      this.hero = true;
      this.inRange = false;
      this.image = image;
      this.position = { x: 0, y: 0 };
    }

    // distanceDetection(token) {
    //   if (this.x - token >= 200) {
    //     console.log("distance");
    //   } else {
    //     console.log("tooclose");
    //   }
    // }

    whoAmI() {
      console.log(this.name, this.cool, this);
      for (let token of tokenArray) {
        token.active = false;
      }
      this.active = true; //!this.active
      seeMoveOptions(this);
      seeAttackOptions(this);
      document.querySelector("#whoami").innerHTML = this.name;
    }
    dealDamage() {
      //   if (this.canMovehere) {

      return this.attack;
      //   } else {
      //     alert("Enemy is too far");
      //   }
    }
    receiveDamage(dmg) {
      if (!this.inRange) {
        alert("You're out of range");
        return;
      }
      this.health -= dmg;
      if (this.health > 0) {
        console.log(`${this.name} received ${dmg} points of damage!`);
      } else {
        console.log(`${this.name} has died! RIP.`);
      }
      updateBoard();
    }
    moveToken(e) {
      console.log(this.image.width, this.image.height, e.target);
      var point = tiles.localToGlobal(e.target.x, e.target.y);
      console.log(point);
      this.position = { x: e.target.tileCol, y: e.target.tileRow };
      this.animate({
        obj: {
          x: point.x - 60,
          y: point.y - 80,
        },
        time: 1,
        events: true,
      });
      setTimeout(function () {
        console.log("next");
      }, 1000);
      stage.update();
    }
  }

  class Token extends Circle {
    constructor(size, color, border, name, attack, health, team) {
      super(size, color, border);
      this.name = name;
      this.attack = attack;
      this.health = health;
      this.team = team;
      this.active = false;
      this.inRange = false;
      this.position = { x: 5, y: 5 };
    }
    whoAmI() {
      console.log(this.team);
      for (let token of tokenArray) {
        token.active = false;
      }
      this.active = true; //!this.active
      seeMoveOptions2(this);
      seeAttackOptions(this);
      document.querySelector("#whoami").innerHTML = this.name;
    }
    dealDamage() {
      if (this.inRange) {
        return this.attack;
      } else {
        alert("The Enemy is too far");
      }
    }
    receiveDamage(dmg) {
      if (!this.inRange) {
        alert("You're out of range");
        return;
      }
      this.health -= dmg;
      if (this.health > 0) {
        console.log(`${this.name} received ${dmg} points of damage!`);
      } else {
        console.log(`${this.name} has died! RIP.`);
      }
      updateBoard();
    }
    moveToken(e) {
      var point = tiles.localToGlobal(e.target.x, e.target.y);
      console.log(point);
      this.position = { x: e.target.tileCol, y: e.target.tileRow };
      console.log(this.position);
      this.animate({
        obj: {
          x: point.x,
          y: point.y,
        },
        time: 1,
        events: true,
      });
      setTimeout(function () {
        console.log("next");
      }, 1000);
      stage.update();
    }
  }

  frame.on("complete", function () {
    zog("hello hello");

    hero1 = new Hero(spriteImage, 8, 1, "Arngrim", 25, 30, "good", {
      x: 0,
      y: 0,
    })
      .sca(1.5)
      .center()
      .animate({ loop: true })
      .run({ time: 0.8, loop: true });
    window.hero1 = hero1;
    // tokenArray.push(hero1);

    token = new Token(
      40,
      frame.red,
      frame.dark,
      "red ball",
      15,
      30,
      "evil"
    ).center();

    token1 = new Token(
      40,
      frame.blue,
      frame.dark,
      "blue ball",
      15,
      30,
      "evil"
    ).center();

    tokenArray.push(hero1, token, token1);
    hero1.moveToken({ target: { x: 40, y: 45, tileCol: 0, tileRow: 0 } });
    token.moveToken({ target: { x: 380, y: 380, tileCol: 5, tileRow: 5 } });
    token1.moveToken({ target: { x: 380, y: 380, tileCol: 5, tileRow: 5 } });
    wireupEvents();
  });

  //   function attackEnemy() {}

  //   function showEnemy() {
  //     enemyList.innerHTML += `enemy:${token.name}`;
  //   }
  //   function showEnemies() {
  //     let buttons = document.querySelector(".buttons1");
  //     let enemyList = document.querySelector("#enemylist");
  //     let enemyButton = document.querySelector(".enemy");

  //     enemylist.innerHTML = ``;
  //     enemy.addEventListener("click", showEnemy);
  //   }

  function updateBoard() {
    let score = document.querySelector("#evil-scoreboard");
    let score2 = document.querySelector("#good-scoreboard");
    score.innerHTML = ``;
    score2.innerHTML = ``;
    for (let token of tokenArray) {
      // if (token.health <= 0) {
      //     tokenArray.remove(tokenArray.indexOf(token))
      // }
      if (token.team == "evil") {
        score.innerHTML += `<li>name:${token.name} Health:${token.health}  Attack:${token.attack} </li>`;
      } else {
        score2.innerHTML += `<li>name:${token.name} Health:${token.health}  Attack:${token.attack} </li>`;
      }
    }
  }

  //   window.token = token;
  //   tokenArray.push(token);
  //   token.moveToken({ target: { x: 255, y: 255 } });
  //   tokenArray.push(token);

  //   wireupEvents();
  //   token3 = new Token(
  //     35,
  //     frame.purple,
  //     frame.dark,
  //     "purple ball",
  //     15,
  //     30,
  //     "evil"
  //   ).center();
  //   token4 = new Token(
  //     30,
  //     frame.green,
  //     frame.dark,
  //     "green ball",
  //     15,
  //     30,
  //     "good"
  //   ).center();
  //   token2 = new Token(
  //     25,
  //     frame.blue,
  //     frame.dark,
  //     "blue ball",
  //     15,
  //     30,
  //     "good"
  //   ).center();
  var proportion = new Proportion(0, stageH, 0.8, 1.3);
  //   let tokenArray = [token]; //, token2, token3, token4];
  // let tokenArray = []
  updateBoard();

  // token.receiveDamage(hero1.dealDamage(10))

  function wireupEvents() {
    // lets add our events in this loop
    for (let token of tokenArray) {
      // create a click event on token to set it to become active
      token.on("click", token.whoAmI);
      token.on("animation", function () {
        token.sca(proportion.convert(token.y));
      });
    }
    window.token = token;
    tiles.on("click", function (e) {
      console.log("I clicked on tile", e.target.tileCol, e.target.tileRow);
      console.log(e.target);
      for (let token of tokenArray) {
        // if token has been confirmed to be active, it can be moved
        if (token.active) {
          if (e.target.canMovehere) {
            token.moveToken(e);
          } else {
            alert("Cant move there");
          }
        }
        // resetting tokens activity to false after each movement
        token.active = false;
      }
    });
  }

  //   positionX = token.x;
  //   position2X = token2.x;
  //   position3X = token3.x;
  //   position4X = token4.x;
  //   positionY = token.y;
  //   position2Y = token2.y;
  //   position3Y = token3.y;
  //   position4Y = token4.y;

  //   let positionsArray = [
  //     token.x,
  //     token2.x,
  //     token3.x,
  //     token4.x,
  //     token.y,
  //     token2.y,
  //     token3.y,
  //     token4.y,
  //   ];

  function collisionDetection() {
    for (let token of tokenArray) {
      for (let tile of tiles.children) {
        console.log(token, tile, token.name, tile.tileCol, tile.tileRow);
        tile.color = frame.red;
        // break
      }
    }
  }
  window.collisionDetection = collisionDetection;

  function seeMoveOptions(token) {
    //for (let token of tokenArray) {
    for (let tile of tiles.children) {
      console.log(token.position, token.name, tile.tileCol, tile.tileRow);
      if (
        (tile.tileCol == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol + 1 == token.position.x &&
          tile.tileRow + 1 == token.position.y) ||
        (tile.tileCol - 1 == token.position.x &&
          tile.tileRow - 1 == token.position.y) ||
        (tile.tileCol + 1 == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol == token.position.x &&
          tile.tileRow + 1 == token.position.y) ||
        (tile.tileCol + 1 == token.position.x &&
          tile.tileRow - 1 == token.position.y) ||
        (tile.tileCol - 1 == token.position.x &&
          tile.tileRow + 1 == token.position.y) ||
        (tile.tileCol - 1 == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol == token.position.x &&
          tile.tileRow - 1 == token.position.y)
      ) {
        console.log("now");
        //Check if there's a bad guy in there
        tile.canMovehere = true;
        tile.canAttackHere = true;

        tile.color = frame.blue;
      } else {
        tile.canMovehere = false;
        tile.canAttackHere = false;
        tile.color = frame.light;
      }

      // break
    }
    //}
  }

  function seeMoveOptions2(token) {
    //for (let token of tokenArray) {
    for (let tile of tiles.children) {
      if (
        (tile.tileCol == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol + 1 == token.position.x &&
          tile.tileRow + 1 == token.position.y) ||
        (tile.tileCol - 1 == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol + 1 == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol + 2 == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol + 3 == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol - 1 == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol - 2 == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol - 3 == token.position.x &&
          tile.tileRow == token.position.y) ||
        (tile.tileCol == token.position.x &&
          tile.tileRow + 1 == token.position.y) ||
        (tile.tileCol == token.position.x &&
          tile.tileRow + 2 == token.position.y) ||
        (tile.tileCol == token.position.x &&
          tile.tileRow + 3 == token.position.y) ||
        (tile.tileCol == token.position.x &&
          tile.tileRow - 1 == token.position.y) ||
        (tile.tileCol == token.position.x &&
          tile.tileRow - 2 == token.position.y) ||
        (tile.tileCol == token.position.x &&
          tile.tileRow - 3 == token.position.y)
      ) {
        console.log("now");
        //Check if there's a bad guy in there
        tile.canMovehere = true;
        tile.canAttackHere = true;

        tile.color = frame.blue;
      } else {
        tile.canMovehere = false;
        tile.canAttackHere = false;
        tile.color = frame.light;
      }

      // break
    }
    //}
  }
  window.seeMoveOptions = seeMoveOptions;
  window.seeMoveOptions2 = seeMoveOptions2;

  function seeAttackOptions(token) {
    //for (let token of tokenArray) {

    //for (let tile of tiles.children) {
    console.log("now");
    //Check if there's a bad guy in there
    for (let tok of tokenArray) {
      if (tok.team !== token.team) {
        console.log(tok, tok.position, tok.team);
        console.log(token, token.position, token.team);
        if (
          (tok.position.x == token.position.x &&
            tok.position.y == token.position.y) ||
          (tok.position.x + 1 == token.position.x &&
            tok.position.y + 1 == token.position.y) ||
          (tok.position.x - 1 == token.position.x &&
            tok.position.y - 1 == token.position.y) ||
          (tok.position.x + 1 == token.position.x &&
            tok.position.y == token.position.y) ||
          (tok.position.x == token.position.x &&
            tok.position.y + 1 == token.position.y) ||
          (tok.position.x + 1 == token.position.x &&
            tok.position.y - 1 == token.position.y) ||
          (tok.position.x - 1 == token.position.x &&
            tok.position.y + 1 == token.position.y) ||
          (tok.position.x - 1 == token.position.x &&
            tok.position.y == token.position.y) ||
          (tok.position.x == token.position.x &&
            tok.position.y - 1 == token.position.y)
        ) {
          console.log(tok, tok.team, tok.position, token.position);
          //   tile.canAttackHere = true;
          tok.color = frame.purple;
          tok.inRange = true;

          let tile = tiles.children.find(
            (tile) =>
              tile.tileCol === tok.position.x && tile.tileRow === tok.position.y
          );
          tile.color = frame.red;
        } else {
          tok.color = frame.red;
          tok.inRange = false;

          //   tile.canAttackHere = false;
          // tile.color = frame.light;
        }
      }
    }

    // break
    //}
    //}
  }
  window.seeAttackOptions = seeAttackOptions;
  // token2.on("animation", function () {
  //     token2.sca(proportion.convert(token2.y));
  // });
  stage.update();
});

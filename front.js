var scaling = "fit";
var width = 1280;
var height = 960;
// var bgm = ["bgm/battle1.mp3"]
// var heroes = ["img/background1.jpg", "img/background2.jpg", "img/background3.jpg", "img/background4.jpg", "img/arn1.png", "img/EvilHealer.png", "img/GoodHealer.png", "img/EvilHero.png", "img/EvilMage.png", "img/EvilRange.png", "img/GoodMage.png", "img/GoodRange.png", "img/background.PNG"]
var frame = new Frame(scaling, width, height);
let tokenArray = []
let hero1 = {};
let token = {};
let token3 = {};
let token4 = {};
let token2 = {};

// const tokenArray = [];





frame.on("ready", function () {
    zog("ready from ZIM Frame");
    var stage = frame.stage;
    var stageW = frame.width;
    var stageH = frame.height;
    frame.outerColor = "#444";
    frame.color = "black";
    // frame.loadAssets("bgm/battle1.mp3", "img/background1.jpg", "img/background2.jpg", "img/background3.jpg", "img/background4.jpg", "img/arn1.png", "img/EvilHealer.png", "img/GoodHealer.png", "img/EvilHero.png", "img/EvilMage.png", "img/EvilRange.png", "img/GoodMage.png", "img/GoodRange.png", "img/background.PNG")


    var background = asset("img/background1.jpg")
    var gHeroImg = asset("img/arn1.png")
    var gMageImg = asset("img/GoodMage.png")
    var gRangerImg = asset("img/GoodRange.png")
    var gHealerImg = asset("img/GoodHealer.png")
    var eHeroImg = asset("img/EvilHero.png")
    var eMageImg = asset("img/EvilMage.png")
    var eRangerImg = asset("img/EvilRange.png")
    var eHealerImg = asset("img/EvilHealer.png")
    // // bgmusic.play();




    class Hero extends Sprite {
        constructor(image, cols, rows, name, attack, health, team, xSpr, ySpr) {
            super(image, cols, rows)
            this.name = name
            this.attack = attack
            this.health = health
            this.team = team
            this.xSpr = xSpr
            this.ySpr = ySpr
            this.active = false
            this.hero = true
            this.image = image
            this.position = { x: 0, y: 0 }
            this.turn = false
        }
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
                    x: point.x - this.xSpr,
                    y: point.y - this.ySpr,
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
    class Fighter extends Hero {
        whoAmI() {
            console.log(this.name, this.cool, this);
            for (let token of tokenArray) {
                token.active = false;
            }
            this.active = true; //!this.active
            seeMoveOptions2(this);
            seeAttackOptions(this);
            document.querySelector("#whoami").innerHTML = this.name;
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

    let heroAssets = 0

    frame.on("complete", function () {
        heroAssets++;

        console.log('Fake complete')
        var holder = new Container();
        var tiles = new Tile(new Rectangle(50, 50, frame.faint, frame.light).centerReg(), 8, 8)
            .rot(45)
            .addTo(holder)
            .outline()
        holder.sca(2, 1).center();
        window.tiles = tiles
        tiles.on('click', function (e) {
            console.log(e)
        })
        tiles.on("mouseover", function (e) {

            e.target.color = frame.red;
            stage.update();
        })
        tiles.on("mouseout", function (e) {
            e.target.color = frame.faint;
            stage.update();
        })


        var goodHero = new Fighter(gHeroImg, 8, 1, "Arngrim, Champion of the Gauntlet", 25, 30, "good", 105, 110).center().animate({ loop: true }).sca(1.5).run({ time: 0.8, loop: true });
        window.goodHero = goodHero
        goodHero.moveToken({ target: { x: 40, y: 45, tileCol: 0, tileRow: 0 } });
        var goodMage = new Hero(gMageImg, 4, 1, "Laurel, Sorceress Supreme", 25, 30, "good", 65, 90).center().animate({ loop: true }).sca(1.5).run({ time: 0.6, loop: true });
        window.goodMage = goodMage
        goodMage.moveToken({ target: { x: 70, y: 320, tileCol: 1, tileRow: 6 } });
        // var goodRanger = new Hero(gRangerImg, 4, 1, "Freiya, Arcane Archer", 25, 30, "good", 70, 110).center().animate({ loop: true }).sca(1.5).run({ time: 0.6, loop: true });
        // window.goodRanger = goodRanger
        var goodHealer = new Hero(gHealerImg, 4, 1, "Priestess of the Light", 25, 30, "good", 65, 95).center().animate({ loop: true }).sca(1.5).run({ time: 0.6, loop: true });
        window.goodHealer = goodHealer
        goodHealer.moveToken({ target: { x: 170, y: 320, tileCol: 3, tileRow: 6 } });
        goodMage.moveToken({ target: { x: 70, y: 320, tileCol: 1, tileRow: 6 } });
        var evilHero = new Hero(eHeroImg, 4, 1, "Paragon of Darkness", 25, 30, "evil", 108, 105).center().animate({ loop: true }).sca(1.5).run({ time: 0.8, loop: true });
        window.evilHero = evilHero
        evilHero.moveToken({ target: { x: 90, y: 95, tileCol: 1, tileRow: 1 } });
        // var evilMage = new Hero(eMageImg, 4, 1, "Zazavozz the Umbral Magus", 25, 30, "evil", 55, 110).center().animate({ loop: true }).sca(1.5).run({ time: 0.8, loop: true });
        // window.evilMage = evilMage
        // var evilRanger = new Hero(eRangerImg, 4, 1, "Akama, Ocelot Sniper", 25, 30, "evil", 50, 125).center().animate({ loop: true }).sca(1.5).run({ time: 0.8, loop: true });
        // window.evilRanger = evilRanger
        // var evilHealer = new Hero(eHealerImg, 4, 1, "Hera, Defiler of Streams", 25, 30, "evil", 87, 105).center().animate({ loop: true }).sca(1.5).run({ time: 0.8, loop: true });
        // window.evilHealer = evilHealer
        // console.log(frame.assets, typeof frame.assets, Object.keys(frame.assets).length)
        if (heroAssets < 9) {
            // return
        } else {
            console.log("I've reached my final form")
            tokenArray.push(goodHero, goodMage, goodMage, goodHealer, evilHero)
            // tokenArray.push(goodHero, goodMage, goodRanger, goodHealer, evilHero, evilMage, evilRanger, evilHealer)
        }
        // }
        background.center()








        wireupEvents()
        updateBoard()




        function updateBoard() {
            let score = document.querySelector('#evil-scoreboard')
            let score2 = document.querySelector('#good-scoreboard')
            score.innerHTML = ``
            score2.innerHTML = ``
            for (let token of tokenArray) {
                // if (token.health <= 0) {
                //     tokenArray.remove(tokenArray.indexOf(token))
                // }
                if (token.team == "evil") {
                    score.innerHTML += `<li>name:${token.name} Health:${token.health}  Attack:${token.attack} </li>`
                }
                else {
                    score2.innerHTML += `<li>name:${token.name} Health:${token.health}  Attack:${token.attack} </li>`
                }
            };
        }



        var proportion = new Proportion(0, stageH, 1.2, 1.7);

        updateBoard();



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
                    tile.color = frame.clear;
                }




                updateBoard()
            }
        }





        function collisionDetection() {
            for (let token of tokenArray) {
                for (let tile of tiles.children) {
                    console.log(token, tile, token.name, token._bounds, tile._bounds)
                    tile.color = frame.red
                    break
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
                    tile.color = frame.clear;
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

    })
})
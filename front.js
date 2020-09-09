//Scaling Options
//Scaling can have values as follows wirth full being default
//"fit" sets canvas and stage to dimensions and scales to fit inside window
var scaling = "fit";
var width = 1280;
var height = 960;
var hero = ["img/arn1.png"]
var frame = new Frame(scaling, width, height);
let token = {}
let token3 = {}
let token4 = {}
let token2 = {}

frame.on("ready", function () {
    zog("ready from ZIM Frame");
    var stage = frame.stage;
    var stageW = frame.width;
    var stageH = frame.height;
    frame.outerColor = "#444";
    frame.color = "#ddd";
    var spriteImage = frame.asset("img/arn1.png")
    var holder = new Container();
    var tiles = new Tile(new Rectangle(70, 70, frame.light, frame.dark).centerReg(), 6, 6)
        .rot(45)
        .addTo(holder)
        .outline()
    holder.sca(2, 1).center();
    window.tiles = tiles
    tiles.on('click',function (e){
        console.log(e)
    })
    tiles.on("mouseover", function (e) {
        
        e.target.color = frame.grey;
        stage.update();
    })
    tiles.on("mouseout", function (e) {
        e.target.color = frame.light;
        stage.update();
    })

    class Hero extends Sprite {
        constructor(image, cols, rows, name, attack, health, team) {
            super(image, cols, rows)
            this.name = name
            this.attack = attack
            this.health = health
            this.team = team
            this.active = false
            this.hero = true
            this.image = image
            this.position={x:0,y:0}
        }
        whoAmI() {
            console.log(this.name,this.position)
            for (let token of tokenArray) {
                token.active = false
            }
            this.active = true//!this.active
            document.querySelector('#whoami').innerHTML=this.name
        }
        dealDamage() {
            return this.attack
        }
        receiveDamage(dmg) {
            this.health -= dmg;
            if (this.health > 0) {
                console.log(`${this.name} received ${dmg} points of damage!`)
            } else { console.log(`${this.name} has died! RIP.`) }
            updateBoard()
        }
        moveToken(e) {
            console.log(this.image.width, this.image.height)
            var point = tiles.localToGlobal(e.target.x, e.target.y)
            console.log(point)
            this.position={x:point.x,y:point.y}
            this.animate({
                obj: {
                    x: point.x - 60,
                    y: point.y - 80
                },
                time: 1,
                events: true
            });
            setTimeout(function () {
                console.log('next')
            }, 1000)
            stage.update();
        }
    }


    class Token extends Circle {
        constructor(size, color, border, name, attack, health, team) {
            super(size, color, border)
            this.name = name
            this.attack = attack
            this.health = health
            this.team = team
            this.active = false
            this.position= {x:0,y:0}
        }
        whoAmI() {
            console.log(this.team)
            for (let token of tokenArray) {
                token.active = false
            }
            this.active = true//!this.active
            document.querySelector('#whoami').innerHTML=this.name
        }
        dealDamage() {
            return this.attack
        }
        receiveDamage(dmg) {
            this.health -= dmg;
            if (this.health > 0) {
                console.log(`${this.name} received ${dmg} points of damage!`)
            } else { console.log(`${this.name} has died! RIP.`) }
            updateBoard()
        }
        moveToken(e) {
            var point = tiles.localToGlobal(e.target.x, e.target.y)
            console.log(point)
            this.position={x:point.x,y:point.y}
            this.animate({
                obj: {
                    x: point.x,
                    y: point.y
                },
                time: 1,
                events: true
            });
            setTimeout(function () {
                console.log('next')
            }, 1000)
            stage.update();
        }
    }

    frame.on("complete", function () {
        zog("hello hello")


        var hero1 = new Hero(spriteImage, 8, 1, "Arngrim", 25, 30, "good").sca(1.5).center().animate({ loop: true }).run({ time: 0.8, loop: true });
        window.hero1 = hero1
        tokenArray.push(hero1)
        wireupEvents()


    })


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
        }

    }



    token = new Token(40, frame.red, frame.dark, "red ball", 15, 30, "evil").center();
    token3 = new Token(35, frame.purple, frame.dark, "purple ball", 15, 30, "evil").center();
    token4 = new Token(30, frame.green, frame.dark, "green ball", 15, 30, "good").center();
    token2 = new Token(25, frame.blue, frame.dark, "blue ball", 15, 30, "good").center();
    var proportion = new Proportion(0, stageH, .8, 1.3);
    let tokenArray = [token, token2, token3, token4]
    // let tokenArray = []
    updateBoard()

    // token.receiveDamage(token3.dealDamage())

    function wireupEvents() {
        // lets add our events in this loop
        for (let token of tokenArray) {
            // create a click event on token to set it to become active
            token.on("click", token.whoAmI)
            token.on("animation", function () {
                console.log('blah')
                token.sca(proportion.convert(token.y));
            })
        }
        window.token = token
        tiles.on("click", function (e) {
            console.log('check check')
            for (let token of tokenArray) {
                // if token has been confirmed to be active, it can be moved
                if (token.active) {
                    token.moveToken(e)
                }
                // resetting tokens activity to false after each movement
                token.active = false
            }
        })
    }




    function collisionDetection() {
        for (let token of tokenArray) {
            for (let tile of tiles.children) {
                console.log(token, tile, token.name, token._bounds,tile._bounds)
                tile.color = frame.red
                break
            }
        }
    }
    window.collisionDetection = collisionDetection
    // token2.on("animation", function () {
    //     token2.sca(proportion.convert(token2.y));
    // });
    stage.update();
});


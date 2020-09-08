//Scaling Options
//Scaling can have values as follows wirth full being default
//"fit" sets canvas and stage to dimensions and scales to fit inside window
var scaling = "fit";
var width = 1280;
var height = 960;
var hero = ["img/arn1.png"]
var frame = new Frame(scaling, width, height);
frame.on("ready", function () {
    zog("ready from ZIM Frame");
    var stage = frame.stage;
    var stageW = frame.width;
    var stageH = frame.height;
    frame.outerColor = "#444";
    frame.color = "#ddd";
    var holder = new Container();
    var tiles = new Tile(new Rectangle(70, 70, frame.light, frame.dark).centerReg(), 6, 6)
        .rot(45)
        .addTo(holder)
        .outline()
    holder.sca(2, 1).center();
    window.tiles = tiles
    tiles.on("mouseover", function (e) {
        e.target.color = frame.grey;
        stage.update();
    })
    tiles.on("mouseout", function (e) {
        e.target.color = frame.light;
        stage.update();
    })
    class Token extends Circle {
        constructor(size, color, border, attack, health, team) {
            super(size, color, border)
            this.attack = attack
            this.health = health
            this.team = team
            this.active = false
        }
        whoAmI() {
            console.log(this.team)
            for (let token of tokenArray) {
                token.active = false
            }
            this.active = true//!this.active
        }
        moveToken(e) {
            var point = tiles.localToGlobal(e.target.x, e.target.y)
            console.log(point)
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
    let token = new Token(40, frame.red, frame.dark, 15, 30, "red").center();
    let token3 = new Token(35, frame.purple, frame.dark, 15, 30, "purple").center();
    let token4 = new Token(30, frame.green, frame.dark, 15, 30, "green").center();
    let token2 = new Token(25, frame.blue, frame.dark, 15, 30, "blue").center();
    var proportion = new Proportion(0, stageH, .8, 1.3);
    let tokenArray = [token, token2, token3, token4]
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
    function collisionDetection() {
        for (let token of tokenArray) {
            for (let tile of tiles.children) {
                console.log(token, tile)
                tile.color = frame.red
            }
        }
    }
    window.collisionDetection = collisionDetection
    // token2.on("animation", function () {
    //     token2.sca(proportion.convert(token2.y));
    // });
    stage.update();
});
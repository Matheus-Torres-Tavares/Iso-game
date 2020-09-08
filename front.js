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

    // new Sprite(hero)
    //     .center()
    //     .run({ time: 1000, loop: true });


    var holder = new Container();

    var tiles = new Tile(new Rectangle(70, 70, frame.light, frame.dark).centerReg(), 6, 6)
        .rot(45)
        .addTo(holder)
        .outline()
    holder.sca(2, 1).center();

    tiles.on("mouseover", function (e) {
        e.target.color = frame.grey;
        stage.update();
    })
    tiles.on("mouseout", function (e) {
        e.target.color = frame.light;
        stage.update();
    })

    // var ball = new Circle(40, frame.blue, frame.dark).center().sha();

    // tiles.on("click", function (e) {
    //     console.log('check check')
    //     var point = tiles.localToGlobal(e.target.x, e.target.y)
    //     token2.animate({
    //         obj: {
    //             x: point.x,
    //             y: point.y
    //         },
    //         time: 1,
    //         events: true
    //     });
    //     stage.update();
    // })
    //     ;



    class Token extends Circle {
        constructor(size, color, border, attack, health, team) {
            super(size, color, border)
            this.attack = attack
            this.health = health
            this.team = team

        }
        whoAmI() {
            console.log(this.team)
        }
        moveToken(e) {

            var point = tiles.localToGlobal(e.target.x, e.target.y)
            this.animate({
                obj: {
                    x: point.x,
                    y: point.y
                },
                time: 1,
                events: true
            });
            stage.update();
        }
    }


    let token = new Token(30, frame.red, frame.dark, 15, 30, "red").center();
    let token2 = new Token(70, frame.blue, frame.dark, 15, 30, "blue").center();
    let tokenArray = [token, token2]
    tokenArray.map(v => {

    })
    window.token = token
    token.on("click", function (e) {
        this.whoAmI()

        tiles.on("click", function (e) {
            console.log('check check')
            var point = tiles.localToGlobal(e.target.x, e.target.y)
            token.animate({
                obj: {
                    x: point.x,
                    y: point.y
                },
                time: 1,
                events: true
            });
            stage.update();
            tiles.unbind("click")
        });


    })

    token2.on("click", function (e) {
        this.whoAmI()
        tiles.on("click", function (e) {
            console.log('check check')
            var point = tiles.localToGlobal(e.target.x, e.target.y)
            token2.animate({
                obj: {
                    x: point.x,
                    y: point.y
                },
                time: 1,
                events: true
            });
            stage.update();
            tiles.off("click")
        });


    })
    var proportion = new Proportion(0, stageH, .8, 1.3);
    token2.on("animation", function () {
        token2.sca(proportion.convert(token2.y));
    });

    stage.update();

});



// class Char {
//     constructor(img,spriteW, spriteH, rows, cols, width, height,x,y,srcX, srcY) {
//         this.img = img;
//         this.spriteW = spriteW;
//         this.spriteH = spriteH,
//         this.rows = rows;
//         this.cols = cols;
//         this.width = width;
//         this.height = height;
//         this.x = x;
//         this.y = y;
//         this.srcX = srcX;
//         this.srcY = srcY;
//     }
// }
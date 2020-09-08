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

    var tiles = new Tile(new Rectangle(70, 70, frame.light, frame.dark).centerReg(), 8, 8)
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

    var ball = new Circle(40, frame.blue, frame.dark).center().sha();
    tiles.on("click", function (e) {
        var point = tiles.localToGlobal(e.target.x, e.target.y)
        ball.animate({
            obj: {
                x: point.x,
                y: point.y
            },
            time: 1,
            events: true
        });
        stage.update();
    });
    var proportion = new Proportion(0, stageH, .8, 1.3);
    ball.on("animation", function () {
        ball.sca(proportion.convert(ball.y));
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
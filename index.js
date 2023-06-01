import * as PIXI from "pixi.js";
import Victor from "victor";


let canvasSize = 256;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x5c812f,
});

let squareWidth = 32;
const square = new PIXI.Sprite(PIXI.Texture.WHITE);
square.anchor.set(0.5);
square.position.set(app.screen.width / 2, app.screen.height / 2);
square.width = square.height = squareWidth;
square.tint = 0xea985d;

app.stage.addChild(square);

let enemyRadius = 16;
const enemy = new PIXI.Graphics();
let r = randomSpawnPoint();
enemy.position.set(r.x, r.y);
enemy.beginFill(0xFF0000, 1);
enemy.drawCircle(0, 0, enemyRadius);
enemy.endFill();
app.stage.addChild(enemy);

app.ticker.add((delta) => {
    const cursorPosition = app.renderer.plugins.interaction.mouse.global;
    let angle = Math.atan2(cursorPosition.y - square.position.y, cursorPosition.x - square.position.x) + Math.PI / 2;
    square.rotation = angle;
})

function randomSpawnPoint() {
    let edge = Math.floor(Math.random() * 4);
    let spawnPoint = new Victor(0, 0)
    switch (edge) {
        case 0: spawnPoint.x = canvasSize * Math.random();
            break;
        default:
            break;
    }
    return spawnPoint;
}
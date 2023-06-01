import * as PIXI from "pixi.js";
import Victor from "victor";
import Player from "./player";


const canvasSize = 256;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x5c812f,
});

let player = new Player({ app });

const enemyRadius = 16;
const enemySpeed = 2;
const enemy = new PIXI.Graphics();
let r = randomSpawnPoint();
enemy.position.set(r.x, r.y);
enemy.beginFill(0xFF0000, 1);
enemy.drawCircle(0, 0, enemyRadius);
enemy.endFill();
app.stage.addChild(enemy);

app.ticker.add((delta) => {
    player.update();

    // let e = new Victor(enemy.position.x, enemy.position.y);
    // let s = new Victor(square.position.x, square.position.y);
    // if (e.distance(s) < squareWidth / 2) {
    //     let r = randomSpawnPoint();
    //     enemy.position.set(r.x, r.y);
    //     return;
    // }
    // let d = s.subtract(e);
    // let v = d.normalize().multiplyScalar(enemySpeed);
    // enemy.position.set(enemy.position.x + v.x, enemy.position.y + v.y);
})

function randomSpawnPoint() {
    let edge = Math.floor(Math.random() * 4);
    let spawnPoint = new Victor(0, 0)
    switch (edge) {
        case 0: //top
            spawnPoint.x = canvasSize * Math.random();
            break;
        case 1: //right
            spawnPoint.x = canvasSize;
            spawnPoint.y = canvasSize * Math.random();
            break;
        case 2: //bottom
            spawnPoint.x = canvasSize * Math.random();;
            spawnPoint.y = canvasSize;
            break;
        default: //left
            spawnPoint.x = 0;
            spawnPoint.y = canvasSize * Math.random();
            break;
    }
    return spawnPoint;
}
import * as PIXI from "pixi.js";
import Player from "./player.js";
import Zombie from "./zombie.js";
import Spawner from "./spawner.js";
import { zombies } from "./globals.js";


const canvasSize = 400;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x312a2b,
    resolution: 2,
});

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

initGame();

async function initGame() {
    try {
        console.log("loading...");
        await loadAssets();
        console.log("loaded");

        let player = new Player({ app });
        let zSpawner = new Spawner({ app, create: () => new Zombie({ app, player }) });

        let gameStartScene = createScene("Click to Start")
        app.gameStarted = false;
        let gameOverScene = createScene(`Game Over! Better Luck Next Time 🍀`)

        app.ticker.add((delta) => {
            gameOverScene.visible = player.dead;
            gameStartScene.visible = !app.gameStarted;
            if (app.gameStarted === false) return;
            player.update(delta);
            zSpawner.spawns.forEach(zombie => zombie.update(delta));
            bulletHitTest({ bullets: player.shooting.bullets, zombies: zSpawner.spawns, bulletRadius: 8, zombieRadius: 16 });
        });

    } catch (error) {
        console.log(error.message);
        console.log("Load failed");
    }
}

function bulletHitTest({ bullets, zombies, bulletRadius, zombieRadius }) {
    bullets.forEach(bullet => {
        zombies.forEach((zombie, index) => {
            let dx = zombie.position.x - bullet.position.x;
            let dy = zombie.position.y - bullet.position.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < bulletRadius + zombieRadius) {
                zombies.splice(index, 1);
                zombie.kill();
            }
        })
    })
}

function createScene(sceneText) {
    const sceneContainer = new PIXI.Container();
    const text = new PIXI.Text(sceneText);
    text.x = app.screen.width / 2;
    text.y = 0;
    text.anchor.set(0.5, 0);
    sceneContainer.zIndex = 1;
    sceneContainer.addChild(text);
    app.stage.addChild(sceneContainer);
    return sceneContainer;
}

function startGame() {
    app.gameStarted = true;
}

async function loadAssets() {
    return new Promise((resolve, reject) => {
        zombies.forEach(z => PIXI.Loader.shared.add(`assets/${z}.json`));
        PIXI.Loader.shared.add("/assets/hero_male.json");
        PIXI.Loader.shared.add("bullet", "assets/bullet.png")
        PIXI.Loader.shared.onComplete.add(resolve);
        PIXI.Loader.shared.onError.add(reject);
        PIXI.Loader.shared.load();
    })
}

document.addEventListener("click", startGame);
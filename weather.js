import * as PIXI from 'pixi.js'
import * as PARTICLES from "pixi-particles";
import { rain } from '/emitter-config.js'

export default class Weather {
    constructor({ app }) {
        this.lightningGap = { min: 9000, max: 29000 };
        this.app = app;
        // this.createAudio();
        this.lightning = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.lightning.width = this.lightning.height = app.screen.width;
        this.lightning.tint = 0xffffff;
        this.lightning.alpha = 0.8;
        //this.flash();
        //rain
        const container = new PIXI.ParticleContainer();
        container.zIndex = 2;
        app.stage.addChild(container);
        const emitter = new PARTICLES.Emitter(container, [PIXI.Loader.shared.resources["rain"].texture], rain);
        let elapsed = Date.now();
        const update = function () {
            requestAnimationFrame(update);
            let now = Date.now();
            emitter.update((now - elapsed) * 0.001);
            elapsed = now;
        }
        emitter.emit = true;
        update();
    }
}
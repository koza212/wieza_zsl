import { Map } from './../map/map.js';  

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 840;
        this.canvas.height = 840;

        this.map = new Map("../../../assets/map.png");

        this.viewport = {
            y: 0,
            width: this.canvas.width,
            height: this.canvas.height,
        };

        this.init();
    }

    async init() {
        await this.map.load();
        this.addScrollControls()
        requestAnimationFrame(() => this.gameLoop());
    }

    addScrollControls() {
        this.canvas.addEventListener("wheel", (e) => {
            const scrollSpeed = 50; 
            if (e.deltaY > 0) {
                this.viewport.y += scrollSpeed; 
            } else {
                this.viewport.y -= scrollSpeed; 
            }

            // Making srue viewport dont go too high or low
            this.viewport.y = Math.max(0, Math.min(this.viewport.y, this.map.height - this.viewport.height));
        });
    }


    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.draw(this.ctx, this.viewport);

        requestAnimationFrame(() => this.gameLoop());
    }
}
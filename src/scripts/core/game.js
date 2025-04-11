canvas = document.querySelector('canvas');
c = canvas.getContext('2d');

class Game{
    constructor(){
        this.canvas = canvas
        this.c = c

        this.canvas.height = 576;
        this.canvas.width = 1024;

        this.gravity = 0.5;

        this.player = new Player({ x: 100, y: this.canvas.height - 100 }, this.c, this.canvas.width, this.canvas.height, this.gravity);
        this.keys = { a: false, d: false };
        this.background = new Sprite({
            position:{
                x: 0,
                y: 0,
            },
            //imageSrc: '../assets/map.png'},
            imageSrc: '../assets/maptest.png'},
            this.c
        );
        this.bindEventListeners();
        this.gameLoop();
    }
    
    bindEventListeners(){
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'd':
                    if (this.player.state === 'walking') {
                        this.keys.d = true;
                    } else if (this.player.state === 'charging') {
                        this.player.lastDirection = 1;
                    }
                    break;
                case 'a':
                    if (this.player.state === 'walking') {
                        this.keys.a = true;
                    } else if (this.player.state === 'charging') {
                        this.player.lastDirection = -1;
                    }
                    break;
                case 'w':
                    if (this.player.state === 'walking') {
                        this.player.state = 'charging';
                        this.player.velocity.x=0;
                        this.player.jumpCharge = 0;
                    }
                    break;
            }
        });
        
        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'd':
                    this.keys.d = false;
                    break;
                case 'a':
                    this.keys.a = false;
                    break;
                case 'w':
                    if (this.player.state === 'charging') {
                        this.player.state = 'jumping';
                        this.player.velocity.y = -this.player.jumpCharge;
                        this.player.velocity.x = this.player.lastDirection * (this.player.jumpCharge / 2);
                    }
                    break;
            }
        });
    }

    gameLoop() {
        this.c.fillStyle = 'white';
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.player.state === 'walking') {
            this.player.velocity.x *= 0.7;
            this.player.lastDirection=0;
            if (this.keys.d) this.player.velocity.x = 5;
            if (this.keys.a) this.player.velocity.x = -5;
        }
    
        if (this.player.state === 'charging' && this.player.jumpCharge < this.player.maxJumpCharge) {
            this.player.jumpCharge += 0.5;
        }
        this.c.save();
        this.c.scale(2,2);
        this.c.translate(0, -this.background.image.height + this.canvas.height/2);
        this.background.update();
        CollisionBlocks.forEach(CollisionBlock =>{
            CollisionBlock.update()
        })
        platformCollisionBlocks.forEach(PBlock =>{
            PBlock.update()
        })
        this.c.restore();   

        
    
        this.player.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}
const floorColisions2d = []
for(let i=0;i<floorColisions.length;i+=16){
    floorColisions2d.push(floorColisions.slice(i,i+16))

}
const CollisionBlocks = []
floorColisions2d.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol=== 13){
            CollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 32,
                    y: y*32,
                }
            }))
        }
    })
})

const platformCollision2d = []
for(let i=0;i<platformCollision.length;i+=16){
    platformCollision2d.push(platformCollision.slice(i,i+16))
}
const platformCollisionBlocks = []
platformCollision2d.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol=== 13){
            platformCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 32,
                    y: y*32,
                }
            }))
        }
    })
})


const game = new Game();  

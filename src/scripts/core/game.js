const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = 576;
canvas.width = 1024;

const gravity = 0.5;

class Player {
    constructor(position) {
        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.height = 100;
        this.state = 'walking'; 
        this.jumpCharge = 0;
        this.maxJumpCharge = 20;
        this.lastDirection = 0; // -1 (left), 0 (up), 1 (right)
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 100, this.height);
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.state === 'jumping') {
            if (this.position.y + this.height < canvas.height) {
                this.velocity.y += gravity;
            } else {
                this.velocity.y = 0;
                this.velocity.x = 0;
                this.position.y = canvas.height - this.height;
                this.state = 'walking';
            }
        }
    }
}

const player = new Player({ x: 100, y: canvas.height - 100 });
const keys = { a: false, d: false };

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            if (player.state === 'walking') {
                keys.d = true;
            } else if (player.state === 'charging') {
                player.lastDirection = 1;
            }
            break;
        case 'a':
            if (player.state === 'walking') {
                keys.a = true;
            } else if (player.state === 'charging') {
                player.lastDirection = -1;
            }
            break;
        case 'w':
            if (player.state === 'walking') {
                player.state = 'charging';
                player.velocity.x=0;
                player.jumpCharge = 0;
            }
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d = false;
            break;
        case 'a':
            keys.a = false;
            break;
        case 'w':
            if (player.state === 'charging') {
                player.state = 'jumping';
                player.velocity.y = -player.jumpCharge;
                player.velocity.x = player.lastDirection * (player.jumpCharge / 2);
            }
            break;
    }
});

function gameLoop() {
    requestAnimationFrame(gameLoop);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    if (player.state === 'walking') {
        player.velocity.x *= 0.7;
        player.lastDirection=0;
        if (keys.d) player.velocity.x = 5;
        if (keys.a) player.velocity.x = -5;
    }

    if (player.state === 'charging' && player.jumpCharge < player.maxJumpCharge) {
        player.jumpCharge += 0.5;
    }
    
    player.update();
}

gameLoop();

class Player {
    constructor(position, ctx, canvasWidth, cavasHeight, gravity) {
        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.height = 100;
        this.state = 'walking'; 
        this.jumpCharge = 0;
        this.maxJumpCharge = 20;
        this.lastDirection = 0; // -1 (left), 0 (up), 1 (right)
        this.c = ctx;
        this.gravity = gravity;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = cavasHeight;   
    }

    draw() {
        this.c.fillStyle = 'red';
        this.c.fillRect(this.position.x, this.position.y, 100, this.height);
        console.log('Drawing background at:', this.position);
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.state === 'jumping') {
            if (this.position.y + this.height < this.canvasHeight) {
                this.velocity.y += this.gravity;
            } else {
                this.velocity.y = 0;
                this.position.y = this.canvasHeight - this.height;
                this.state = 'walking';
            }
        }
    }
}

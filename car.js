class Car{
    constructor(x, y, width, height, ctx){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;
        this.sensor = new Sensor(this);
        this.controls = new Controls();
    }

    draw(){
        const {x, y, width, height, ctx, angle, sensor} = this;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-angle);
        ctx.beginPath();
        ctx.rect(
            - width/2,
            - height/2,
            width,
            height
        )
        ctx.fill();
        ctx.restore();
        sensor.draw();
    }

    update(roadBorders) {
        this.#move();
        this.sensor.update(roadBorders);
    }

    #move() {
        const xor = (a, b) => a || b && !(a && b);
        const controls = this.controls;
        if(xor(controls.forward, controls.reverse)){
            const modifier = this.controls.forward ? 1 : -1;
            this.speed += this.acceleration * modifier;
        }
        const reverseMaxSpeed = -this.maxSpeed / 2;
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        if (this.speed < reverseMaxSpeed) {
            this.speed = reverseMaxSpeed;
        }

        if (this.speed !== 0) {
            const modifier = this.speed > 0 ? 1 : -1;
            this.speed -= Math.min(this.friction, Math.abs(this.speed)) * modifier;
        }

        if (xor(this.controls.left, this.controls.right) && this.speed !== 0) {
            const controlModifier = this.controls.left ? 1 : -1;
            const speedModifier = this.speed > 0 ? 1 : -1;
            this.angle += 0.03 * controlModifier * speedModifier;
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }


}

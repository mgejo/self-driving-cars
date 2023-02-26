class Car{
    constructor(x, y, width, height, ctx){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.controls = new Controls();
    }

    draw(){
        const {x, y, width, height, ctx} = this;
        ctx.beginPath();
        ctx.rect(
            x - width/2,
            y - height/2,
            width,
            height
        )
        ctx.fill();
    }

    update() {
        const controls = this.controls;
        if(controls.forward){
            this.y -= 2;
        }
        if(controls.reverse){
            this.y += 2;
        }
        if(controls.left){
            this.x -= 2;
        }
        if(controls.right){
            this.x += 2;
        }
    }
}

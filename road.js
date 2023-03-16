class Road{
    constructor(x, width, lanecount=3, ctx) {
        this.x = x;
        this.width = width;
        this.laneCount = lanecount;
        this.ctx = ctx;

        this.left = x - width/2;
        this.right = x + width/2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = {x: this.left, y:this.top};
        const bottomLeft = {x: this.left, y:this.bottom};
        const topRight = {x: this.right, y:this.top};
        const bottomRight = {x: this.right, y:this.bottom};
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    gateLaneCenter(index) {
        const {width, laneCount, left} = this;
        const laneWidth = width/laneCount;
        return left + (1/2 + Math.min(index, laneCount - 1)) * laneWidth;
    }

    draw() {
        const {ctx, left, right, top, bottom, laneCount, borders} = this;
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        Array.from({ length: laneCount + 1 }).forEach((emptyElem, index) => {

            if (index == 0 || index == laneCount) {
                return;
            }
            ctx.setLineDash([20, 20]);
            const x = lerp(left, right, index/laneCount);
            ctx.beginPath();
            ctx.moveTo(x, top);
            ctx.lineTo(x, bottom);
            ctx.stroke();
        });
        ctx.setLineDash([]);
        borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}

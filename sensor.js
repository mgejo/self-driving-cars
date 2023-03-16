class Sensor{
    constructor(car) {
        this.car = car;
        this.rayCount = 10;
        this.rayLength = 200;
        this.raySpread = 2 * Math.PI / 3;
        this.rays = [];
        this.readings = [];
    }

    update(roadBorders) {
        this.#castRays();
        const rays = this.rays;
        this.readings = rays.map(ray => this.#getReading(ray, roadBorders));
    }

    #castRays() {
        const rays = [];
        const {raySpread, rayCount, rayLength, car} = this;
        Array.from({ length: rayCount }).forEach((emptyElem, index) => {
            const rayAngle = lerp(raySpread/2, -raySpread/2, index/(rayCount-1)) + car.angle;
            const start = {x: car.x, y: car.y};
            const end = {
                x: car.x - Math.sin(rayAngle) * rayLength,
                y: car.y - Math.cos(rayAngle) * rayLength
            };
            rays.push([start, end]);
        });
        this.rays = rays;
    }

    #getReading(ray, roadBorders) {
        const [rayStart, rayEnd] = ray;
        const touches = [];
        roadBorders.forEach(border =>{
            const touch = getIntersection(rayStart, rayEnd, border[0], border[1]);
            if (touch) {
                touches.push(touch);
            }
        });

        if (touches.length === 0) {
            return null;
        }

        touches.sort((a, b) => ( a.offset - b.offset ));

        return touches[0];
    }


    draw() {
        const {rays, car, readings} = this;
        const ctx = car.ctx;
        rays.forEach((ray, index) => {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            const [start, end] = ray;
            const reading = readings[index];
            const sensorEnd = reading ? reading : end;
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(sensorEnd.x, sensorEnd.y);
            ctx.stroke();

            if (!reading) {
                return;
            }


            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(sensorEnd.x, sensorEnd.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        });
    }
}

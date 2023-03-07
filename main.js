const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * .9, 3, ctx);
const car = new Car(road.gateLaneCenter(1), 100, 30, 50, ctx);
car.draw();

animate();


function animate() {
    car.update();
    canvas.height = window.innerHeight;
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * .7);
    road.draw();
    car.draw();
    ctx.restore();
    requestAnimationFrame(animate);
}

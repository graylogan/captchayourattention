(async () => {
// set up PIXI lmaoooooo
const app = new PIXI.Application();
await app.init({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.canvas);
// viewport.option.interaction=app.renderer.plugins.interaction;
// configure basket
const textureB = await PIXI.Assets.load("basket.png");
const basket = new PIXI.Sprite(textureB);
basket.anchor.set(0.5);
basket.x = window.innerWidth / 2;
basket.y = window.innerHeight - 50;
app.stage.addChild(basket);

app.ticker.maxFPS = 24;

let scoreData = document.getElementById("score");
// scoreData.style.left = (window.innerWidth / 2) + "px";
// scoreData.style.textAnchor = "center";

// configure apple
const textureA = await PIXI.Assets.load("apple.png");
const texturebomb = await PIXI.Assets.load("bomb_.png");
const apple = new PIXI.Sprite(textureA);
apple.anchor.set(0.5);
apple.x = Math.random() * window.innerWidth;
apple.y = -25;
app.stage.addChild(apple);

// generate bomb values
let bomb1 = Math.floor(Math.random() * 5) + 1;
let bomb2 = Math.floor(Math.random() * 5) + 1;
while (bomb2 === bomb1) {
    bomb2 = Math.floor(Math.random() * 5) + 1;
}
console.log(bomb1, bomb2);

let acceleration = 0.25;
let velocity = 0;

let currentDrop = 1;
let score = 0;

app.view.addEventListener('mousemove', onMouseMove);

function onMouseMove(event) {
    // Update the position of the sprite to follow the mouse pointer
    basket.position.set(event.clientX, window.innerHeight - 50);
}

alert('Pass this test to verify you are human.');

if ((currentDrop == bomb1) || (currentDrop == bomb2)){
    apple.texture = texturebomb;
}
else{
    apple.texture = textureA;
}

console.log(redir);

app.ticker.add((time) => {
    //console.log(basket.x);
    velocity += acceleration;
    apple.y += velocity;

    if (apple.y > window.innerHeight - 50) {
        if (Math.abs(apple.x - basket.x) < 35) {
            if ((currentDrop == bomb1) || (currentDrop == bomb2)){
                score -= 1;
                console.log("Oops, you caught a bomb: -1");
                scoreData.innerHTML = "Score: " + score;
            }
            else{
                score += 1;
                console.log("Score: " + score);
                scoreData.innerHTML = "Score: " + score;
            }
    
        }
        apple.x = Math.random() * (window.innerWidth - 50) + 25;
        apple.y = -25;
        velocity = 0;
        currentDrop += 1;
        if (currentDrop > 5) {
            app.ticker.stop();
            if (score > 2) {
                // alert("You got " + score);
                window.location.href = redir;
            }
            else {
                window.location.reload();
            }
        }
        if ((currentDrop == bomb1) || (currentDrop == bomb2)){
            apple.texture = texturebomb;
        }
        else{
            apple.texture = textureA;
        }

    }
    
});
})();
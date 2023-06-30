const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const hi_score = document.querySelector('#hiscoreBox');

const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
console.log(gameArea);

startScreen.addEventListener('click',start);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
let w = document.body.width;
let player = { speed : 10, score : 0};

let keys = {ArrowUp : false, ArrowDown : false, ArrowLeft: false, ArrowRight:false}
function keyDown(e){
    moveSound.play();
    if(e.key == " " || e.key == "Enter"){
        start();
    }
    e.preventDefault();
    keys[e.key]=true;
    console.log(e.key);console.log(keys);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    // console.log(e.key);
}

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}
function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){

        if(item.y >= 600){
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame(){
    musicSound.pause()
    gameOverSound.play();
    player.start=false;
    // alert("Game Over. Press any key to play again!");
    
    // musicSound.play();
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over! <br> Your final score is: " + player.score + "<br> Press here to restart.";
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            console.log('BOOM! HIT');
            // player.start=false;
            endGame();
        }
        if(item.y >= 600){
            item.y = -300;
            item.style.left = (Math.floor(Math.random()*350))+ "px"; 


            let num = 1 + (Math.floor(Math.random()*3));
            // let car1 = "oth" + num + ".png";
            // item.style.backgroundImage = "url('car1')";
            if(num==1){
                item.style.backgroundImage = "url('oth1.png')";
            }
            if(num==2){
                item.style.backgroundImage = "url('oth2.png')";
            }
            if(num==3){
                item.style.backgroundImage = "url('oth3.png')";
            }
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay(){
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if(player.start){
        musicSound.play();
        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y > (road.top + 80)){player.y -= player.speed}
        if(keys.ArrowDown && player.y< (road.bottom - 100)){player.y += player.speed}
        if(keys.ArrowLeft && player.x>0 ){player.x -= player.speed}
        if(keys.ArrowRight && player.x<(road.width - 60)){player.x += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);
        player.score++;
        let p_score = player.score - 1;

        if(p_score>hiscoreval){
            hiscoreval = p_score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }

        score.innerHTML = "Score: " + p_score;
    }
    
}
function start(){
    // gameArea.classList.remove('hide');
    hi_score.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML="";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(i=0;i<5;i++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y = (i*150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    
    let car = document.createElement('div');
    car.setAttribute('class' , 'car');
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    // console.log("top position" + car.offsetTop);
    // console.log("left position" + car.offsetLeft);
    for(i=0;i<3;i++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y = ((i+1)*350)* -1;
        enemyCar.style.top = enemyCar.y + "px";
        // enemyCar.style.backgroundColor = 'yellow';
        let num = 1 + (Math.floor(Math.random()*3));

        // var el = document.getElementById("enemy").style.background-image;

        // var car1 = "oth" + num + ".png";
        // el.url = car1;
        if(num==1){
            enemyCar.style.backgroundImage = "url('oth1.png')";
        }
        if(num==2){
            enemyCar.style.backgroundImage = "url('oth2.png')";
        }
        if(num==3){
            enemyCar.style.backgroundImage = "url('oth3.png')";
        }
        // if(num==4){
        //     enemyCar.style.backgroundImage = "url('/images/other/oth4.png')";
        // }
        
        // let carName =  '/images/other/oth' +num + '.png';
        // 'document.querySelector('.enemy).setAttribute

        // document.querySelector('.enemy').setProperty("background-image", "url('/images/other/oth1.png')");

        // enemyCar.style.backgroundImage = "url('/images/other/oth3.png')";
        enemyCar.style.left = (Math.floor(Math.random()*350))+ "px"; 
        gameArea.appendChild(enemyCar);
    }

}

// Iteration 1: Declare variables required for this game
const game = document.getElementById("game-body");
const $lives = document.getElementById("lives");
var time = 60;
var seconds = document.getElementById("timer");

const zombies = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-3.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];
// Iteration 1.2: Add shotgun sound
const shotAudio = new Audio("./assets/shotgun.wav");
shotAudio.volume = 0.2;
game.addEventListener('click', () => {
    shotAudio.pause();
    shotAudio.currentTime = 0;
    shotAudio.play();
  }) 

// Iteration 1.3: Add background sound
const bgMusic = new Audio("./assets/bgm.mp3");
bgMusic.play();
bgMusic.loop = true;

// Iteration 1.4: Add lives
var lives = document.getElementsByClassName("heart");

// Iteration 2: Write a function to make a zombie
function makeZombie(){
    randomZombie = zombies[randomNumber(0, zombies.length)];
    var zombie = document.createElement('img');
    zombie.setAttribute('src', `./assets/${randomZombie}`);
    zombie.setAttribute('id', `zombie`);
    zombie.classList.add('zombie-image');
    game.appendChild(zombie);

    let zombieImg = document.getElementById("zombie");
    zombieImg.style.transform = `translateX(${randomNumber(20, 80)}vw)`;
    zombieImg.style.animationDuration = `${randomNumber(2, 6)}s`;
}

// Iteration 3: Write a function to check if the player missed a zombie
setInterval(() => {
  let zombie = document.getElementById("zombie");
  checkCollision(zombie);
},50)


function checkCollision(zombieImg) {
  if (zombieImg.getBoundingClientRect().top <= 0) {
    lives[lives.length-1].remove();
    console.log(lives.length);
    destroy(zombieImg);
  }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
document.addEventListener('click',(e)=>{
  if(e.target.classList.contains('zombie-image')){
    destroy(e.target);
  }
})

function destroy(zombieImg) {
  zombieImg.remove();
  makeZombie();
}

// Iteration 5: Creating timer
var timer = setInterval(function () {
  time--;
  seconds.innerHTML = time;
    if (lives.length === 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }

  if (time == 0) {
    clearInterval(timer);
    location.href = "./win.html";
  }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie();

// Iteration 7: Write the helper function to get random integer
function randomNumber(lowerLimit, upperLimit) {
    lowerLimit = Math.ceil(lowerLimit);
    upperLimit = Math.floor(upperLimit);
    return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  }
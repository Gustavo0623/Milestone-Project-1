"use strict";
exports.__esModule = true;
// variables for bird and tube
var bird = document.getElementById('bird');
var tubeStartX = getVWInPx(1);
var goBird = placeBird(getVWInPx(.37), getVHInPx(.35));
var scoreDisplay = document.getElementById('c-score');
var hScoreDisplay = document.getElementById('h-score');
var score;
score = 0;
var highScore = 0;
var goBirdGo = false;
var birdLeft;
var birdBottom;
var tubeLeft;
var tubeBottom;
var birdHeight;
var birdWidth;
var tubeSpeed = 1;
var speedCounter = 0;
var executed = false;
var tubeHeight;
var birdInt;
var tubeWidth;
//log scores function
function logScore() {
    scoreDisplay.innerHTML = score.toString();
    console.log("The score is now ".concat(score));
}
function logHighScore() {
    highScore = score;
    hScoreDisplay.textContent = highScore.toString();
    console.log("New High Score Is ".concat(highScore));
}
function clickBtn() {
    goBirdGo = true;
    score = 0;
    speedCounter = 0;
    console.log('GO BIRD GO!');
    logScore();
    document.getElementById('winning-msg').style.display = 'none';
    birdGo();
}
document.getElementById('go').addEventListener('click', clickBtn);
// increase score funcion 
function scoreUp() {
    if (executed === true) {
        return;
    }
    else if (tubeLeft >= 1) { //needs to be >= 1 or else it will up score again when tubeLeft >= 0 and changes executed to false
        score++;
        logScore();
        speedCounter++;
        executed = true;
    }
}
function gameOverMsg() {
    function changeTxt(id, content) {
        document.getElementById(id).textContent = content;
    }
    function changeMessage(line1, line2, line3, line4) {
        changeTxt('msg', line1);
        changeTxt('msg-2', line2);
        changeTxt('msg-3', line3);
        changeTxt('msg-4', line4);
    }
    function hScoreMsg() {
        changeMessage('Congratulations!', 'New High Score!', 'You Can Do Better Though!', 'Try Again?');
    }
    document.getElementById('winning-msg').style.display = 'flex';
    console.log('GAME OVER!');
    if (score >= 0) {
        if (score === 0 && highScore === 0) {
            hScoreMsg();
            logHighScore();
        }
        else if (score > highScore) {
            hScoreMsg();
            logHighScore();
        }
        else {
            changeMessage('Game Over!', 'Your Score Is', score.toString(), 'Try Again?');
        }
    }
}
// math random function learned from 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random'
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    Math.floor(Math.random() * (max - min + 1) + min);
    return Math.floor(Math.random() * (max - min + 1) + min);
    //The maximum is inclusive and the minimum is inclusive
}
function getVWInPx(num) {
    return document.documentElement.clientWidth * num;
}
function getVHInPx(num) {
    return document.documentElement.clientHeight * num;
}
// function create bird
function newBird(url) {
    var bird = document.createElement('img');
    bird.src = url;
    bird.style.position = 'absolute';
    if (screen.width <= 785) {
        bird.style.height = "".concat(getVHInPx(0.053), "px");
    }
    else {
        bird.style.height = "".concat(getVHInPx(0.065), "px");
    }
    if (screen.width <= 785) {
        bird.style.width = "".concat(getVWInPx(0.105), "px");
    }
    else {
        bird.style.width = "".concat(getVWInPx(0.045), "px");
    }
    document.getElementById('game-items').append(bird);
    return bird;
}
// place bird function
function placeBird(x, y) {
    var element = newBird('assets/bird1.png');
    function handleDirectionChange(direction) {
        // changes image source of bird element depending on which direction it is going
        if (direction === null) {
            element.src = 'assets/bird1.png';
        }
        if (direction === 'north') {
            element.src = "assets/bird2.png";
        }
        if (direction === 'south') {
            element.src = 'assets/bird1.png';
        }
    }
    move(element).withSpaceBar(x, y, handleDirectionChange);
    return {
        element: element
    };
}
// move functionality for bird
function move(element) {
    element.style.position = 'absolute';
    function flyWithSpaceBar(left, bottom, callback) {
        var direction = 'south'; // default direction to appply gravity to the bird
        var x = left; // x is for initial position (style.left value) and y changes accordingly to the current direction value that is determined by the flybird function 
        var y = bottom;
        function flyBird() {
            // variables for bird and tube positioning set
            // parseFloat() built in js function that converts property value into number (in this case removing the 'px' from the left and bottom property value)
            var birdLeft = parseFloat(goBird.element.style.left);
            var birdBottom = parseFloat(goBird.element.style.bottom);
            var tubeLeft = parseFloat(tubeSet.bottomTube.style.left);
            var tubeBottom = parseFloat(tubeSet.bottomTube.style.bottom);
            var birdWidth = parseFloat(goBird.element.style.width);
            var birdHeight = parseFloat(goBird.element.style.height);
            var tubeHeight = parseFloat(tubeSet.bottomTube.style.height);
            var tubeWidth = parseFloat(tubeSet.bottomTube.style.width);
            // speed increase func. placed here to be part of the interval
            function speedInc() {
                if (screen.width <= 785) {
                    tubeSpeed = tubeSpeed + .08;
                }
                else {
                    tubeSpeed = tubeSpeed + .5;
                }
                speedCounter = 0;
            }
            if (speedCounter === 5) {
                speedInc();
            } //change speed increment with score increments 
            //collision check/events functions
            function collisionCheck() {
                // once bird passes tubes the if statement ends the function so that the other if statements dont run
                if (birdLeft >= tubeLeft + birdWidth) {
                    scoreUp();
                    return;
                }
                if (birdBottom < tubeBottom + tubeHeight) {
                    collisionEvents();
                }
                if (birdBottom > parseFloat(tubeSet.topTube.style.bottom) - birdHeight) {
                    collisionEvents();
                }
            }
            //triggers when bird collides with tubes
            function collisionEvents() {
                tubeSpeed = 1;
                goBirdGo = false;
                tubeSet.stop(); // for double reinforcement
                birdGo();
                gameOverMsg();
            }
            // following if statement must go here to stop function from looping after game over
            if (birdLeft > tubeLeft - birdWidth) {
                if (goBirdGo === false)
                    return;
                collisionCheck();
            }
            if (direction === 'north') {
                // fly limit
                if (y >= getVHInPx(.612)) {
                    direction = null;
                }
                else {
                    if (screen.width <= 785) {
                        y += 2;
                    }
                    else {
                        y += 1.2;
                    }
                }
            }
            if (direction === 'south') {
                // floor collision  stop
                if (y <= getVHInPx(0)) {
                    direction = null;
                }
                else {
                    if (screen.width <= 785) {
                        y -= 0.75;
                    }
                    else {
                        y -= 1.1;
                    }
                }
            }
            //to change left and bottom position of element(in this case, bird)
            element.style.left = x + 'px';
            element.style.bottom = y + 'px';
        }
        birdInt = setInterval(flyBird, 2);
        // spacebar event listener to make bird go north when pressed.
        document.addEventListener('keydown', function (e) {
            if (e.repeat)
                return;
            ;
            if (e.key === ' ') {
                direction = 'north';
            }
            callback(direction);
        });
        document.addEventListener('keyup', function () {
            direction = 'south';
            callback(direction);
        });
        document.addEventListener('click', function () {
            direction = 'north';
            if (direction === 'north') {
                setTimeout(function () {
                    direction = 'south';
                    goBird.element.src = 'assets/bird1.png';
                }, 120);
            }
            callback(direction);
        });
    }
    return {
        withSpaceBar: flyWithSpaceBar
    };
}
// function creating tubes
function newTubes(url) {
    var tube = document.createElement('img');
    tube.src = url;
    tube.style.position = 'absolute';
    tube.style.height = getVHInPx(.8) + 'px';
    if (screen.width <= 785) {
        tube.style.width = getVWInPx(.095) + 'px';
    }
    else {
        tube.style.width = getVWInPx(.06) + 'px';
    }
    document.getElementById('game-items').append(tube);
    return tube;
}
// deleted move function ****
// top tube 
// topTube + bottomTube functions deleted 
// TEST invoking functions to add tubes
// Create Tubeset variable
var tubeSet;
function newTubeSet(x, y) {
    var topTube = newTubes('assets/tube.png');
    var bottomTube = newTubes('assets/tube.png');
    var direction = null;
    topTube.style.left = x + 'px';
    topTube.style.bottom = y + getVHInPx(1.05) + 'px';
    topTube.style.transform = 'rotate(180deg)';
    bottomTube.style.left = x + 'px';
    bottomTube.style.bottom = y + 'px';
    function moveTubesLeft() {
        if (direction === 'left') {
            if (screen.width <= 785) {
                x -= tubeSpeed - 0.5;
            }
            else {
                x -= tubeSpeed;
            }
        }
        topTube.style.left = x + 'px';
        bottomTube.style.left = x + 'px';
        // Following If statements must be here!!!! **************
        // conditions to delete tubes after the tubes reach end of the screen + end game + game continue conditions
        if (parseInt(topTube.style.left) <= 0 || goBirdGo === false) {
            executed = false; // to be able to reactivate the score increment function
            x = getVWInPx(1);
            bottomTube.style.bottom = getVHInPx(getRandomNumber(45, 73) * -0.01) + 'px';
            // following line is NECESSARY to apply new tubeBottom Value for tubeTop to go from!!!!!!
            tubeBottom = parseFloat(bottomTube.style.bottom);
            topTube.style.bottom = getVHInPx(1.05) + tubeBottom.toString() + 'px';
        }
    }
    // speed of tube movement control
    setInterval(moveTubesLeft, 3); // replace number value with variable that increases depending on score
    // applied in later function to initialize the game
    function moveLeft() {
        direction = 'left';
    }
    function stop() {
        direction = null; // stops tubes from moving
    }
    tubeSet = {
        topTube: topTube,
        bottomTube: bottomTube,
        moveLeft: moveLeft,
        stop: stop
    };
    return tubeSet;
}
// adds the first set of tubes on the screen
function moveTubes() {
    tubeSet.moveLeft();
}
moveTubes();
// game Starting function
function birdGo() {
    if (goBirdGo == false) {
        tubeSet.stop();
        tubeSet.topTube.style.display = 'none';
        tubeSet.bottomTube.style.display = 'none';
        goBird.element.style.display = 'none';
        return;
    }
    if (goBirdGo == true) {
        tubeSet.topTube.style.display = 'inline';
        tubeSet.bottomTube.style.display = 'inline';
        goBird.element.style.display = 'inline';
        moveTubes();
    }
}
birdGo(); // to hide objects on page load

// variables for bird and tube
const bird = document.getElementById('bird')
const tubeStartX = 1430;
const goBird = placeBird(670, 315);
let score = 0;
let highScore = 0;
let goBirdGo = false;
let birdLeft;
let birdBottom;
let tubeLeft;
let tubeBottom;
let tubeSpeed = 1;
let speedCounter = 0;
let executed = false;


//log scores function

function logScore(){
    document.getElementById('c-score').textContent = score
    console.log('The score is now ' + score)
}

function logHighScore(){
    highScore = score
    document.getElementById('h-score').textContent = highScore
    console.log('New High Score Is ' + highScore)
}

//activate when GO button clicked
function clickBtn(){
    goBirdGo = true
    score = 0
    speedCounter = 0
    console.log('GO BIRD GO!')
    logScore()
    document.getElementById('winning-msg').style.display = 'none'
    birdGo()
}
document.getElementById('go').addEventListener('click', clickBtn)

// increase score funcion 
function scoreUp() {
    if(executed === true) {
        return
    } else if(tubeLeft >= 1){ //needs to be >= 1 or else it will up score again when tubeLeft >= 0 and changes executed to false
        score++
        logScore()
        speedCounter++
        executed = true
    }
}

function gameOverMsg(){
    function changeTxt(id, content){
        document.getElementById(id).textContent = content
    }
    function changeMessage(line1, line2, line3, line4){
        changeTxt('msg', line1)
        changeTxt('msg-2', line2)
        changeTxt('msg-3', line3)
        changeTxt('msg-4', line4)
    }
    function hScoreMsg(){
        changeMessage('Congratulations!', 'New High Score!', 'You Can Do Better Though!', 'Try Again?')
    }
    document.getElementById('winning-msg').style.display = 'flex'
    console.log('GAME OVER!')
    if(score >= 0){
        if(score === 0 && highScore === 0){
            hScoreMsg()
            logHighScore()
        } else if (score > highScore){
            hScoreMsg()
            logHighScore()
        } else {
            changeMessage('Game Over!', 'Your Score Is', score, 'Try Again?')
        }
    }

    
    // add function to append message to game message div container in html body that loads after game ends.

}


// math random function learned from 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random'
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    Math.floor(Math.random() * (max - min + 1) + min);
    return Math.floor(Math.random() * (max - min + 1) + min);
    //The maximum is inclusive and the minimum is inclusive
}
  
// function create bird
function newBird(url) {
    let bird = document.createElement('img')
    bird.src = url
    bird.style.position = 'absolute'
    bird.style.height = '50px'
    bird.style.width = '68px'

    document.getElementById('game-items').append(bird)
    return bird
}

// place bird function


function placeBird(x, y) {
    const element = newBird('assets/bird1.png')

    function handleDirectionChange(direction) {
        // changes image source of bird element depending on which direction it is going
        if (direction === null) {
            element.src = 'assets/bird1.png'
        }
        if (direction === 'north') {
            element.src = `assets/bird2.png`
        }
        if (direction === 'south') {
            element.src = 'assets/bird1.png'
            
        }
    }

    move(element).withSpaceBar(x, y, handleDirectionChange)

    return {
        element: element
    }
}

// move functionality for bird

function move(element) {
    
    element.style.position = 'fixed'

    // following functions moves bird to starting location

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }

    function flyWithSpaceBar(left, bottom, callback){

        let direction = null; // default direction to appply gravity to the bird
        let x = left; // x is for initial position (style.left value) and y changes accordingly to the current direction value that is determined by the flybird function 
        let y = bottom;

        element.style.left = x + 'px'
        element.style.bottom = y + 'px'
        
        function flyBird(){ 
            // variables for bird and tube positioning set
            // ParseInt() built in js function that converts property value into number (in this case removing the 'px' from the left and bottom property value)
            birdLeft = parseInt(goBird.element.style.left)
            birdBottom = parseInt(goBird.element.style.bottom)
            tubeLeft = parseInt(tubeSet.bottomTube.style.left)
            tubeBottom = parseInt(tubeSet.bottomTube.style.bottom)

            // speed increase func. placed here to be part of the interval

            function speedInc(){
                tubeSpeed = tubeSpeed + .5
                speedCounter = 0
            } 
            if (speedCounter === 5){
                speedInc()
            } //change speed increment with score increments 

            //collision check/events functions
            function collisionCheck (){
                // once bird passes tubes the if statement ends the function so that the other if statements dont run
                if(birdLeft >= tubeLeft + 62){
                    scoreUp()
                    return;
                }
                if(birdBottom <= tubeBottom + 367){
                    collisionEvents()
                }
                if(birdBottom >= tubeBottom + 460){
                    collisionEvents()
                }
            } 

            //triggers when bird collides with tubes

            function collisionEvents(){ 
                tubeSpeed = 1
                goBirdGo = false
                tubeSet.stop() // for double reinforcement
                birdGo()
                gameOverMsg()
            }
            
            // following if statement must go here to stop function from looping after game over
            if (birdLeft >= tubeLeft - 55 ){
                if(goBirdGo === false) return
                collisionCheck()
            }

            if(direction === 'north'){
                // fly limit
                if (y >= 510){
                    direction = null
                } else {
                    y+=1.2
                }
            }
            if(direction === 'south'){
                // floor collision  stop
                if (y <= 85){
                    direction = null
                } else {
                    y-=1.1
                }
            }

            //to change left and bottom position of element(in this case, bird)

            element.style.left = x + 'px'
            element.style.bottom = y + 'px'

        }
        
        birdInt = setInterval(flyBird, 2)
        
        // spacebar event listener to make bird go north when pressed.

        document.addEventListener('keydown', function(e){
            if(e.repeat) return;;
        
            if(e.key === ' '){
                direction = 'north'
            }

            callback(direction)
        })
        
        document.addEventListener('keyup', function(e){
            direction = 'south'
            callback(direction)
        })
    }

    return {
        to: moveToCoordinates,
        withSpaceBar: flyWithSpaceBar
    }
}
// function creating tubes

function newTubes(url) {
    let tube = document.createElement('img')
    tube.src = url
    tube.style.position = 'absolute'
    tube.style.height = '284px'
    tube.style.width = '72px'
    
    document.getElementById('game-items').append(tube)
    return tube
}
// deleted move function ****
// top tube 

// topTube + bottomTube functions deleted 

// TEST invoking functions to add tubes

// Create Tubeset variable

let tubeSet = newTubeSet(tubeStartX, getRandomNumber(-220, -20))

// tube movement function

function newTubeSet(x,y) {
    let topTube = newTubes('assets/tube.png')
    let bottomTube = newTubes('assets/tube.png')

    let direction = null;

    topTube.style.left = x + 'px'
    topTube.style.bottom = y + 420 + 'px'
    topTube.style.transform = 'rotate(180deg)'
    bottomTube.style.left = x + 'px'
    bottomTube.style.bottom = y + 'px'
    
    function moveTubesLeft() {

        if (direction === 'left') {
            x -= tubeSpeed
        }
        topTube.style.left = x + 'px'
        bottomTube.style.left = x + 'px'

        // Following If statements must be here!!!! **************
        // conditions to delete tubes after the tubes reach end of the screen + end game + game continue conditions
        if (topTube.style.left <= 0 + 'px' || goBirdGo === false){
            executed = false // to be able to reactivate the score increment function
            x = 1430
            bottomTube.style.bottom = getRandomNumber(-220, -20) + 'px';
            // following line is NECESSARY to apply new tubeBottom Value for tubeTop to go from!!!!!!
            tubeBottom = parseInt(bottomTube.style.bottom)
            topTube.style.bottom = tubeBottom + 420 + 'px'
        }
    }
    //speed of tube movement control
    setInterval(moveTubesLeft, 3) //replace number value with variable that increases depending on score
    
    //applied in later function to initialize the game
    function moveLeft() {
        direction = 'left'
    }

    function stop() {
        direction = null // stops tubes from moving
    }

    return {
        topTube: topTube,
        bottomTube: bottomTube,
        moveLeft: moveLeft,
        stop: stop
    }
}
// adds the first set of tubes on the screen
function moveTubes() { 
   tubeSet.moveLeft()
}
moveTubes()

// game Starting function
function birdGo(){
    if (goBirdGo == false){
        tubeSet.stop()
        tubeSet.topTube.style.display = 'none'
        tubeSet.bottomTube.style.display = 'none'
        goBird.element.style.display = 'none'
        return
    }
    if (goBirdGo == true){
        tubeSet.topTube.style.display = 'inline'
        tubeSet.bottomTube.style.display = 'inline'
        goBird.element.style.display = 'inline'
        moveTubes()
    }
}
birdGo() // to hide objects on page load
// variables for bird and tube
const bird = document.getElementById('bird')
const goBird = placeBird(500, 200)
const tubeStartX = 1430
const tubeStartY = getRandomNumber(-220, -20)
console.log(tubeStartY)

// math random function learned from 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random'
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min); 
    //The maximum is inclusive and the minimum is inclusive
}
  
// function add bird
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

// move functionality

function move(element) {
    element.style.position = 'fixed'

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }

    function flyWithSpaceBar(left, bottom, callback){
        let direction = 'south';
        let x = left;
        let y = bottom;

        element.style.left = x + 'px'
        element.style.bottom = y + 'px'
        
        function flyBird(){ 
            if(direction === 'north'){
                if (y >= 510){
                    direction = null
                } else {
                    y+=1
                }
            }
            if(direction === 'south'){
                if (y <= 85){
                    direction = null
                } else {
                    y-=1
                }
            }

            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
        }
        
        setInterval(flyBird, 1)
        
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
        
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
// function adding tubes

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

// Create Tubeset

const tubeSet = newTubeSet(tubeStartX, tubeStartY)

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
        function removeTubes(){
            topTube.remove();
            bottomTube.remove();
        }

        if (direction === 'left') {
            x -= 1
        }
        topTube.style.left = x + 'px'
        bottomTube.style.left = x + 'px'

        // If statements must be here!!!! **************
        // conditions to delete tubes after the tubes reach end of the screen + end game + game continue conditions
        if (topTube.style.left <= 0 + 'px'){
            removeTubes()
        }
        if (topTube.style.left <= 668 + 'px' && topTube.style.left >= 600 + 'px' && bird.style.bottom <= y + 284 + 'px') {
            direction = 'left'
        }
    }

    setInterval(moveTubesLeft, 1)

    function moveLeft() {
        direction = 'left'
    }

    function stop() {
        direction = null
    }


    return {
        topTube: topTube,
        bottomTube: bottomTube,
        moveLeft: moveLeft,
        stop: stop
    }
}

function moveTubes() {
    tubeSet.moveLeft()
}
moveTubes()


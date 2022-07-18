// variables for bird and tube
const bird = document.getElementById('bird')
const tubeStartX = 1430
const tubeStartY = getRandomNumber(-220, -20)

// math random function learned from 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random'
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min); 
    //The maximum is inclusive and the minimum is inclusive
  }
  
// function adding tubes

function newTubes(url) {
    let tube = document.createElement('img')
    tube.src = url
    tube.style.position = 'absolute'
    tube.style.height = '60%'
    tube.style.width = '5%'
    tube.style.transf = '180deg'
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
        // to delete tubes after the tubes reach end of the screen
        if (topTube.style.left <= 0 + 'px'){
            removeTubes()
        }
        
        if (topTube.style.left <= bird.style.right) {
            if (topTube.style.bottom <= bird.style.top){
                stop()
            } else {
                direction = 'left'
            }
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


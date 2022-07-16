// variables for bird and tube
const bird = document.getElementById('bird')
const tubeURL = 'assets/tube.png'
let tubeTop = false
// function adding tubes

function newTubes() {
    let tube = document.createElement('img')
    tube.src = tubeURL
    if(tubeTop == true) {
        tube.style.transform = 'rotate(180deg)'
    } else {
        tube.style.transform = 'rotate(0deg)'
    }
    tube.style.position = 'absolute'
    tube.style.height = '50%'
    tube.style.width = '5%'
    tube.style.transf = '180deg'
    document.getElementById('game-items').append(tube)
    return tube
}

function move(element) {

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }

    return {
        to: moveToCoordinates
    }
}

// top tube 

// REPLACE COORDINATES WITH VARIABLES THAT BECOME RANDOM VALUE 

function topTube () {
    tubeTop = true
    move(newTubes()).to(1360, 300)
}

// bottom tube placement



function bottomTube () {
    tubeTop = false
    move(newTubes()).to(1360, 0)
}
// TEST invoking functions to add tubes

topTube()

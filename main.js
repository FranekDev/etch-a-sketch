const gameField = document.querySelector('.game__field');
const randomColor = document.querySelector('.randomColor');
const clearBoard = document.querySelector('.clear__board');
const colorPicker = document.querySelector('#colorPicker');
const eraseBtn = document.querySelector('.erase');
const borderToggle = document.querySelector('.toggleBorder');
const gridSize = document.querySelector('.grid__size');

const defaultSize = 16;

let setMode = 'default';

// To Do
// -fix border appear when clicked
// -fix random color to start when clicked not when mouseout
// -add chagne board background color

function disableBorder() {
    // borderToggle.addEventListener('click', () => {
        const grid = document.querySelector('.gameGrid');
        grid.style.border = '2px solid red';
    // });
}


gridSize.addEventListener('click', setGridSize);

function setGridSize(size) {
    
    size = parseInt(prompt('Enter grid size: (2-64)'));
    
    if (size >= 2 && size <= 64) {
        console.log(size);
        clearGrid();
        createGrid(size);
    }
    else {
        alert('Too large');
    }
}

function clearGrid() {
    gameField.innerHTML = '';
}

function createGrid(size) {
    
    gameField.style.display = 'grid';
    gameField.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameField.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for( let i = 0; i < size * size; i++){
        
        const gameGrid = document.createElement('div');

        gameGrid.classList.add('gameGrid');
    
        gameGrid.addEventListener('mouseover', changeColor);
        gameGrid.addEventListener('click', changeColor);
        gameField.appendChild(gameGrid);
        // console.log("size " + size + " " + counter++);
      
        // Clear board
        clearBoard.addEventListener('click', () => {
            gameGrid.style.background = 'none';
        });

        borderToggle.addEventListener('click', () => {
            // gameGrid.style.border = 'none';
            setMode = 'noBorder';
            if (setMode === 'noBorder'){
                gameGrid.style.border = 'none';
            }
            else if (setMode !== 'noBorder'){
                gameGrid.style.border = '1px solid black';
            }
        });

    }
  
}

let mouseDown = false
document.body.onmousedown = () => {
    mouseDown = true;
};
document.body.onmouseup = () => {
    mouseDown = false;
};

// document.body.addEventListener('click', () => {
//     setMode = 'default';
//     console.log("clicked body " + setMode);
// });

// Choose drawing mode
colorPicker.addEventListener('click', () => {
    setMode = 'staticColor';
    console.log(setMode);
});

randomColor.addEventListener('click', () => {
    setMode = 'randomRGB'; 
});

eraseBtn.addEventListener('click', () => {
    setMode = 'erase';
    console.log("erase click");
});

function changeColor(e) {
    
    console.log(setMode);
    if (e.type === 'mouseover' && !mouseDown) {
        return;
    }
    if (mouseDown === true && setMode === 'randomRGB') {
        e.target.style.backgroundColor = setRandomColor();
    }
    else if (setMode === 'erase') {
        e.target.style.backgroundColor = '#FAF0CA';
    }
    else if (setMode === 'staticColor') {
        e.target.style.backgroundColor = colorPicker.value;
    }
}


function setRandomColor() {
    
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    const background = `rgb(${randomR}, ${randomG}, ${randomB})`;
    // console.log(background);
    return background;
}

window.onload = () => createGrid(defaultSize);
// createGrid(size = 16);
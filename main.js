const gameField = document.querySelector('.game__field');
const randomColor = document.querySelector('.randomColor');
const clearBoard = document.querySelector('.clear__board');
const colorPicker = document.querySelector('#colorPicker');
const eraseBtn = document.querySelector('.erase');
const borderToggle = document.querySelector('.toggleBorder');
const gridSize = document.querySelector('.grid__size');

const defaultSize = 16;

let setMode = 'default';

function setGridSize(size) {
    
    size = parseInt(prompt('Enter grid size: (2-64)'));
    
    if (size >= 2 && size <= 64) {
        clearGrid();
        createGrid(size);
    }
    else if (size > 64) {
        alert('Too large');
    }
    else if (size < 2) {
        alert('Too small');
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
      
        // Clear board
        clearBoard.addEventListener('click', () => {
            gameGrid.style.background = 'none';
        });

        // Remove border
        borderToggle.addEventListener('click', () => {
            gameGrid.style.border = 'none';
        });

    }
  
}

gridSize.addEventListener('click', setGridSize);

let mouseDown = false
document.body.onmousedown = () => {
    mouseDown = true;
};
document.body.onmouseup = () => {
    mouseDown = false;
};


// Choose drawing mode
colorPicker.addEventListener('click', () => {
    setMode = 'staticColor';
});

randomColor.addEventListener('click', () => {
    setMode = 'randomRGB'; 
});

eraseBtn.addEventListener('click', () => {
    setMode = 'erase';
});

function changeColor(e) {
    
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

    return background;

}

window.onload = () => createGrid(defaultSize);
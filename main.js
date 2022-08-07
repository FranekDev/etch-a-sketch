const gameField = document.querySelector('.gameField');
const randomColor = document.querySelector('.randomColor');
const clearBoard = document.querySelector('.clearBoard');
const colorPicker = document.querySelector('#colorPicker');
const eraseBtn = document.querySelector('.erase');
const gridSize = document.querySelector('.gridSize');
const borderOn = document.querySelector('.borderOn');
const borderOff = document.querySelector('.borderOff');

const defaultSize = 16;

let setMode = 'default';

gridSize.addEventListener('click', setGridSize);

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
        borderOff.addEventListener('click', () => {
            gameGrid.style.border = 'none';
        });

        // Add border
        borderOn.addEventListener('click', () => {
            gameGrid.style.border = '1px solid #c9c2a7';
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

// Show and hide button to toggle border
borderOn.addEventListener('click' , () => {
    borderOn.style.display = 'none';
    borderOff.style.display = 'flex';
});

borderOff.addEventListener('click', (size) => {
    borderOn.style.display = 'flex';
    borderOff.style.display = 'none';
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
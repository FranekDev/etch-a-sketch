const gameField = document.querySelector('.game__field');
const randomColor = document.querySelector('.randomColor');
const clearBoard = document.querySelector('.clear__board');
const colorPicker = document.querySelector('#colorPicker').value;

// grid size button
const gridSize = document.querySelector('.grid__size');
let size;

gridSize.addEventListener('click', () => {

    size = parseInt(prompt('Enter grid size:'));
    
    console.log(size);

    clearGrid();
    createGrid();

});

function clearGrid() {
    gameField.innerHTML = '';
}

function createGrid() {
    
    gameField.style.display = 'grid';
    let counter = 0;

    for( let i = 0; i < size * size; i++){
        
        const gameGrid = document.createElement('div');

        gameGrid.classList.add('gameGrid');
        gameField.appendChild(gameGrid);

        gameField.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        gameField.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        console.log("size " + size + " " + counter++);

        gameField.style.gridGap = '0';
        gameGrid.style.width = '100%';
        gameGrid.style.height = '100%';

        // Change background of grid on
        gameGrid.addEventListener('mouseover', () => {
            // gameGrid.style.background = `${colorPicker}`;
            gameGrid.style.background = setRandomColor();
        });

        // Erase background
        gameGrid.addEventListener('click', () => {
            gameGrid.style.background = 'none';
        });

        // Clear board
        clearBoard.addEventListener('click', () => {
            gameGrid.style.background = 'none';
        });

    }
  
}

function setRandomColor() {
    
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    const background = `rgb(${randomR}, ${randomG}, ${randomB})`;

    console.log(background);
    return background;
}

createGrid(size = 16);
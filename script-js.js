document.addEventListener('DOMContentLoaded', () => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    
    const winningConditions = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal from top-left
        [2, 4, 6]  // diagonal from top-right
    ];
    
    const messages = {
        playerTurn: () => `Player ${currentPlayer}'s turn`,
        gameWon: () => `Player ${currentPlayer} has won!`,
        gameDraw: () => `Game ended in a draw!`
    };
    
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }
    
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }
    
    function handleResultValidation() {
        let roundWon = false;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (
                gameState[a] === '' ||
                gameState[b] === '' ||
                gameState[c] === ''
            ) {
                continue;
            }
            
            if (
                gameState[a] === gameState[b] &&
                gameState[b] === gameState[c]
            ) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            statusDisplay.textContent = messages.gameWon();
            gameActive = false;
            return;
        }
        
        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.textContent = messages.gameDraw();
            gameActive = false;
            return;
        }
        
        handlePlayerChange();
    }
    
    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = messages.playerTurn();
    }
    
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = messages.playerTurn();
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x');
            cell.classList.remove('o');
        });
    }
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
});

document.addEventListener('DOMContentLoaded', function() {
    const gridElement = document.getElementById('grid');
    const btn = document.getElementById('btn');
    const resetBtn = document.getElementById('resetBtn'); // Seleziona il bottone di reset

    // Aggiungi un evento di ascolto al pulsante "GIOCA"
    btn.addEventListener('click', function() {
        generateGrid(gridElement);
    });

    // Aggiungi un evento di ascolto al pulsante "RESET"
    resetBtn.addEventListener('click', function() {
        resetGame(gridElement);
    });
});

function generateGrid(gridElement) {
    // Genera 16 posizioni casuali per le bombe
    const bombPositions = generateBombPositions();

    // Ripeti per 100 volte (dimensione della griglia)
    for (let i = 0; i < 100; i++) {
        // Creazione di un nuovo quadrato
        const newSquare = generateNewGridSquare(i + 1);

        // Aggiungi un gestore di eventi per il clic
        newSquare.addEventListener('click', function() {
            if (bombPositions.includes(i)) {
                newSquare.classList.add('clicked-bomba');
                endGame();
            } else {
                if (isEven(i + 1)) {
                    newSquare.classList.add('clicked');
                } else {
                    newSquare.classList.add('clicked-odd');
                }
            }
        });

        // Aggiungi il quadrato alla griglia
        gridElement.appendChild(newSquare);
    }
}

// Funzione per generare 16 posizioni casuali per le bombe
function generateBombPositions() {
    const positions = [];
    while (positions.length < 16) {
        const position = Math.floor(Math.random() * 100);
        if (!positions.includes(position)) {
            positions.push(position);
        }
    }
    return positions;
}

// Funzione per terminare il gioco
function endGame() {
    alert('Hai cliccato su una bomba! Game Over!');
}

// Funzione per verificare se un numero è pari
function isEven(number) {
    return number % 2 === 0;
}

// Funzione per generare un nuovo quadrato
function generateNewGridSquare(content) {
    const newElement = document.createElement('article');
    newElement.innerHTML = '<span>' + content + '</span>';
    newElement.classList.add('square');
    return newElement;
}

// Funzione per reimpostare il gioco
function resetGame(gridElement) {
    // Rimuovi tutti gli elementi figlio dalla griglia
    while (gridElement.firstChild) {
        gridElement.removeChild(gridElement.firstChild);
    }
}

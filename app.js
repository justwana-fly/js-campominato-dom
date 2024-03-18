// Quando il documento è completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    // Ottieni l'elemento della griglia, il pulsante "GIOCA" e il pulsante "RESET"
    const gridElement = document.getElementById('grid');
    const btn = document.getElementById('btn');
    const resetBtn = document.getElementById('resetBtn');

    // Aggiungi un gestore di eventi al pulsante "GIOCA"
    btn.addEventListener('click', function() {
        generateGrid(gridElement); // Genera la griglia
    });

    // Aggiungi un gestore di eventi al pulsante "RESET"
    resetBtn.addEventListener('click', function() {
        resetGame(gridElement); // Resetta il gioco
    });
});

// Funzione per generare la griglia
function generateGrid(gridElement) {
    // Ottieni le posizioni delle bombe
    const bombPositions = generateBombPositions();
    // Calcola il numero di caselle rimaste
    let remainingCells = 100 - bombPositions.length;

    // Ripeti per ogni cella della griglia
    for (let i = 0; i < 100; i++) {
        // Crea un nuovo quadrato
        const newSquare = generateNewGridSquare(i + 1);

        // Aggiungi un gestore di eventi per il clic
        newSquare.addEventListener('click', function() {
            // Se la cella corrente contiene una bomba
            if (bombPositions.includes(i)) {
                // Aggiungi la classe per indicare una bomba cliccata
                newSquare.classList.add('clicked-bomba');
                // Mostra il numero della cella (bomba) cliccata
                newSquare.innerHTML = '<span>' + (i + 1) + '</span>';
                // Termina il gioco con sconfitta
                endGame(false);
            } else {
                // Decrementa il numero di caselle rimaste
                remainingCells--;
                // Aggiungi una classe in base alla parità del numero della cella
                if (isEven(i + 1)) {
                    newSquare.classList.add('clicked');
                } else {
                    newSquare.classList.add('clicked-odd');
                }
                // Se tutte le caselle senza bombe sono state cliccate
                if (remainingCells === 0) {
                    // Termina il gioco con vittoria
                    endGame(true);
                }
            }
        });

        // Aggiungi il quadrato alla griglia
        gridElement.appendChild(newSquare);
    }
}

// Funzione per generare le posizioni delle bombe
function generateBombPositions() {
    const positions = [];
    // Ripeti fino a raggiungere il numero desiderato di bombe
    while (positions.length < 16) {
        // Genera una posizione casuale
        const position = Math.floor(Math.random() * 100);
        // Se la posizione non è già presente, aggiungila
        if (!positions.includes(position)) {
            positions.push(position);
        }
    }
    return positions;
}

// Funzione per gestire la fine del gioco
function endGame(isWin) {
    // Se il giocatore ha vinto
    if (isWin) {
        alert('Hai vinto!');
    } else {
        // Se il giocatore ha perso, chiedi se vuole rigiocare
        if (confirm('Hai cliccato su una bomba! Game Over!\nVuoi rigiocare?')) {
            // Se conferma, resetta il gioco
            resetGame(document.getElementById('grid'));
        }
    }
}

// Funzione per determinare se un numero è pari
function isEven(number) {
    return number % 2 === 0;
}

// Funzione per generare un nuovo quadrato della griglia
function generateNewGridSquare(content) {
    const newElement = document.createElement('article');
    // Imposta il contenuto del quadrato
    newElement.innerHTML = '<span>' + content + '</span>';
    // Aggiungi la classe per lo stile del quadrato
    newElement.classList.add('square');
    return newElement;
}

// Funzione per resettare il gioco
function resetGame(gridElement) {
    // Rimuovi tutti gli elementi figlio della griglia
    while (gridElement.firstChild) {
        gridElement.removeChild(gridElement.firstChild);
    }
    // Rigenera la griglia
    generateGrid(gridElement);
}

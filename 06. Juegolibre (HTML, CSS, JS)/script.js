// Variables globales
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');
const wordDisplay = document.getElementById('wordDisplay');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

function resizeCanvas() {
    const canvasContainer = document.querySelector('.canvas-container');
    const size = Math.min(canvasContainer.offsetWidth, 400);

    canvas.width = size;
    canvas.height = size;

    // Redibujar el contenido si el juego está en progreso
    if (selectedWord) {
        drawHangmanBase();
        // Ajustar las coordenadas según el nuevo tamaño
        drawHangman();
    }
}

// Lista de palabras para el juego
const words = ['PROGRAMACION', 'JAVASCRIPT', 'HTML', 'CSS', 'COMPUTADORA', 'DESARROLLO', 'FUNCION', 'VARIABLE'];

// Variables del juego
let selectedWord = '';
let guessedLetters = [];
let wrongAttempts = 0;
const maxWrongAttempts = 6; // Número máximo de intentos antes de perder

// Inicializar el juego
function initGame() {

    document.body.style.backgroundColor = '#f0f0f0';

    // Seleccionar una palabra aleatoria
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongAttempts = 0;
    message.textContent = '';

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la base del ahorcado
    drawHangmanBase();

    // Mostrar espacios para las letras
    displayWord();

    // Crear teclado
    createKeyboard();
}

// Dibujar la base del ahorcado
function drawHangmanBase() {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    // Base
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(150, 350);
    ctx.stroke();

    // Poste vertical
    ctx.beginPath();
    ctx.moveTo(100, 350);
    ctx.lineTo(100, 50);
    ctx.stroke();

    // Travesaño superior
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(250, 50);
    ctx.stroke();

    // Cuerda
    ctx.beginPath();
    ctx.moveTo(250, 50);
    ctx.lineTo(250, 80);
    ctx.stroke();
}

// Dibujar partes del ahorcado según los errores
function drawHangman() {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    switch (wrongAttempts) {
        case 1: // Cabeza
            ctx.beginPath();
            ctx.arc(250, 110, 30, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 2: // Cuerpo
            ctx.beginPath();
            ctx.moveTo(250, 140);
            ctx.lineTo(250, 240);
            ctx.stroke();
            break;
        case 3: // Brazo izquierdo
            ctx.beginPath();
            ctx.moveTo(250, 160);
            ctx.lineTo(210, 200);
            ctx.stroke();
            break;
        case 4: // Brazo derecho
            ctx.beginPath();
            ctx.moveTo(250, 160);
            ctx.lineTo(290, 200);
            ctx.stroke();
            break;
        case 5: // Pierna izquierda
            ctx.beginPath();
            ctx.moveTo(250, 240);
            ctx.lineTo(210, 300);
            ctx.stroke();
            break;
        case 6: // Pierna derecha
            ctx.beginPath();
            ctx.moveTo(250, 240);
            ctx.lineTo(290, 300);
            ctx.stroke();

            // Dibujar cara de derrota
            ctx.beginPath();
            ctx.moveTo(235, 100); // Ojo izquierdo
            ctx.lineTo(245, 110);
            ctx.moveTo(245, 100); // Ojo derecho
            ctx.lineTo(255, 110);
            ctx.moveTo(235, 130); // Boca triste
            ctx.quadraticCurveTo(250, 110, 265, 130);
            ctx.stroke();
            break;
    }
}

// Mostrar la palabra oculta con guiones
function displayWord() {
    const display = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');

    wordDisplay.textContent = display;

    // Verificar si ganó
    if (!display.includes('_')) {
        canvas.style.backgroundColor = '#d4edda';
        message.textContent = '¡Felicidades! ¡Ganaste!';
        message.style.color = '#5cb85c';
        disableKeyboard();
    }
}

// Crear teclado virtual
function createKeyboard() {
    keyboard.innerHTML = '';

    // Crear botones para cada letra del abecedario
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    }
}

// Manejar el intento de adivinar una letra
function handleGuess(letter) {
    // Si la letra ya fue adivinada, no hacer nada
    if (guessedLetters.includes(letter)) return;

    // Agregar la letra a las letras adivinadas
    guessedLetters.push(letter);

    // Deshabilitar el botón de la letra
    const buttons = keyboard.getElementsByTagName('button');
    for (let btn of buttons) {
        if (btn.textContent === letter) {
            btn.disabled = true;
            break;
        }
    }

    // Verificar si la letra está en la palabra
    if (selectedWord.includes(letter)) {
        // Actualizar la visualización de la palabra
        displayWord();
    } else {
        // Incrementar intentos fallidos y dibujar parte del ahorcado
        wrongAttempts++;
        drawHangman();

        // Verificar si perdió
        if (wrongAttempts === maxWrongAttempts) {
            canvas.style.backgroundColor = '#f8d7da';
            message.textContent = `¡Perdiste! La palabra era: ${selectedWord}`;
            message.style.color = '#d9534f';
            disableKeyboard();
        } else {
            message.textContent = `Incorrecto! Te quedan ${maxWrongAttempts - wrongAttempts} intentos.`;
        }
    }
}

// Deshabilitar el teclado
function disableKeyboard() {
    const buttons = keyboard.getElementsByTagName('button');
    for (let btn of buttons) {
        btn.disabled = true;
    }
}

// Evento para reiniciar el juego
resetButton.addEventListener('click', initGame);

// Iniciar el juego al cargar la página
window.addEventListener('load', () => {
    initGame();
    resizeCanvas();
});

window.addEventListener('resize', debounce(() => {
    resizeCanvas();
}, 200)); // Usamos debounce para optimizar

// Función debounce para mejorar rendimiento
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}
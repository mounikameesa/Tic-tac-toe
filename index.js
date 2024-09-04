const player1 = "X";
const player2 = "O";
let tick = "";
const rows = 3;
const columns = 3;
let choices = rows * columns;
let gameBoard = [];
const boxContainer = document.getElementById("boxContainer");
const winningCombination = []

document.addEventListener("DOMContentLoaded", () => {
    tick = player1;

    // Create a box container
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("div"); // Create a row container
        row.classList.add("box-row");

        for (let j = 0; j < columns; j++) {
            const box = document.createElement("div"); // Create a box
            box.classList.add("box");
            row.appendChild(box);
        }
        boxContainer.appendChild(row); // Append row to the container
    }

    // Box container click handle
    const boxRow = document.querySelectorAll(".box");
    boxRow.forEach((box) => {
        box.addEventListener("click", () => {
            if (choices) {
                if (!box.textContent) {
                    box.textContent = tick;
                    if (tick == player1) tick = player2;
                    else tick = player1;
                    choices = choices - 1;

                    // If choices complete show failed message
                    if (!choices)
                        document.getElementById("messageContent").textContent == ""
                            ? (document.getElementById("messageContent").textContent =
                                "Failed")
                            : document.getElementById("messageContent").textContent;
                    document.getElementById("messageContent").style.color = "red";

                }

                boxRow.forEach((box1, index) => {
                    gameBoard[index] = box1.textContent;
                });
                checkWinner(); // Check winner
            }
        });
    });
});

// Check winner
function checkWinner() {
    for (const [a, b, c] of winnerCombinations) {
        if (
            gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            document.getElementById("messageContent").textContent = "Success";
            document.getElementById("messageContent").style.color = "green";
            choices = 0;
        }
    }
}

// Function to generate winning combinations
function winningCombinations(rows, columns) {

    // Horizontal wins
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push(i * columns + j);
        }
        winningCombination.push(row);
    }

    // Vertical wins
    for (let i = 0; i < columns; i++) {
        let column = [];
        for (let j = 0; j < rows; j++) {
            column.push(j * columns + i);
        }
        winningCombination.push(column);
    }

    // Diagonal wins
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < rows; i++) {
        diagonal1.push(i * columns + i);
        diagonal2.push((i + 1) * columns - i - 1);
    }
    winningCombination.push(diagonal1);
    winningCombination.push(diagonal2);

    return winningCombination;
}
const winnerCombinations = winningCombinations(rows, columns)

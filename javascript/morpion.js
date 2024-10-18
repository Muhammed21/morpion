let Imgsize = "150px";

let morpion = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let currentPlayer = 1;

let myBool = true;

let score = 0;

let winPlayer;

let winPlayerNum;

let playerTurn;

let tours = 1;

let gameEnded = false; // Variable pour vérifier si le jeu est terminé

const playerCount = document.querySelector("#tours");

const frameCooldown = document.querySelector(".frame-cooldown");

const ptsMatchNull = document.getElementById("pts");

const frameNull = document.querySelector(".frame-null");

let imgPlayer1 = localStorage.getItem("capturedImage");

let imgPlayer2 = localStorage.getItem("capturedImage2");

const name1 = localStorage.getItem("Name1");

const name2 = localStorage.getItem("Name2");

function playSongPlayer1() {
  let songPlayer1 = document.getElementById("song1");
  songPlayer1.play();
}

function playSongPlayer2() {
  let songPlayer2 = document.getElementById("song2");
  songPlayer2.play();
}

function makeMove(row, coll) {
  if (morpion[row][coll] === 0) {
    morpion[row][coll] = currentPlayer;

    displayMorpion();

    if (checkWin(currentPlayer)) {
      gameEnded = true; // Marque le jeu comme terminé
      setTimeout(() => {
        resetGame();
        document.location.href = "../pages/win.html";
      }, 3000);
      localStorage.setItem("Winner", winPlayerNum);
      localStorage.setItem("WinnerName", winPlayer);
      score += 200;
      localStorage.setItem("Score", score);
      console.log(winPlayer, score);
      return;
    }

    if (checkMatchNull()) {
      setTimeout(() => {
        resetGame(); // Réinitialise le jeu après un match nul
      }, 3000);
      score += 100;
      console.log(winPlayer, score);
      return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1; // Change le joueur
  }
}

function checkWin(player) {
  for (let row = 0; row < 3; row++) {
    if (
      morpion[row][0] === player &&
      morpion[row][1] === player &&
      morpion[row][2] === player
    ) {
      // alert("horizontale");
      gameEnded = true;
      setTimeout(() => {
        frameCooldown.style.display = "block";
      }, "500");
      return true;
    }
  }
  for (let coll = 0; coll < 3; coll++) {
    if (
      morpion[0][coll] === player &&
      morpion[1][coll] === player &&
      morpion[2][coll] === player
    ) {
      // alert("verticale");
      gameEnded = true;
      setTimeout(() => {
        frameCooldown.style.display = "block";
      }, "500");
      return true;
    }
  }
  if (
    morpion[0][0] === player &&
    morpion[1][1] === player &&
    morpion[2][2] == player
  ) {
    // alert("diagonale gauche");
    gameEnded = true;
    setTimeout(() => {
      frameCooldown.style.display = "block";
    }, "500");
    return true;
  }
  if (
    morpion[0][2] === player &&
    morpion[1][1] === player &&
    morpion[2][0] === player
  ) {
    // alert("diagonale droite");
    gameEnded = true;
    setTimeout(() => {
      frameCooldown.style.display = "block";
    }, "500");
    return true;
  }
  frameCooldown.style.display = "none";
  return false;
}

function checkMatchNull() {
  for (let row = 0; row < 3; row++) {
    for (let coll = 0; coll < 3; coll++) {
      if (morpion[row][coll] === 0) {
        return false;
      }
    }
  }
  gameEnded = false;
  frameNull.style.display = "block";
  ptsMatchNull.innerHTML = score + 100;
  return true;
}

function displayMorpion() {
  const morpionContainer = document.querySelector("#morpion");
  morpionContainer.innerHTML = "";
  for (let row = 0; row < 3; row++) {
    for (let coll = 0; coll < 3; coll++) {
      const cellule = document.createElement("div");
      cellule.classList.add("cellule");
      const playerWin = document.querySelector("#players");
      playerWin.innerHTML = winPlayer;

      if (morpion[row][coll] === 1) {
        const img = document.createElement("img");
        img.src = imgPlayer1;
        img.alt = `Player 1 ${name1}`;
        img.style.width = Imgsize;
        img.style.height = Imgsize;
        img.style.imageRendering = "pixelated;";
        img.style.objectFit = "cover";
        cellule.appendChild(img);
      } else if (morpion[row][coll] === 2) {
        const img = document.createElement("img");
        img.src = imgPlayer2;
        img.alt = `Player 1 ${name2}`;
        img.style.width = Imgsize;
        img.style.height = Imgsize;
        img.style.clipPath = " polygon(50% 0%, 0% 100%, 100% 100%)";
        img.style.imageRendering = "pixelated;";
        img.style.objectFit = "cover";
        cellule.appendChild(img);
      }

      cellule.addEventListener("click", function () {
        if (gameEnded) return;
        myBool = !myBool;

        if (myBool) {
          winPlayer = `${name1}`;
        } else {
          winPlayer = `${name2}`;
        }
        if (currentPlayer === 1) {
          tours = 2;
          winPlayer = `${name1}`;
          cellule.onclick = playSongPlayer1();
          console.log(name1);
          winPlayerNum = 1;
        } else if (currentPlayer === 2) {
          tours = 1;
          winPlayer = `${name2}`;
          cellule.onclick = playSongPlayer2();
          winPlayerNum = 2;
        }
        if (morpion[row][coll] === 0) {
          playerCount.innerHTML = tours;
        }
        makeMove(row, coll);
        console.log(imgPlayer1);
      });
      morpionContainer.appendChild(cellule);
    }
  }
}

function resetGame() {
  morpion = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  currentPlayer = 1;
  playerCount.innerHTML = 1;
  frameCooldown.style.display = "none";
  frameNull.style.display = "none";
  displayMorpion();
}

displayMorpion();

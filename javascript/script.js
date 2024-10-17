function loopWithOverlap() {
  const newAudio = new Audio(musicTracks[1]);
  newAudio.play();

  newAudio.addEventListener("playing", function () {
    const duration = newAudio.duration;
    setTimeout(loopWithOverlap, (duration - overlapTime) * 1000);
  });
}

window.onload = function () {
  currentTrackIndex = 0;
  audioElement.currentTime = 0;
  playNextTrack();
};

let Playername1 = "";
let Playername2 = "";

const supported = "mediaDevices" in navigator;

// Add a specified delay in miliseconds
const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

// Write text to a target element with a specified delay in ms
function writeText(target, content, delay = 5) {
  // Loop through array of content characters
  return new Promise((resolve) => {
    // Make an array of the specified content
    const contentArray = content.split("");

    // Keep track of the character currently being written
    let current = 0;

    while (current < contentArray.length) {
      ((curr) => {
        setTimeout(() => {
          target.innerHTML += contentArray[curr];
          // Scroll to the bottom of the screen unless scroll is false
          window.scrollTo(0, document.body.scrollHeight);

          // Resolve the promise once the last character is written
          if (curr === contentArray.length - 1) resolve();
        }, delay * curr); // increase delay with each iteration
      })(current++);
    }
  });
}

// Handle keypresses on the document, printing them to an
// 'input' span. Input content will be interpreted as a
// command and output will be written to an output element
function handleKeypress(e, input, output) {
  // Vérifiez si une touche valide a été pressée
  const isCharacterKey = (key) => {
    return (
      /^[a-zA-Z0-9]$/.test(key) || key === "40" || key === "-" || key === "_"
    ); // Ajoutez d'autres caractères valides si nécessaire
  };

  // Ne pas gérer si un élément de saisie est actif
  function noInputHasFocus() {
    const elements = ["INPUT", "TEXTAREA", "BUTTON"];
    return elements.indexOf(document.activeElement.tagName) === -1;
  }

  function enterSong() {
    const songEnter = document.getElementById("songEnter");
    songEnter.play();
  }

  if (noInputHasFocus()) {
    enterSong();
    // Enter traite la commande
    if (e.key === "Enter") {
      const command = input.innerText;
      output.innerHTML += "<br><strong>" + command + "</strong>\n<br>";
      writeText(output, execute(command));
      if (Playername1 != "" && Playername2 != "") {
        terminale.style.display = "none";
        menu.style.display = "block";
      }
      input.innerHTML = ""; // Réinitialise l'entrée après avoir exécuté la commande
    }

    // if (e.keyCode === 40 && Playername1 != "" && Playername2 != "") {
    //   terminale.style.display = "none";
    //   menu.style.display = "block";
    // }
    // Ignorer les touches de contrôle et les touches non désirées
    else if (isCharacterKey(e.key)) {
      input.insertAdjacentText("beforeend", e.key);
    }
    // Backspace pour effacer le dernier caractère
    else if (e.key === "Backspace") {
      input.innerHTML = input.innerHTML.substring(
        0,
        input.innerHTML.length - 1
      );
    }
  }

  // Accept a command, execute it, and return any output
  function execute(command) {
    if (Playername1 === "") {
      if (command.trim() === "") {
        return "Mettez le nom du premier joueur";
      } else {
        Playername1 = command;
        localStorage.setItem("Name1", Playername1);
        return "Nom du joueur 1 enregistré : " + Playername1;
      }
    } else if (Playername2 === "") {
      if (command.trim() === "") {
        return "Mettez le nom du deuxieme joueur";
      } else {
        Playername2 = command;
        localStorage.setItem("Name2", Playername2);
        return "Nom du joueur 2 enregistré : " + Playername2;
      }
    } else {
      return "Enregistré avec succès, pour continuer appuyez sur ⭢ (rightArrow)";
    }
    // switch (command.toLowerCase()) {
    //   case "":
    //     return "Merci d'insérer le nom du premier joueur";
    //   default:
    //     return "le nom du deuxieme joueur";
    // }
  }
}

// Execute page loading asynchronously once content has loaded
document.addEventListener("DOMContentLoaded", async () => {
  const asciiText = document.getElementById("asciiText");
  // Store the content of asciiText, then empty it
  const asciiArt = asciiText.innerText;
  asciiText.innerHTML = "";

  const instructions = document.getElementById("instructions");
  const prompt = document.getElementById("prompt");
  const cursor = document.getElementById("cursor");

  await wait(3200);
  await writeText(asciiText, asciiArt);
  await wait(400);
  await writeText(
    instructions,
    `Pour pouvoir jouer, veuillez inscrire votre nom et prénom ci-dessus.

$.KEY INDEX
  ↵  (Enter) - Valider`
  );
  prompt.prepend(">");
  cursor.innerHTML = "_";

  const input = document.getElementById("command-input");
  const output = document.getElementById("output");
  document.addEventListener("keydown", (e) => handleKeypress(e, input, output));
});

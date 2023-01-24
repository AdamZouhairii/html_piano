const touchepiano = document.querySelectorAll(".piano-keys .key"),
volume = document.querySelector(".volume-slider input"),
affichetouche = document.querySelector(".keys-checkbox input");

let toutlestouche = [],
audio = new Audio(`note/a.wav`);  // par défaut, audio est "a" note

const JoueNote = (key) => {
    audio.src = `note/${key}.wav`; // son est basée sur la touche enfoncée
    audio.play();  // ici on joue le son

    const clickedKey = document.querySelector(`[data-key="${key}"]`); //obtenir une clé cliqué
    clickedKey.classList.add("active"); // ajouter une classe active à l'élément clé cliqué
    setTimeout(() => { // suppression de la classe active après 150 ms de l'élément clé cliqué
        clickedKey.classList.remove("active");
    }, 150);
}

touchepiano.forEach(key => {
    toutlestouche.push(key.dataset.key); // ajouter la valeur de la clé au tableau toutlestouche
     // appeler la fonction JoueNote en passant la valeur de la clé  comme argument
    key.addEventListener("click", () => JoueNote(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; // transmettre la valeur du slide de volume de page en tant que volume audio
}

const showHideKeys = () => {
    // masquer la classe de chaque clé sur la case à cocher
    touchepiano.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    // si la touche enfoncée est dans le tableau toutlestouche, n'appelle que la fonction JoueNote
    if(toutlestouche.includes(e.key)) JoueNote(e.key);
}

affichetouche.addEventListener("click", showHideKeys);
volume.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

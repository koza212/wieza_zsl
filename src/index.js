import { Game } from './scripts/core/game'; 

let game;

window.startPlay = () => {
    const titleScreen = document.getElementById("1");
    const settingsScreen = document.getElementById("2");
    const footer = document.getElementById("footer");

    titleScreen.style.display = "none";
    settingsScreen.style.display = "none";
    footer.style.display = "none";

    const gameScreen = document.getElementById("gameScreen");
    gameScreen.style.display = "block";

    const canvas = document.getElementById("gameCanvas");
    
    if(!game){
        game = new Game(canvas);
    }
};
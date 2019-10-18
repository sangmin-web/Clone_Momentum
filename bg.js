const img = document.querySelector(".bgImage");
const IMG_NUMBER = 6;


function paintImage(imgNumber) {
    img.src = `./images/${imgNumber}.jpg`;

}

function genRandom() {
    return Math.floor(Math.random() * IMG_NUMBER);
}

(() => {
    paintImage(genRandom());
})();
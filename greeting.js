const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_OFF = "none";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function askForName() {
    form.classList.remove(SHOWING_OFF);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const currentValue = input.value;
        saveName(currentValue);
        loadName();
    })

}

function paintGreeting(text) {
    form.classList.add(SHOWING_OFF);
    greeting.classList.remove(SHOWING_OFF);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    //local storage 작은 정보를 사용자 컴퓨터에 저장
    const currentUser = localStorage.getItem(USER_LS);
    console.log(currentUser);
    if (currentUser) {
        paintGreeting(currentUser);
    } else {
        askForName();
    }
}

function init() {
    loadName();
}

init();
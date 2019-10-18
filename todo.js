const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDOList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

function saveToDos() {
    //locagStorage는 모두 String타입으로 저장함 그래서 JSON.stringify 사용
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    li.id = newId;
    delBtn.innerHTML = "❌"
    const span = document.createElement("span");
    delBtn.addEventListener("click", (event) => {
        const li = event.target.parentNode;
        toDos = toDos.filter((e) => {
            return e.id !== parseInt(li.id);
        });
        toDOList.removeChild(li);
        saveToDos();
    });
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDOList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
    }
    toDos.push(toDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    paintTodo(toDoInput.value);
    toDoInput.value = "";
})

function loadToDos() {
    const loadedTodos = localStorage.getItem(TODOS_LS);

    if (loadedTodos) {
        //JSON = JavaScript Notation Object
        const parsedToDos = JSON.parse(loadedTodos);
        parsedToDos.forEach((todo) => {
            paintTodo(todo.text);
        });
    }
}

(() => {
    loadToDos();
})();
import { LocalStorage } from "./localStorage.class";
// import { ToDoList } from "./js/toDoList.class.js";

// const toDo = new ToDoList();


const storageClass = new LocalStorage("todo");

const listInput = document.querySelector(".list__input") as HTMLInputElement;
const listAreaForm = document.querySelector(".list__area-form");
const addTaskBtn = document.querySelector(".list__btn-add") as HTMLButtonElement;
const todoTable = document.querySelector(".list__table") as HTMLElement;

let arrTodos: Array<Object> = [];

document.addEventListener("click", addTask);

arrTodos = storageClass.getData();
renderTask();

function addTask(event) {
  if (event.target === addTaskBtn) {
    event.preventDefault();
    if (!listInput.value) return;

    const newTodo: Object = {
      text: listInput.value,
      checked: false,
      key: createRandomKey(),
    };

    arrTodos.unshift(newTodo);
    listInput.value = "";
    onChangeTodos();
    addTaskBtn.innerText = "Add Task";
  }
}

function createRandomKey() {
  let text = "";
  const STR_OF_SYMBOLS = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 10; i++) {
    text += STR_OF_SYMBOLS.charAt(
      Math.floor(Math.random() * STR_OF_SYMBOLS.length)
    );
  }

  return text;
}

function onChangeTodos() {
  storageClass.setData(arrTodos);
  renderTask();
}

function renderTask() {
  todoTable.innerHTML = "";

  arrTodos.forEach((item: any) => {
    const label = document.createElement("label");
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const buttonDel = document.createElement("button");
    const buttonEdit = document.createElement("button");
    const buttonDiv = document.createElement("div");
    const checboxDiv = document.createElement("div");

    li.classList.add("list__task");
    buttonDiv.classList.add("list__buttons");
    checboxDiv.classList.add("list__task-status");
    buttonEdit.classList.add("list__btn-edit");
    buttonDel.classList.add("list__btn-delete");

    label.setAttribute("for", `item_${item.key}`);
    label.innerHTML = item.text;

    buttonEdit.innerHTML =
      "<img src='./assets/images/edit.png' class='img__edit' width='20' height='20' alt=''>";
    buttonDel.innerHTML =
      "<img src='./assets/images/delete.png' class='img__delete' width='20' height='20' alt=''>";

    checkbox.type = "checkbox";
    checkbox.id = `item_${item.key}`;
    checkbox.checked = item.checked ? true : false;

    if (checkbox.checked) {
      label.style.textDecoration = "line-through";
    }

    checboxDiv.append(checkbox, label);
    buttonDiv.append(buttonDel, buttonEdit);
    li.append(checboxDiv, buttonDiv);
    todoTable.append(li);

    checkbox.addEventListener("change", () => {
      updateChecked(item.key);
    });

    buttonDiv.addEventListener("click", (event: any) => {
      const target = event.target
      if (target.className === "list__btn-edit") {
        editElement(item.key);
      }
      if (target.className === "list__btn-delete") {
        deleteTask(item.key);
      }
    });
  });
}

function updateChecked(key: string) {
  const checkedElem: any = arrTodos.find((elem: any) => elem.key === key);

  checkedElem.checked = !checkedElem.checked;
  arrTodos.sort((a: any, b: any) => a.checked - b.checked);

  onChangeTodos();
}

function editElement(key) {
  const editedElem: any = arrTodos.find((elem: any) => elem.key == key);

  addTaskBtn.innerText = "Edit Task";
  listInput.value = editedElem.text;

  deleteTask(editedElem.key);

  document.querySelectorAll(".list__btn-edit").forEach((elem: any) => {
    elem.disabled = true;
  });
}

function deleteTask(key) {
  function finder(elem) {
    if (elem.key === key) {
      return true;
    } else {
      return false;
    }
  }
  const index = arrTodos.findIndex(finder);
  arrTodos.splice(index, 1);
  onChangeTodos();
}

import { LocalStorage } from "./localStorage.class";

export class ToDoList {
  storageClass = new LocalStorage("todo");
  arrTodos = this.storageClass.getData();
  listInput = document.querySelector(".list__input") as HTMLInputElement;
  addTaskBtn = document.querySelector(".list__btn-add") as HTMLButtonElement;

  constructor() {
    this.onInit();
  }

  onInit() {
    this.addTaskBtn.addEventListener("click", this.addTask.bind(this));
  }

  addTask(event) {
    event.preventDefault();

    if (!this.listInput.value) return;

    const newTodo = {
      text: this.listInput.value,
      checked: false,
      key: this.createRandomKey(),
    };

    this.arrTodos.unshift(newTodo);
    this.storageClass.setData(this.arrTodos);
    this.listInput.value = "";
  }

  createRandomKey() {
    let randomKey = "";
    const STR_OF_SYMBOLS = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 10; i++) {
      randomKey += STR_OF_SYMBOLS.charAt(
        Math.floor(Math.random() * STR_OF_SYMBOLS.length)
      );
    }

    return randomKey;
  }
}

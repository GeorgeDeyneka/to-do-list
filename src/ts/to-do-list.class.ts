import { LocalStorage } from "./local-storage.class";
import { ToDoObj } from "./models/to-do.interface";

export class ToDoList {
  private storageClass: LocalStorage = new LocalStorage("todo");
  private arrTodos: Array<ToDoObj> = this.storageClass.getData();
  private listInput = document.querySelector(
    ".list__input"
  ) as HTMLInputElement;
  private addTaskBtn = document.querySelector(
    ".list__btn-add"
  ) as HTMLButtonElement;
  private todoTable = document.querySelector(".list__table") as HTMLElement;

  constructor() {
    this.onInit();
  }

  onInit(): void {
    this.addTaskBtn.addEventListener("click", this.addTask.bind(this));
    this.renderTask(this.arrTodos);
  }

  addTask(event: Event): void {
    event.preventDefault();

    if (!this.listInput.value) return;

    const newTodo: ToDoObj = {
      text: this.listInput.value,
      checked: false,
      key: this.createRandomKey(),
    };

    this.arrTodos.unshift(newTodo);
    this.storageClass.setData(this.arrTodos);
    this.renderTask(this.arrTodos);
    this.listInput.value = "";
  }

  createRandomKey(): string {
    let randomKey: string = "";
    const STR_OF_SYMBOLS: string = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 10; i++) {
      randomKey += STR_OF_SYMBOLS.charAt(
        Math.floor(Math.random() * STR_OF_SYMBOLS.length)
      );
    }

    return randomKey;
  }

  generateTemplate(): string {
    return `
      <li class="list__task">
      <div class="list__task-status">

      </div>
      <div class="list__buttons">
      <button class="list__btn-delete">
      <img src="./assets/images/delete.png" class="img__delete" width="20" height="20" alt="">
      </button>
      <button class="list__btn-edit">
      <img src="./assets/images/edit.png" class="img__edit" width="20" height="20" alt="">
      </button>
      </div>
      </li>`;
  }

  generateCheckbox(item: ToDoObj) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `item_${item.key}`;
    checkbox.checked = item.checked ? true : false;

    return checkbox;
  }

  generateLabel(item: ToDoObj) {
    const label = document.createElement("label");
    label.setAttribute("for", `item_${item.key}`);
    label.innerHTML = item.text;

    return label;
  }

  renderTask(data: Array<ToDoObj>) {
    this.todoTable.innerHTML = "";

    data.forEach((item: ToDoObj, index: number) => {
      const renderedTemplate = this.generateTemplate();
      this.todoTable.innerHTML += renderedTemplate;

      const inputWrapper = document.querySelectorAll(".list__task-status");
      const renderedCheckbox = this.generateCheckbox(item);
      const renderedLabel = this.generateLabel(item);

      inputWrapper[index].append(renderedCheckbox, renderedLabel);

      //     if (checkbox.checked) {
      //       label.style.textDecoration = "line-through";
      //     }
    });
  }
}

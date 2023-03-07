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
  private editTaskBtn = document.querySelector(
    ".list__btn-edit-task"
  ) as HTMLButtonElement;
  private todoTable = document.querySelector(".list__table") as HTMLElement;

  constructor() {
    this.onInit();
  }

  onInit(): void {
    this.editTaskBtn.addEventListener("click", (event) =>
      event.preventDefault()
    );
    this.addTaskBtn.addEventListener("click", this.addTask.bind(this));
    this.changeButtonsVisibility(this.editTaskBtn, this.addTaskBtn);
    this.renderTask(this.arrTodos);
    this.addStyleOnChecked();
  }

  renderTask(data: Array<ToDoObj>) {
    this.todoTable.innerHTML = "";

    data.map((item: ToDoObj, index: number) => {
      this.todoTable.appendChild(this.generateTemplate(item.id));

      const inputWrapper = document.querySelectorAll(".list__task-status");
      const renderedCheckbox = this.generateCheckbox(item);
      const renderedLabel = this.generateLabel(item);

      inputWrapper[index].append(renderedCheckbox, renderedLabel);

      renderedCheckbox.addEventListener(
        "change",
        this.updateCheckedStatus.bind(this, item.id)
      );
    });
  }

  generateTemplate(itemId: string): HTMLLIElement {
    const li = document.createElement("li");
    const buttonDel = document.createElement("button");
    const buttonEdit = document.createElement("button");
    const buttonDiv = document.createElement("div");
    const taskStatus = document.createElement("div");

    li.classList.add("list__task");
    buttonDiv.classList.add("list__buttons");
    buttonEdit.classList.add("list__btn-edit");
    buttonDel.classList.add("list__btn-delete");
    taskStatus.classList.add("list__task-status");

    buttonEdit.innerHTML =
      "<img src='./assets/images/edit.png' class='img__edit' width='20' height='20' alt=''>";
    buttonDel.innerHTML =
      "<img src='./assets/images/delete.png' class='img__delete' width='20' height='20' alt=''>";

    buttonDiv.append(buttonDel, buttonEdit);
    li.append(taskStatus, buttonDiv);

    buttonDiv.addEventListener(
      "click",
      this.addEditButtonHandler.bind(this, itemId)
    );

    return li;
  }

  generateCheckbox(item: ToDoObj) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `item_${item.id}`;
    checkbox.checked = item.checked ? true : false;

    return checkbox;
  }

  generateLabel(item: ToDoObj) {
    const label = document.createElement("label");
    label.setAttribute("for", `item_${item.id}`);
    label.className = "list__label";
    label.innerHTML = item.text;

    return label;
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

  updateTodos() {
    this.storageClass.setData(this.arrTodos);
    this.renderTask(this.arrTodos);
  }

  addTask(event: Event): void {
    event.preventDefault();

    if (!this.listInput.value) return;

    const newTodo: ToDoObj = {
      text: this.listInput.value,
      checked: false,
      id: this.createRandomKey(),
    };

    this.arrTodos.unshift(newTodo);
    this.updateTodos();
    this.listInput.value = "";
  }

  deleteTask(id: string) {
    const deletedElem = this.arrTodos.findIndex((el) => el.id === id);
    this.arrTodos.splice(deletedElem, 1);

    this.updateTodos();
  }

  editTask(id: string) {
    let editedElem: ToDoObj = this.arrTodos.find((el) => el.id === id);
    this.listInput.value = editedElem.text;

    this.changeButtonsVisibility(this.addTaskBtn, this.editTaskBtn);

    this.listInput.addEventListener("change", formGetValue.bind(this));

    function formGetValue(event: Event) {
      const target = event.target as HTMLInputElement;

      if (editedElem) {
        editedElem.text = target.value;

        this.setStateEditButtons(false);
        this.changeButtonsVisibility(this.editTaskBtn, this.addTaskBtn);

        this.listInput.removeEventListener("change", formGetValue);
        this.updateTodos();

        this.listInput.value = "";
        editedElem = undefined;
      }
    }
  }

  addEditButtonHandler(id: string, event: Event) {
    const target = event.target as HTMLButtonElement;

    if (target.className === "list__btn-edit") {
      this.setStateEditButtons(true);
      this.editTask(id);
    }
    if (target.className === "list__btn-delete") {
      this.deleteTask(id);
    }
  }

  setStateEditButtons(disabledStatus: boolean) {
    const editButtons: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll(".list__btn-edit");

    editButtons.forEach((button) => (button.disabled = disabledStatus));
  }

  changeButtonsVisibility(from: HTMLButtonElement, to: HTMLButtonElement) {
    from.style.display = "none";
    to.style.display = "block";
  }

  updateCheckedStatus(key: string) {
    const checkedElem: ToDoObj = this.arrTodos.find(
      (elem: ToDoObj) => elem.id === key
    );
    checkedElem.checked = !checkedElem.checked;
    this.arrTodos.sort((a: any, b: any) => a.checked - b.checked);
    this.updateTodos();
    this.addStyleOnChecked();
  }

  addStyleOnChecked() {
    const checkedElems = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    checkedElems.forEach((checkbox) => {
      const key = checkbox.id.replace("item_", "");
      const label: HTMLLabelElement = document.querySelector(
        `label[for="item_${key}"]`
      );
      const checkedTodo: ToDoObj = this.arrTodos.find(
        (todo: ToDoObj) => todo.id === key
      );

      return (label.style.textDecoration = checkedTodo.checked
        ? "line-through"
        : "none");
    });
  }
}

import { LocalStorage } from "./local-storage.class";
import { BtnsClass } from "./models/enums/buttons-classes.enum";
import { HTMLTemplates } from "./models/enums/html-templates.enum";
import { TmpltClass } from "./models/enums/template-classes.enum";
import { ToDoObj } from "./models/interfaces/to-do.interface";

export class ToDoList {
  private storageClass: LocalStorage = new LocalStorage("todo");
  private arrTodos: Array<ToDoObj> = this.storageClass.getData();
  private editedElem: ToDoObj;

  private listInput = document.querySelector(
    `.${TmpltClass.input}`
  ) as HTMLInputElement;

  private addTaskBtn = document.querySelector(
    `.${BtnsClass.add}`
  ) as HTMLButtonElement;

  private editTaskBtn = document.querySelector(
    `.${BtnsClass.confirmEdit}`
  ) as HTMLButtonElement;

  private todoTable = document.querySelector(
    `.${TmpltClass.table}`
  ) as HTMLElement;

  constructor() {
    this.onInit();
  }

  onInit(): void {
    this.editTaskBtn.addEventListener("click", this.confirmEditTask.bind(this));
    this.addTaskBtn.addEventListener("click", this.addTask.bind(this));
    this.changeButtonsVisibility(this.editTaskBtn, this.addTaskBtn);
    this.renderTask(this.arrTodos);
    this.addStyleOnChecked();
  }

  renderTask(data: Array<ToDoObj>) {
    this.todoTable.innerHTML = "";

    data.map((item: ToDoObj, index: number) => {
      this.todoTable.appendChild(this.generateTemplate(item.id));

      const renderedCheckbox = this.generateCheckbox(item);
      const renderedLabel = this.generateLabel(item);
      const inputWrapper = document.querySelectorAll(
        `.${TmpltClass.statusDiv}`
      );

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

    li.classList.add(TmpltClass.task);
    buttonDiv.classList.add(BtnsClass.btnsDiv);
    buttonEdit.classList.add(BtnsClass.edit);
    buttonDel.classList.add(BtnsClass.delete);
    taskStatus.classList.add(TmpltClass.statusDiv);

    buttonEdit.innerHTML = HTMLTemplates.innerEditBtn;
    buttonDel.innerHTML = HTMLTemplates.innerDeleteBtn;

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
    label.className = TmpltClass.label;
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
    this.editedElem = editedElem;
  }

  confirmEditTask(event: Event) {
    event.preventDefault();
    this.editedElem.text = this.listInput.value;
    this.updateTodos();
    this.changeButtonsVisibility(this.editTaskBtn, this.addTaskBtn);
    this.listInput.value = "";
  }

  addEditButtonHandler(id: string, event: Event) {
    const target = event.target as HTMLButtonElement;

    if (target.className === BtnsClass.edit) {
      this.setStateEditButtons(true);
      this.editTask(id);
    }
    if (target.className === BtnsClass.delete) {
      this.deleteTask(id);
    }
  }

  setStateEditButtons(disabledStatus: boolean) {
    const editButtons: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll(`.${BtnsClass.edit}`);

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
    const checkedElems = document.querySelectorAll(TmpltClass.checkedInput);

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

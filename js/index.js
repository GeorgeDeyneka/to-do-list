(()=>{"use strict";var t,e,i,n=function(){function t(t){this.key=t}return t.prototype.getData=function(){return null!=localStorage.getItem(this.key)?JSON.parse(localStorage.getItem(this.key)):[]},t.prototype.setData=function(t){localStorage.setItem(this.key,JSON.stringify(t))},t}();!function(t){t.add="list__btn-add",t.edit="list__btn-edit",t.delete="list__btn-delete",t.confirmEdit="list__btn-edit-task",t.btnsDiv="list__buttons"}(t||(t={})),function(t){t.innerEditBtn="<img src='./assets/images/edit.png' class='img__edit' width='20' height='20' alt=''>",t.innerDeleteBtn="<img src='./assets/images/delete.png' class='img__delete' width='20' height='20' alt=''>"}(e||(e={})),function(t){t.input="list__input",t.table="list__table",t.statusDiv="list__task-status",t.task="list__task",t.label="list__label",t.checkedInput='input[type="checkbox"]:checked'}(i||(i={})),new(function(){function s(){this.storageClass=new n("todo"),this.arrTodos=this.storageClass.getData(),this.listInput=document.querySelector(".".concat(i.input)),this.addTaskBtn=document.querySelector(".".concat(t.add)),this.editTaskBtn=document.querySelector(".".concat(t.confirmEdit)),this.todoTable=document.querySelector(".".concat(i.table)),this.onInit()}return s.prototype.onInit=function(){this.editTaskBtn.addEventListener("click",this.confirmEditTask.bind(this)),this.addTaskBtn.addEventListener("click",this.addTask.bind(this)),this.changeButtonsVisibility(this.editTaskBtn,this.addTaskBtn),this.renderTask(this.arrTodos),this.addStyleOnChecked()},s.prototype.renderTask=function(t){var e=this;this.todoTable.innerHTML="",t.map((function(t,n){e.todoTable.appendChild(e.generateTemplate(t.id));var s=e.generateCheckbox(t),a=e.generateLabel(t);document.querySelectorAll(".".concat(i.statusDiv))[n].append(s,a),s.addEventListener("change",e.updateCheckedStatus.bind(e,t.id))}))},s.prototype.generateTemplate=function(n){var s=document.createElement("li"),a=document.createElement("button"),o=document.createElement("button"),d=document.createElement("div"),r=document.createElement("div");return s.classList.add(i.task),d.classList.add(t.btnsDiv),o.classList.add(t.edit),a.classList.add(t.delete),r.classList.add(i.statusDiv),o.innerHTML=e.innerEditBtn,a.innerHTML=e.innerDeleteBtn,d.append(a,o),s.append(r,d),d.addEventListener("click",this.addEditButtonHandler.bind(this,n)),s},s.prototype.generateCheckbox=function(t){var e=document.createElement("input");return e.type="checkbox",e.id="item_".concat(t.id),e.checked=!!t.checked,e},s.prototype.generateLabel=function(t){var e=document.createElement("label");return e.setAttribute("for","item_".concat(t.id)),e.className=i.label,e.innerHTML=t.text,e},s.prototype.createRandomKey=function(){for(var t="",e="abcdefghijklmnopqrstuvwxyz",i=0;i<10;i++)t+=e.charAt(Math.floor(Math.random()*e.length));return t},s.prototype.updateTodos=function(){this.storageClass.setData(this.arrTodos),this.renderTask(this.arrTodos)},s.prototype.addTask=function(t){if(t.preventDefault(),this.listInput.value){var e={text:this.listInput.value,checked:!1,id:this.createRandomKey()};this.arrTodos.unshift(e),this.updateTodos(),this.listInput.value=""}},s.prototype.deleteTask=function(t){var e=this.arrTodos.findIndex((function(e){return e.id===t}));this.arrTodos.splice(e,1),this.updateTodos()},s.prototype.editTask=function(t){var e=this.arrTodos.find((function(e){return e.id===t}));this.listInput.value=e.text,this.changeButtonsVisibility(this.addTaskBtn,this.editTaskBtn),this.editedElem=e},s.prototype.confirmEditTask=function(t){t.preventDefault(),this.editedElem.text=this.listInput.value,this.updateTodos(),this.changeButtonsVisibility(this.editTaskBtn,this.addTaskBtn),this.listInput.value=""},s.prototype.addEditButtonHandler=function(e,i){var n=i.target;n.className===t.edit&&(this.setStateEditButtons(!0),this.editTask(e)),n.className===t.delete&&this.deleteTask(e)},s.prototype.setStateEditButtons=function(e){document.querySelectorAll(".".concat(t.edit)).forEach((function(t){return t.disabled=e}))},s.prototype.changeButtonsVisibility=function(t,e){t.style.display="none",e.style.display="block"},s.prototype.updateCheckedStatus=function(t){var e=this.arrTodos.find((function(e){return e.id===t}));e.checked=!e.checked,this.arrTodos.sort((function(t,e){return t.checked-e.checked})),this.updateTodos(),this.addStyleOnChecked()},s.prototype.addStyleOnChecked=function(){var t=this;document.querySelectorAll(i.checkedInput).forEach((function(e){var i=e.id.replace("item_",""),n=document.querySelector('label[for="item_'.concat(i,'"]')),s=t.arrTodos.find((function(t){return t.id===i}));return n.style.textDecoration=s.checked?"line-through":"none"}))},s}())})();
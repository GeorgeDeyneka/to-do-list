(()=>{"use strict";var e=new(function(){function e(e){this.key=e}return e.prototype.getData=function(){return null!=localStorage.getItem(this.key)?JSON.parse(localStorage.getItem(this.key)):[]},e.prototype.setData=function(e){localStorage.setItem(this.key,JSON.stringify(e))},e}())("todo"),t=document.querySelector(".list__input"),n=(document.querySelector(".list__area-form"),document.querySelector(".list__btn-add")),c=document.querySelector(".list__table"),i=[];function a(){for(var e="",t="abcdefghijklmnopqrstuvwxyz",n=0;n<10;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}function r(){e.setData(i),s()}function s(){c.innerHTML="",i.forEach(function(e){var a=document.createElement("label"),s=document.createElement("li"),l=document.createElement("input"),o=document.createElement("button"),u=document.createElement("button"),m=document.createElement("div"),f=document.createElement("div");s.classList.add("list__task"),m.classList.add("list__buttons"),f.classList.add("list__task-status"),u.classList.add("list__btn-edit"),o.classList.add("list__btn-delete"),a.setAttribute("for","item_".concat(e.key)),a.innerHTML=e.text,u.innerHTML="<img src='./assets/images/edit.png' class='img__edit' width='20' height='20' alt=''>",o.innerHTML="<img src='./assets/images/delete.png' class='img__delete' width='20' height='20' alt=''>",l.type="checkbox",l.id="item_".concat(e.key),l.checked=!!e.checked,l.checked&&(a.style.textDecoration="line-through"),f.append(l,a),m.append(o,u),s.append(f,m),c.append(s),l.addEventListener("change",function(){var t,n;t=e.key,(n=i.find(function(e){return e.key===t})).checked=!n.checked,i.sort(function(e,t){return e.checked-t.checked}),r()}),m.addEventListener("click",function(c){var a,r,s=c.target;"list__btn-edit"===s.className&&(a=e.key,r=i.find(function(e){return e.key==a}),n.innerText="Edit Task",t.value=r.text,d(r.key),document.querySelectorAll(".list__btn-edit").forEach(function(e){e.disabled=!0})),"list__btn-delete"===s.className&&d(e.key)})})}function d(e){var t=i.findIndex(function(t){return t.key===e});i.splice(t,1),r()}document.addEventListener("click",function(e){if(e.target===n){if(e.preventDefault(),!t.value)return;var c={text:t.value,checked:!1,key:a()};i.unshift(c),t.value="",r(),n.innerText="Add Task"}}),i=e.getData(),s()})();
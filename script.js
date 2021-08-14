'use strict';

const todoList = document.getElementById("todo")[0],
    todoCompleted = document.getElementById("completed"),
    todoControl = document.querySelector(".todo-control"),
    todoListItems = document.querySelector(".todo-list"),
    headerInput = document.querySelector(".header-input");
    

const toDoData = [];
function myGFG() {
    var obj = JSON.parse(localStorage.getItem('toDoData'));      
    for(var i in obj){
        toDoData.push(obj[i]);
    }
}
myGFG();
const render = function (){
    todoListItems.textContent = "";
    todoCompleted.textContent = "";
    toDoData.forEach(function(item){ 
        let todoItem =document.createElement('li');
            todoItem.classList.add('todo-item');
            todoItem.innerHTML = `
            <span class="text-todo">${item.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>`; 
        const binButton = function(){
            const bin = todoItem.querySelector(".todo-remove");
            bin.addEventListener("click", function(){
                const index = toDoData.indexOf(item);
                toDoData.splice(index, 1);
                console.log(toDoData);
                render();
            });
        };
        binButton();    
        if (item.completed ){
            todoCompleted.append(todoItem);
        } else{
            todoListItems.append(todoItem);
        }
        const todoCompI = todoItem.querySelector(".todo-complete");
        todoCompI.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
    });
    localStorage.setItem('toDoData', JSON.stringify(toDoData));
};

if (localStorage.getItem('toDoData').length>1){
    render();
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if (headerInput.value !== ""){
        toDoData.push({
                value: headerInput.value,
                completed:false
            });
        headerInput.value = "";
        localStorage.setItem('toDoData', JSON.stringify(toDoData));
    }
    render();
});

//reading elements
const inputElement = document.getElementById('todo-item');
const submitBtn = document.querySelector('#submit-btn');
const todoList = document.querySelector('.todo-list');

//adding event listener fro button
submitBtn.addEventListener('click',clickHandler);
//adding dom onload event to load data from local storage
document.addEventListener('DOMContentLoaded',getLocalTodo)

function clickHandler(e) {
    //prevents auto refresh
    e.preventDefault();
    //validation for empty input
    if(inputElement.value.trim() !== '') {
        createTodo(inputElement.value); 
        //adding todo to local storage
        storeLocalTodo(inputElement.value); 
        inputElement.value = '';
    }
}

function createTodo(item) {
    //creates todo items with styles
    let todo = document.createElement('div');
    todo.classList.add('todo')
    let todoItem = document.createElement('li');
    todoItem.innerText = item;
    todoItem.classList.add('todo-item');
    let deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas');
    deleteBtn.classList.add('fa-trash');
    todo.appendChild(todoItem);
    todo.appendChild(deleteBtn);
    todoList.appendChild(todo);
    //adding click event for delete button
    deleteBtn.addEventListener('click',function() {
        todo.classList.add('delete-animation');
        //removing todo item from ui when delete animation ends
        todo.addEventListener('transitionend',function() {
            todo.remove();
        })
        //removing todo from local storage
        removeLocalTodo(item);
    });
}

function storeLocalTodo(todo) {
    let todos;
    //checking whether local storage is empty
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        //creating array of todos fetched from local storage
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    //adding new todo items to local storage
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getLocalTodo() {
    let todos;
    //condition for empty storage
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        //fetching todos from storage
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo) => {
        //creating each todo item
        createTodo(todo)
    })
}

function removeLocalTodo(todo) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    //removes the todo from todos array
    todos = todos.filter((item) => {
        return item !== todo;
    });
    //storing the new todolist in the local storage
    localStorage.setItem('todos',JSON.stringify(todos));
}
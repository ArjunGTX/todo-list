
//reading elements
const inputElement = document.getElementById('todo-item');
const submitBtn = document.querySelector('#submit-btn');
const todoList = document.querySelector('.todo-list');
const warning = document.querySelector('#warning');
const counterDiv = document.querySelector('#counter');

//clearing warning
inputElement.addEventListener('input',function() {
    showWarning('');
})
//adding event listener fro button
submitBtn.addEventListener('click',clickHandler);
//adding dom onload event to load data from local storage
document.addEventListener('DOMContentLoaded',function() {
    getCheckedTodo();
    getLocalTodo();
    updateCount();
})

function showWarning(message) {
    warning.innerText = message;
}

//function to update the count of todos
function updateCount() {
    let completedCount = JSON.parse(localStorage.getItem('checkedTodos')).length;
    let pendingCount = JSON.parse(localStorage.getItem('todos')).length;
    counterDiv.innerHTML = `Todos Completed : ${completedCount}<br>Todos Pending : ${pendingCount}`;
    
}

function clickHandler(e) {
    let todoItem = inputElement.value;
    //prevents auto refresh
    e.preventDefault();
    //validation for empty input
    if(todoItem.trim() !== '') {
        if(localStorage.getItem('checkedTodos') === null) {
            createTodo(todoItem); 
            //adding todo to local storage
            storeLocalTodo(todoItem);
            //checks if the item already exists in storage
        } else if(JSON.parse(localStorage.getItem('checkedTodos')).includes((todoItem).toLowerCase()) || JSON.parse(localStorage.getItem('todos')).includes((todoItem).toLowerCase())) {
            showWarning('Task already exists!');
        } else {
            createTodo(todoItem); 
            //adding todo to local storage
            storeLocalTodo(todoItem);
        }
        inputElement.value = '';
        updateCount();
    }
}

function createTodo(item) {
    //creates todo items with styles
    let todo = document.createElement('div');
    todo.classList.add('todo')
    let todoItem = document.createElement('li');
    todoItem.innerText = item;
    todoItem.classList.add('todo-item');
    let checkBtn  = document.createElement('i');
    checkBtn.classList.add('fas');
    checkBtn.classList.add('fa-check');
    let deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas');
    deleteBtn.classList.add('fa-trash');
    todo.appendChild(todoItem);
    todo.appendChild(checkBtn)
    todo.appendChild(deleteBtn);
    todoList.appendChild(todo);
    //adding click event for check button
    checkBtn.addEventListener('click',function() {
        showWarning('');
        todo.classList.add('checked');
        storeCheckedTodo(todoItem.innerText);
        removeTodo(item,'todos');
        updateCount();
        todo.addEventListener('transitionend',function() {
            checkBtn.remove();
        })
    })
    //adding click event for delete button
    deleteBtn.addEventListener('click',function() {
        showWarning('');
        todo.classList.add('delete-animation');
        //removing todo item from ui when delete animation ends
        todo.addEventListener('transitionend',function() {
            todo.remove();
        })
        //removing todo from local storage
        removeTodo(item,'todos');
        removeTodo(item,'checkedTodos');
        updateCount();
    });
}

function createCheckedTodo(item) {
    let todo = document.createElement('div');
    todo.classList.add('todo');
    todo.classList.add('checked');
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
        showWarning('');
        todo.classList.add('delete-animation');
        //removing todo item from ui when delete animation ends
        todo.addEventListener('transitionend',function() {
        todo.remove();
        })
        //removing todo from local storage
        removeTodo(item,'todos');
        removeTodo(item,'checkedTodos');
        updateCount();
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
        //creating each todo item if it is not checked
        if(!JSON.parse(localStorage.getItem('checkedTodos')).includes(todo)) {
            createTodo(todo);
        }
    })
}

function storeCheckedTodo(todo) {
    let checkedTodos;
    //checking whether local storage is empty
    if(localStorage.getItem('checkedTodos') === null) {
        checkedTodos = [];
    } else {
        //creating array of todos fetched from local storage
        checkedTodos = JSON.parse(localStorage.getItem('checkedTodos'));
    }
    checkedTodos.push(todo);
    //adding new todo items to local storage
    localStorage.setItem('checkedTodos',JSON.stringify(checkedTodos));
}

function getCheckedTodo() {
    let checkedTodos;
    //condition for empty storage
    if(localStorage.getItem('checkedTodos') === null) {
        checkedTodos = [];
    } else {
        //fetching todos from storage
        checkedTodos = JSON.parse(localStorage.getItem('checkedTodos'));
    }
    checkedTodos.forEach((todo) => {
        //creating each todo item
        createCheckedTodo(todo)
    })
}

function removeTodo(todo,todoType) {
    let todos = JSON.parse(localStorage.getItem(todoType));
    //removes the todo from todos array
    todos = todos.filter((item) => {
        return item !== todo;
    });
    //storing the new todolist in the local storage
    localStorage.setItem(todoType,JSON.stringify(todos));
}

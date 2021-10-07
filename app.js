const inputElement = document.getElementById('todo-item');
const submitBtn = document.querySelector('#submit-btn');
const todoList = document.querySelector('.todo-list');

submitBtn.addEventListener('click',clickHandler);

function clickHandler(e) {
    e.preventDefault();
    localStorage.clear()
    createTodo(inputElement.value);  
}

function createTodo(item) {
    let todo = document.createElement('div');
    todo.classList.add('todo')
    let todoItem = document.createElement('li');
    todoItem.innerText = item;
    todoItem.classList.add('todo-item');
    let checkBtn = document.createElement('i');
    checkBtn.classList.add('fas');
    checkBtn.classList.add('fa-check');
    let deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas');
    deleteBtn.classList.add('fa-trash');
    todo.appendChild(todoItem);
    todo.appendChild(checkBtn);
    todo.appendChild(deleteBtn);
    todoList.appendChild(todo);
    checkBtn.addEventListener('click',function() {
        todo.classList.add('checked')
    })
    deleteBtn.addEventListener('click',function() {
        todo.classList.add('delete-animation');
        todo.addEventListener('transitionend',function() {
            todo.remove();
        })
    });
}


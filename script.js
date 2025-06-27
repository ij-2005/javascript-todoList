//transitions

window.addEventListener('load', () => {
    document.body.style.opacity = 1;
  });

//variables
const saveBtn = document.getElementById("save-btn");
const loadTaskBtn = document.getElementById("load-task-btn");
const addNewBtn = document.getElementById("open-task-btn");
const closeTaskForm = document.getElementById("close-task-btn");
const newTaskForm = document.getElementById("task-form");
const addTaskBtn = document.getElementById("add-task");

const taskContainer = document.querySelector(".tasks-container");
const addBtnContainer = document.getElementById("btn-div-container");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

console.log(tasks);

let taskIndex = 0;

//functions

function updateList(tasksz){
    taskIndex = 0;
    taskContainer.innerHTML = "";
    tasksz.forEach(item => {
        AddTask(item.title, item.date, item.description);
    });
}


function Save(){
    alert("saved.");
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const pushTask = (title, date, description) => {
    tasks.push({title, date, description});
    console.log(tasks);
}


const AddTask = (title, date, description) => {
    
    taskContainer.innerHTML += 
    `<div class="task" data-index=${taskIndex}>
        <h3 id="title">Title: ${title} </h3>
        <p id="date">Date: ${date}</p>
        <p id="description">Description: ${description}</p>
        <button id="removeTask">Remove</button>
    </div>`
    console.log(taskIndex);
    taskIndex++;
}

const validationCheck = (title, date, description) => {
    if(title && date && description !== null){
        const title = document.getElementById("title-input").value;
        const date = document.getElementById("date-input").value;
        const description = document.getElementById("description-input").value;
        pushTask(title, date, description);
        AddTask(title, date, description);
        toggleHiddens();
        newTaskForm.reset();
    }else{
        alert("incomplete inputs.");
    }
}

const loadTasks = ()=>{
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if(tasks.length === 0){
        alert("There are no saves!");
    }else{
        updateList(tasks);
    }
}
    
    

function toggleHiddens(){
    newTaskForm.classList.toggle("hidden")
    addBtnContainer.classList.toggle("hidden")
}


//event listeners

newTaskForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const title = document.getElementById("title-input").value.trim();
    const date = document.getElementById("date-input").value.trim();
    const description = document.getElementById("description-input").value.trim();
    validationCheck(title, date, description);
})

addNewBtn.addEventListener('click', ()=> {
    toggleHiddens();
});

closeTaskForm.addEventListener('click', ()=> {
    toggleHiddens();
    newTaskForm.reset();
});

taskContainer.addEventListener('click', function(e) {
    
    if(e.target.tagName === 'BUTTON' && e.target.id === 'removeTask'){
        const taskDiv = e.target.closest('.task');
        const indexNumber = taskDiv.getAttribute('data-index');
        tasks.splice(indexNumber, 1);
        taskDiv.remove();
        taskIndex --;
    } 
    updateList(tasks);
    console.log(tasks);
    console.log(`current index is ${taskIndex}`);
});

loadTaskBtn.addEventListener('click', ()=>{
    loadTasks();
    console.log(tasks);
});

saveBtn.addEventListener('click', ()=>{Save()});



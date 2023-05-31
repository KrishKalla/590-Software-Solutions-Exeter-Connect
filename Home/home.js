const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle");

      //LOCAL STORAGE FOR DARK/LIGHT MODE CHECKER
      let getMode = localStorage.getItem("mode");
      if(getMode && getMode === "dark-mode"){
        body.classList.add("dark");

      }

    //JS SCRIPT TO TOGGLE DARK/LIGHT MODE
      modeToggle.addEventListener("click", () => {
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark")

        //LOCAL STORAGE SETTER FOR DARK/LIGHT MODE
        if(!body.classList.contains("dark")){
            localStorage.setItem("mode", "light-mode");
        }else{
            localStorage.setItem("mode", "dark-mode");
        }
      });

    //JS SCRIPT TO TOGGLE SEARCH BAR
      searchToggle.addEventListener("click", () => {
        searchToggle.classList.toggle("active");
      })
    

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value;
  if (taskText.trim() !== '') {
    const taskItem = document.createElement('li');
    const taskTextSpan = document.createElement('span');
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Completed';

    taskTextSpan.textContent = taskText;
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(completeButton);
    taskList.appendChild(taskItem);

    taskInput.value = '';
  }
}

taskList.addEventListener('click', handleTaskClick);

function handleTaskClick(event) {
  if (event.target.tagName === 'BUTTON') {
    const taskItem = event.target.parentNode;
    taskList.removeChild(taskItem);
  }
}


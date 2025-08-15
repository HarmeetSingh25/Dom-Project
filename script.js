let Cards = document.querySelectorAll(".elem");
let Task_input = document.getElementById("Task_input");
let TaskDetail_input = document.getElementById("TaskDetail_input");
let addBtn = document.getElementById("AddTaskBtn");
let imp_Input = document.querySelector("#imp");
let Cards_FullPages = document.querySelectorAll(".fullPage");
let Taskhold = document.querySelector(".Taskhold");
let form = document.getElementById("form");
let currentTask = [];

function Cards_FullPageClose() {
  let close_btn = document.querySelectorAll(".close");
  close_btn.forEach((button, index) => {
    button.addEventListener("click", () => {
      Cards_FullPages[index].style.display = "none";
    });
  });
}
Cards_FullPageClose();
function ShowTaskDetail() {
  let tasks = document.querySelectorAll(".task");
  let details = document.querySelectorAll(".TaskDetail");
  
  tasks.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      details[index].classList.toggle("show");
    });
  });
}
function TaskCreate() {
  addBtn.addEventListener("click", () => {
    Taskhold.innerHTML += ` <div class="task">
    <h4>${Task_input.value} <span class="imp">imp</span></h4>
    <button class="Delete-btn">Delete</button>
    </div>
    <div class="TaskDetailContainer"><h5 class="TaskDetail">Todo Task Detail:${TaskDetail_input.value}</h5>
    </div>
    `;
    currentTask.push({
      Task: Task_input.value,
      TaskDetail: TaskDetail_input.value,
      Imp: imp_Input.checked,
    });
    const lastImp = Taskhold.querySelectorAll(".imp");
    const newImp = lastImp[lastImp.length - 1];
    
    if (imp_Input.checked) {
      newImp.style.display = "inline";
    } else {
      newImp.style.display = "none";
    }
    imp_Input.checked = false;
    let Delete_btn = document.querySelectorAll(".Delete-btn");
    
    Delete_btn.forEach((elem) => {
      elem.addEventListener("click", () => {
        elem.parentElement.remove(); // Remove the task div
        document.querySelector(".TaskDetail").remove();
      });
    });
    Task_input.value = "";
    TaskDetail_input.value = "";
    ShowTaskDetail();
  });
}
TaskCreate();

function fullCardPageDisplay() {
  Cards.forEach((elem) => {
    elem.addEventListener("click", () => {
      Cards_FullPages[elem.id].style.display = "block";
    });
  });
}
fullCardPageDisplay();


form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(currentTask);
  // localStorage.setItem(currentTask)
});
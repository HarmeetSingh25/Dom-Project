function OpenClsoePage() {
  let Cards = document.querySelectorAll(".elem");
  let Cards_FullPages = document.querySelectorAll(".fullPage");

  // Show full card
  function fullCardPageDisplay() {
    Cards.forEach((elem) => {
      elem.addEventListener("click", () => {
        Cards_FullPages[elem.id].style.display = "block";
      });
    });
  }
  fullCardPageDisplay();

  // Close buttons for cards
  function Cards_FullPageClose() {
    let close_btn = document.querySelectorAll(".close");
    close_btn.forEach((button, index) => {
      button.addEventListener("click", () => {
        Cards_FullPages[index].style.display = "none";
      });
    });
  }

  Cards_FullPageClose();
}
OpenClsoePage();
function todoList() {
  let Task_input = document.getElementById("Task_input");
  let TaskDetail_input = document.getElementById("TaskDetail_input");
  let addBtn = document.getElementById("AddTaskBtn");
  let imp_Input = document.querySelector("#imp");
  let Taskhold = document.querySelector(".Taskhold");
  let form = document.getElementById("form");
  let currentTask = [];

  // Show task details toggle
  function ShowTaskDetail() {
    let tasks = document.querySelectorAll(".task");
    let details = document.querySelectorAll(".TaskDetail");

    tasks.forEach((elem, index) => {
      elem.addEventListener("click", () => {
        details[index].classList.toggle("show");
      });
    });
  }

  // 🔹 Function to render tasks from localStorage
  function renderTasks() {
    Taskhold.innerHTML = ""; // clear UI
    currentTask.forEach((task, index) => {
      Taskhold.innerHTML += `
      <div class="task">
      <h4>${task.Task} <span class="imp" style="display:${
        task.Imp ? "inline" : "none"
      }">imp</span></h4>
      <button class="Delete-btn">Delete</button>
      </div>
      <div class="TaskDetailContainer"><h5 class="TaskDetail">Todo Task Detail: ${
        task.TaskDetail
      }</h5></div>
      `;
    });

    // Add delete functionality
    let Delete_btn = document.querySelectorAll(".Delete-btn");
    Delete_btn.forEach((elem, index) => {
      elem.addEventListener("click", () => {
        currentTask.splice(index, 1); // remove from array
        localStorage.setItem("currentTask", JSON.stringify(currentTask)); // update storage
        renderTasks(); // re-render
      });
    });

    ShowTaskDetail();
  }

  // Add new task
  function TaskCreate() {
    addBtn.addEventListener("click", () => {
      currentTask.push({
        Task: Task_input.value,
        TaskDetail: TaskDetail_input.value,
        Imp: imp_Input.checked,
      });

      localStorage.setItem("currentTask", JSON.stringify(currentTask)); // save to storage
      renderTasks(); // refresh UI

      // reset inputs
      Task_input.value = "";
      TaskDetail_input.value = "";
      imp_Input.checked = false;
    });
  }
  TaskCreate();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 🔹 Load tasks from localStorage on page load
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
    renderTasks();
  }
}
todoList();

let day_planner = document.querySelector(".day-planner");
let Day_Planner_Data = JSON.parse(localStorage.getItem("DayPlan")) || {};

let hours = Array.from(
  { length: 24 },
  (_elem, index) => `${index}:00 - ${index + 1}:00  ${index < 13 ? "AM" : "PM"}`
);
let wholeDay = "";
hours.forEach((elem, idx) => {
  let loacalStaredValue = Day_Planner_Data[idx] || " ";
  wholeDay += `<div class="day-planner-time">
  <p>${elem}</p>
  <input class="DayPlaninput" id="${idx}" type="text" value="${loacalStaredValue}"/>
  </div>`;
});

day_planner.innerHTML = wholeDay;

let DayPlannerInput = document.querySelectorAll(".day-planner input");
DayPlannerInput.forEach((elem) => {
  elem.addEventListener("input", () => {
    // console.log(elem);
    Day_Planner_Data[elem.id] = elem.value;
    localStorage.setItem("DayPlan", JSON.stringify(Day_Planner_Data));
  });
});

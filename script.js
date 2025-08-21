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
function DayPlanner() {
  let day_planner = document.querySelector(".day-planner");
  let Day_Planner_Data = JSON.parse(localStorage.getItem("DayPlan")) || {};

  let hours = Array.from(
    { length: 24 },
    (_elem, index) =>
      `${index}:00 - ${index + 1}:00  ${index < 13 ? "AM" : "PM"}`
  );
  console.log(hours);

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
}
DayPlanner();
function MotivationQuotes() {
  let DayName = ["sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let days = new Date().getDay();
  document.querySelector(".date").innerHTML = `${
    DayName[days]
  } <br>  ${new Date().getDate()}`;

  let value = fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".motivation-2 h3").innerHTML = data.content;
    });
}
MotivationQuotes();

// PomoDoro Timer
let totalSecond = 1500;
let minutes;
let seconds;
let pomo_timer = document.querySelector(".pomo-timer h1");
let interval = null;

function UpdateTimer() {
  minutes = Math.floor(totalSecond / 60);
  seconds = totalSecond % 60;
  // console.log(minutes, seconds);
  pomo_timer.innerHTML = `${minutes.toString().padStart(2, "0")} : ${seconds
    .toString()
    .padStart(2, "0")}`;
}
function startTimer() {
  if (interval === null) {
    interval = setInterval(() => {
      totalSecond--;
      UpdateTimer();
      if (totalSecond <= 0) {
        clearInterval(interval);
        totalSecond = 1500;
        interval = null;
        document.querySelector(".pomo-timer h1").innerHTML = "25 : 00";
      }
    }, 1000);
  }
}

document.querySelector(".start-Timer").addEventListener("click", () => {
  startTimer();
});

function ResetTime() {
  document.querySelector(".Reset-Timer").addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    totalSecond = 1500;
    UpdateTimer();
  });
}
ResetTime();
function PauseTimer() {
  document.querySelector(".Pause-Timer").addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    UpdateTimer();
  });
}
PauseTimer();

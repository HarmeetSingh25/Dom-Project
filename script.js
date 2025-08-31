function OpenClsoePage() {
  let Cards = document.querySelectorAll(".elem");
  let Cards_FullPages = document.querySelectorAll(".fullPage");
  let Status_Container = document.querySelector(".Status-Container");
  // Show full card
  function fullCardPageDisplay() {
    Cards.forEach((elem) => {
      elem.addEventListener("click", () => {
        Cards_FullPages[elem.id].style.display = "block";
        Status_Container.style.display = "none";
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
        Status_Container.style.display = "flex";
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
    currentTask.forEach((task) => {
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
  // console.log(hours);

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
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const dateEl = document.querySelector(".date");
  const quoteEl = document.querySelector(".motivation-2 h3");
  // console.log(getDay);

  if (dateEl)
    dateEl.innerHTML = `${dayNames[now.getDay()]} <br> ${now.getDate()}`;
  if (!quoteEl) return;

  fetch("https://dummyjson.com/quotes/random")
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then((data) => {
      quoteEl.textContent = data.quote || "Keep going. You’ve got this!";
    })
    .catch((err) => {
      console.error("Quote fetch failed:", err);
      quoteEl.textContent = "Small steps every day.";
    });
}

// Ensure it runs after the DOM is ready:
window.addEventListener("DOMContentLoaded", MotivationQuotes);

function PomoDoroTimer() {
  // PomoDoro Timer
  // --- State ---
  let IsWorkSession = true; // true = work, false = break
  let sessionDuration = 25 * 60; // full length of the current session (in seconds)
  let totalSecond = sessionDuration; // remaining seconds in the current session
  let interval = null;

  // --- DOM ---
  const pomo_timer = document.querySelector(".pomo-timer h1");

  // SVG progress ring setup
  const loader = document.querySelector(".progress-ring__circle");
  const radius = loader.r.baseVal.value;
  const C = 2 * Math.PI * radius; // circumference
  loader.style.strokeDasharray = `${C} ${C}`;
  loader.style.strokeDashoffset = "0";

  // --- Helpers ---
  function format(val) {
    return val.toString().padStart(2, "0");
  }

  function UpdateTimer() {
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;
    pomo_timer.innerHTML = `${format(minutes)} : ${format(seconds)}`;
  }

  function setProgress(remaining, duration) {
    // remaining/duration = fraction of time left
    const offset = C * (1 - remaining / duration);
    loader.style.strokeDashoffset = offset;
  }

  function startWorkSession() {
    IsWorkSession = true;
    sessionDuration = 25 * 60;
    totalSecond = sessionDuration;
    UpdateTimer();
    setProgress(totalSecond, sessionDuration);
  }

  function startBreakSession() {
    IsWorkSession = false;
    sessionDuration = 5 * 60;
    totalSecond = sessionDuration;
    UpdateTimer();
    setProgress(totalSecond, sessionDuration);
  }

  // --- Controls ---
  function startTimer() {
    if (interval !== null) return; // prevent double start

    interval = setInterval(() => {
      if (totalSecond > 0) {
        totalSecond--;
        UpdateTimer();
        setProgress(totalSecond, sessionDuration);
        return;
      }

      // session finished: stop current timer and prepare the next session
      clearInterval(interval);
      interval = null;

      if (IsWorkSession) {
        // switch to break
        startBreakSession();
      } else {
        // switch to work
        startWorkSession();
      }
    }, 1000);
  }

  function PauseTimer() {
    clearInterval(interval);
    interval = null;
    // keep current time shown; no other changes needed
    UpdateTimer();
    setProgress(totalSecond, sessionDuration);
  }

  function ResetTime() {
    clearInterval(interval);
    interval = null;
    startWorkSession(); // reset to 25:00 work session
  }

  // --- Event listeners ---
  document.querySelector(".start-Timer").addEventListener("click", startTimer);
  document.querySelector(".Pause-Timer").addEventListener("click", PauseTimer);
  document.querySelector(".Reset-Timer").addEventListener("click", ResetTime);

  // --- Initial paint ---
  UpdateTimer();
  setProgress(totalSecond, sessionDuration);
}
PomoDoroTimer();
function DailyGoal() {
  let GoalArray = [];
  if (localStorage.getItem("Goal")) {
    GoalArray = JSON.parse(localStorage.getItem("Goal"));
    console.log();
    let Goal_holder = document.querySelector(".Goal_holder");
    Goal_holder.innerHTML = "";
    GoalArray.forEach((Goal) => {
      Goal_holder.appendChild(RenderData(Goal));
    });
  }

  let date = TodayDate();

  function TodayDate() {
    let date = new Date();
    let year = date.getFullYear();
    let hours = date.getHours();
    console.log(hours);

    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let fullDate = `${year}-${month}-${day}`;
    let Goal_page = document.querySelector(".Date p");
    Goal_page.textContent = fullDate;
    return fullDate;
  }

  function RenderData(goal) {
    let Goal = document.createElement("div");
    Goal.className = "Goal";
    Goal.dataset.id = goal.id;

    let checkBox_GoalName = document.createElement("div");
    checkBox_GoalName.className = "checkBox_GoalName";

    let span = document.createElement("span");
    goal.importantToggleValue
      ? (span.textContent = "⭐")
      : (span.textContent = "");
    let paragraph = document.createElement("p");
    paragraph.textContent = goal.text;

    checkBox_GoalName.appendChild(paragraph);
    checkBox_GoalName.appendChild(span);

    let Goal_edit_delete = document.createElement("div");
    Goal_edit_delete.className = "Goal_edit_delete";

    let EditButton = document.createElement("button");
    EditButton.className = "EditGoal";
    EditButton.textContent = "🖋️";

    let DltButton = document.createElement("button");
    DltButton.className = "DltButton";
    DltButton.textContent = "🗑️";
    Goal_edit_delete.appendChild(EditButton);
    Goal_edit_delete.appendChild(DltButton);
    Goal.appendChild(checkBox_GoalName);
    Goal.appendChild(Goal_edit_delete);

    // console.log(Goal);
    return Goal;
  }

  function SendingToArrayData() {
    let Goal_holder = document.querySelector(".Goal_holder");
    let Goal_input = document.getElementById("Goal_input");
    let goal_Add_Btn = document.getElementById("goal_Add");
    let ImpcheckedInput = document.querySelector("#importantToggle");

    goal_Add_Btn.addEventListener("click", () => {
      let importantToggleValue = ImpcheckedInput.checked;
      // console.log(importantToggleValue);

      const text = Goal_input.value.trim();
      if (!text) return;
      let GoalData = {
        id: Date.now(),
        text,
        importantToggleValue,
        date: TodayDate(),
      };
      Goal_holder.appendChild(RenderData(GoalData)); // ⬅️ append the element

      GoalArray.push(GoalData);
      localStorage.setItem("Goal", JSON.stringify(GoalArray));
      Goal_input.value = "";
      Goal_input.focus();
      ImpcheckedInput.checked = false;
    });
  }

  SendingToArrayData();

  function dltGoal() {
    const Goal_holder = document.querySelector(".Goal_holder");

    Goal_holder.addEventListener("click", (e) => {
      const dltBtn = e.target.closest(".DltButton");
      if (!dltBtn) return;
      // console.log(dltBtn);

      const row = dltBtn.closest(".Goal");
      // console.log(row.dataset.id);

      if (!row) return;

      // 2) remove from state
      const idx = GoalArray.findIndex((g) => String(g.id) === row.dataset.id);
      console.log(idx);

      if (idx > -1) {
        GoalArray.splice(idx, 1);
        localStorage.setItem("Goal", JSON.stringify(GoalArray)); // if persisting
      }

      // 3) now remove from DOM
      row.remove();
      console.log(GoalArray);
    });
  }

  dltGoal();
  function EditGoal() {
    const Goal_holder = document.querySelector(".Goal_holder");
    Goal_holder.addEventListener("click", (e) => {
      let row = e.target.closest(".Goal");
      if (!row) return;
      console.log(row);

      if (e.target.closest(".EditGoal")) {
        let left = row.querySelector(".checkBox_GoalName");
        let p = left.querySelector("p");
        if (!p) return;

        let input = document.createElement("input");
        input.className = "GoalEditInput";
        input.type = "text";
        input.value = p.textContent;
        input.dataset.GoalValue = p.textContent;

        p.replaceWith(input);
        input.select();
        input.focus();

        let Goal_edit_delete = row.querySelector(".Goal_edit_delete");
        console.log(Goal_edit_delete);
        let EditBtn = Goal_edit_delete.querySelector(".EditGoal");
        let DltBtn = Goal_edit_delete.querySelector(".DltButton");
        EditBtn.style.display = "none";
        DltBtn.style.display = "none";

        let SaveBtn = document.createElement("button");
        SaveBtn.className = "SaveBtn";
        let CancelBtn = document.createElement("button");
        CancelBtn.className = "CancelBtn";

        SaveBtn.textContent = "✔️";
        CancelBtn.textContent = "❌";
        Goal_edit_delete.append(SaveBtn, CancelBtn);

        input.addEventListener("keydown", (ev) => {
          // console.log(ev.key);

          if (ev.key === "Enter") {
            SaveGoal(row);
          }
          if (ev.key === "Escape") {
            CanceEditGoal(row);
          }
        });
        return;
      }
      if (e.target.closest(".CancelBtn")) {
        CanceEditGoal(row);
        return;
      }
      if (e.target.closest(".SaveBtn")) {
        SaveGoal(row);
        return;
      }
    });
  }
  EditGoal();
  function SaveGoal(Goal) {
    let left = Goal.querySelector(".checkBox_GoalName");
    let input = left.querySelector(".GoalEditInput");
    if (!input) return;

    let newText = input.value.trim();
    let FinalText = newText || input.dataset.GoalValue;
    let paragraph = document.createElement("p");
    paragraph.textContent = FinalText;
    input.replaceWith(paragraph);

    const id = Goal.dataset.id;
    const idx = GoalArray.findIndex((g) => String(g.id) === String(id));
    if (idx > -1) {
      GoalArray[idx].text = FinalText;
      localStorage.setItem("Goal", JSON.stringify(GoalArray));
    }

    const actions = Goal.querySelector(".Goal_edit_delete");
    actions.querySelector(".EditGoal").style.display = "block";
    actions.querySelector(".DltButton").style.display = "block";
    actions.querySelector(".CancelBtn")?.remove();
    actions.querySelector(".SaveBtn")?.remove();
  }

  function CanceEditGoal(Goal) {
    let left = Goal.querySelector(".checkBox_GoalName");
    let GoalEditInput = left.querySelector(".GoalEditInput");

    let p = document.querySelector("p");
    p.textContent = GoalEditInput.dataset.GoalValue;
    GoalEditInput.replaceWith(p);

    let Goal_edit_delete = Goal.querySelector(".Goal_edit_delete");

    Goal_edit_delete.querySelector(".SaveBtn")?.remove();
    Goal_edit_delete.querySelector(".CancelBtn")?.remove();

    Goal_edit_delete.querySelector(".DltButton").style.display = "block";
    Goal_edit_delete.querySelector(".EditGoal").style.display = "block";
  }

  function ResetGoal() {
    const last = JSON.parse(localStorage.getItem("Goal", GoalArray));
    let getDate = new Date();
    let Year = getDate.getFullYear();
    let Month = (getDate.getMonth() + 1).toString().padStart(2, "0");
    let date = getDate.getDate().toString().padStart(2, "0");
    let fullDate = `${Year}-${Month}-${date}`;
    if (!last.some((e) => e.date === fullDate)) {
      let toady = last.filter((e) => e.date === fullDate);
      console.log(toady);

      localStorage.setItem("Goal", JSON.stringify(toady));
      let Goal_holder = document.querySelector(".Goal_holder");
      Goal_holder.innerHTML = "";
      toady.forEach((e) => Goal_holder.appendChild(RenderData(e)));
    }
  }
  ResetGoal();
}
DailyGoal();

function TimerWeather() {
  let Day_city = document.querySelector(".Day_city h1");
  let date = new Date();
  let WeeksDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let Day = WeeksDays[date.getDay()];
  let Hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  let AmPm = date.getHours();
  let Minutes = date.getMinutes();
  let seconds = date.getSeconds();
  Day_city.textContent = `${Day}:-${Hours.toString().padStart(
    2,
    "0"
  )}:${Minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}  ${AmPm > 12 ? "PM" : "AM"}`;
  // console.log(AmPm > 12 ? "PM" : "AM");
}
TimerWeather();

setInterval(() => {
  TimerWeather();
}, 1000);
console.log(3)

async function WeatherApi() {
  let ApiKey = "e5f0f6aa6321423082d111800253108";
  let city = "Ludhiana";

  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}`
    );

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    let data = await response.json();

    document.querySelector("#Temp").textContent = `Weather : ${data.current.temp_c}°C`;
    document.querySelector("#Text").textContent = data.current.condition.text;
    document.querySelector("#precip_mm").textContent = `Precipitation : ${data.current.precip_mm}`;
    document.querySelector("#wind_kph").textContent = `Winds : ${data.current.wind_kph}`;
    document.querySelector("#humidity").textContent = `Humidity : ${data.current.humidity}`;
  } catch (err) {
    console.error("Weather API failed:", err);
  }
}

WeatherApi();

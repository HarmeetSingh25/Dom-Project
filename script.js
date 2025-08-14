let Cards = document.querySelectorAll(".elem");
let Task_input = document.getElementById("Task_input");
let TaskDetail_input = document.getElementById("TaskDetail_input");
let addBtn = document.getElementById("AddTaskBtn");

let Taskhold = document.querySelector(".Taskhold");
addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  Taskhold.innerHTML += ` <div class="task">
  <h4>${Task_input.value}</h4>
  <button class="Delete-btn">Delete</button>
  </div>`;
  let Delete_btn = document.querySelectorAll(".Delete-btn");
  Delete_btn.forEach((elem,index) => {
    elem.addEventListener("click",()=>{
      Taskhold.splice(index, 1); // remove from array
Taskhold[index].remove(); // remove from UI

    })
  });

  Task_input.value = "";
  TaskDetail_input.value = "";
});

Cards.forEach((elem) => {
  elem.addEventListener("click", () => {
    // console.log(elem.id);
    Cards_FullPages[elem.id].style.display = "block";
  });
});

let close_btn = document.querySelectorAll("button");
let Cards_FullPages = document.querySelectorAll(".fullPage");
close_btn.forEach((button, index) => {
  button.addEventListener("click", () => {
    Cards_FullPages[index].style.display = "none";
  });
});

// let AddTaskBtn = document.querySelector("#AddTaskBtn");
// AddTaskBtn.addEventListener("submit", (elem) => {
// elem.preventDefault()
// });

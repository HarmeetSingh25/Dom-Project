let Cards = document.querySelectorAll(".elem");
let Cards_FullPages = document.querySelectorAll(".fullPage");
let btn = document.querySelectorAll("button");
// console.log(Cards);
Cards.forEach((elem) => {
  elem.addEventListener("click", () => {
    // console.log(elem.id);
    Cards_FullPages[elem.id].style.display = "block";
  });
});
btn.forEach((btn) => {
  console.log(btn);
  btn.addEventListener("click", () => {
// console.log(btn.id);
(Cards_FullPages[btn.id]).style.display="none"

  });
});

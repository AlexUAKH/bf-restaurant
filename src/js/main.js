import * as func from "./modules/func.js";

func.isWebp();
const collapse = document.querySelectorAll(".collapse");

let width = window.innerWidth;
console.log(width);

collapse.forEach((el) => {
  if (width < 700) el.classList.remove("open");
  else el.classList.add("open");
  el.addEventListener("click", () => {
    if (width < 700) {
      collapse.forEach((el) => el.classList.remove("open"));
      el.classList.toggle("open");
    }
  });
});

window.addEventListener("resize", () => {
  width = window.innerWidth;
});

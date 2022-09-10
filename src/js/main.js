import * as func from "./modules/func.js";

func.isWebp();
const collapse = document.querySelectorAll(".collapse");

let width = window.innerWidth;

collapse.forEach((el) => {
  if (width < 700) el.classList.remove("open");
  else el.classList.add("open");
  el.addEventListener("click", (e) => {
    if (width < 700) {
      collapse.forEach((el) => {
        if (el !== e.target) el.classList.remove("open");
      });
      el.classList.toggle("open");
    }
  });
});

window.addEventListener("resize", () => {
  width = window.innerWidth;
  if (width > 700) collapseHandler(collapse, true);
  else collapseHandler(collapse, false);
});

function collapseHandler(elements, toOpen) {
  console.log("tt: ", toOpen);
  elements.forEach((el) => {
    if (toOpen) el.classList.add("open");
    else el.classList.remove("open");
  });
}

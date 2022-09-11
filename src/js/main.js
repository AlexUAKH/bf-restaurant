import "./modules/collapseHandler.js";
import "./modules/login.js";
import { isWebp } from "./modules/webpCheck.js";

isWebp();

const itb = document.querySelectorAll(".itb");

const imgDiv = itb[0].closest(".login__img");

imgDiv.style.background = `url(${itb[0].src})`;
imgDiv.style.backgroundSize = "cover";

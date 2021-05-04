// action function imports
// import { homePage } from "./actions/homePage.js";
import { homePage } from "./actions/homePage.js";
import { register } from "./actions/register.js";
import { login } from "./actions/login.js";

// setup
const main = document.querySelector("main");
const nav = document.querySelector("nav");
homePage(main);

// header links call functions on click

nav.querySelector("#home").onclick = () => {
  homePage(main);
};

nav.querySelector("#login").onclick = () => {
  login(main);
};

nav.querySelector("#register").onclick = () => {
  register(main);
};

import display from "./modules/ui/display";
import "./style.css";
import { Home } from "./UI/home";
import { SetupScreen } from "./UI/setup-screen";
// import battleScreen from "./UI/battle-screen"; // testing

const index = document.querySelector(".index");

// INIT
Home.clickListener(() => {
  display(index, [SetupScreen.element()], true);
});

// display(index, [battleScreen().element()], true); // testing
display(index, [Home.element()]);

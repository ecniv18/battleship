import GAME from "./class/GAME";
import display from "./modules/ui/display";
import "./style.css";
import { Home } from "./UI/home";
import { SetupScreen } from "./UI/setup-screen";

const index = document.querySelector(".index");

// INIT
// players
const playerOne = GAME.playerOne;

Home.clickListener(() => {
  display(index, [SetupScreen.element()], true);
});

display(index, [Home.element()]);

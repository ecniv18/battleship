import createElement from "../modules/ui/createElement";
import display from "../modules/ui/display";
import playerBoard from "./components/player-board";
import GAME from "../class/GAME";
import battleBoard from "./components/battle-board";
import scoreBoard from "./components/scoreboard";

export default function battleScreen() {
  return {
    element: () => {
      const container = createElement({
        type: "div",
        className: "battle_screen",
      });

      const boardContainer = createElement({
        type: "div",
        className: "board_container",
      });

      display(boardContainer, [
        battleBoard(GAME.playerOne).element(),
        battleBoard(GAME.playerTwo).element(),
      ]);

      display(container, [scoreBoard().element(), boardContainer]);

      return container;
    },
  };
}

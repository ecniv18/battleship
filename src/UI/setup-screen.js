import GAME from "../class/GAME";
import createElement from "../modules/ui/createElement";
import display from "../modules/ui/display";
import listen from "../modules/ui/listen";
import playerBoard from "./components/player-board";

import { ShipContainer } from "./ship-container";

export const SetupScreen = setupScreen();

function setupScreen() {
  const element = () => {
    const container = createElement({
      type: "section",
      className: "setup_screen",
    });
    const startBattleButton = createElement({
      type: "button",
      className: "setup_screen-start_button",
      innerText: "Start Battle",
    });

    const boardContainer = createElement({
      type: "div",
      className: "setup_screen-board_container",
    });

    display(boardContainer, [
      ShipContainer.element(),
      playerBoard(GAME.playerOne).element(),
    ]);

    display(container, [startBattleButton, boardContainer]);

    return container;
  };

  return {
    element,
  };
}

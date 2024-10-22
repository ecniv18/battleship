import createElement from "../modules/ui/createElement";
import display from "../modules/ui/display";
import ship from "./components/ship-component";
import GAME from "../class/GAME";
import listen from "../modules/ui/listen";

export const ShipContainer = shipContainer(GAME.playerOne);

function shipContainer(player) {
  const element = () => {
    const container = createElement({
      type: "div",
      className: "ship_container",
    });

    (function eachShip() {
      container.innerHTML = "";
      player.ships.forEach((s) => {
        const newShip = ship(s).element();
        listen({
          element: newShip,
          type: "click",
          callbackFunction: () => {
            GAME.selectShip(GAME.playerOne.name, Number(newShip.dataset.id));
            eachShip();
          },
        }).start();

        display(container, newShip);
      });
    })();

    return container;
  };

  return {
    element,
  };
}

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
    const toggleOrientationButton = createElement({
      type: "button",
      className: "setup_screen-orientation-button",
      innerText: "Toggle Orientation",
    });

    listen({
      element: toggleOrientationButton,
      type: "click",
      callbackFunction: () => {
        if (!GAME.playerOne.selectedShip) return;
        GAME.playerOne.ships = GAME.playerOne.ships.map((ship) => {
          if (ship.id === GAME.playerOne.selectedShip.id) {
            ship.toggleOrientation();
          }
          return ship;
        });
      },
    }).start();

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
        display(container, toggleOrientationButton);
      });
    })();

    return container;
  };

  return {
    element,
  };
}

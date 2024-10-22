import GAME from "../../class/GAME";
import createElement from "../../modules/ui/createElement";
import display from "../../modules/ui/display";
import listen from "../../modules/ui/listen";

export default function playerBoard(player) {
  const container = createElement({
    type: "div",
    className: "player_board",
    dataset: [{ property: "user", value: player.name }],
  });

  return {
    element: () => {
      for (let i = 0; i < player.getGrid().length; i++) {
        for (let j = 0; j < player.getGrid().length; j++) {
          const block = createElement({
            type: "div",
            className: "block",
            dataset: [
              { property: "x", value: i },
              { property: "y", value: j },
            ],
          });
          listen({
            element: block,
            type: "mouseover",
            callbackFunction: () => {
              if (!player.selectedShip) return;
              const selectedShip = player.selectedShip;
              const blockX = Number(block.dataset.x);
              const blockY = Number(block.dataset.y);
              const blockElementsX = document.querySelectorAll(
                `div[data-x="${blockX}"]`
              );
              const blockElementsY = document.querySelectorAll(
                `div[data-y="${blockY}"]`
              );

              if (selectedShip.orientation === "horizontal") {
                for (let i = 0; i < selectedShip.length; i++) {
                  for (let j = 0; j < blockElementsX.length; j++) {
                    if (
                      blockElementsX[j].dataset.y == blockY + i &&
                      blockElementsX[j].dataset.x == blockX
                    ) {
                      blockElementsX[j].classList.add("hovered-block");
                    }
                  }
                }
              } else if (selectedShip.orientation === "vertical") {
                for (let i = 0; i < selectedShip.length; i++) {
                  for (let j = 0; j < blockElementsY.length; j++) {
                    if (
                      blockElementsY[j].dataset.x == blockX + i &&
                      blockElementsY[j].dataset.y == blockY
                    ) {
                      blockElementsY[j].classList.add("hovered-block");
                    }
                  }
                }
              }
            },
          }).start();

          listen({
            element: block,
            type: "mouseout",
            callbackFunction: () => {
              if (!player.selectedShip) return;
              const selectedShip = player.selectedShip;
              const blockX = Number(block.dataset.x);
              const blockY = Number(block.dataset.y);
              const blockElementsX = document.querySelectorAll(
                `div[data-x="${blockX}"]`
              );
              const blockElementsY = document.querySelectorAll(
                `div[data-y="${blockY}"]`
              );

              if (selectedShip.orientation === "horizontal") {
                for (let i = 0; i < selectedShip.length; i++) {
                  for (let j = 0; j < blockElementsX.length; j++) {
                    if (
                      blockElementsX[j].dataset.y == blockY + i &&
                      blockElementsX[j].dataset.x == blockX
                    ) {
                      blockElementsX[j].classList.remove("hovered-block");
                    }
                  }
                }
              } else if (selectedShip.orientation === "vertical") {
                for (let i = 0; i < selectedShip.length; i++) {
                  for (let j = 0; j < blockElementsY.length; j++) {
                    if (
                      blockElementsY[j].dataset.x == blockX + i &&
                      blockElementsY[j].dataset.y == blockY
                    ) {
                      blockElementsY[j].classList.remove("hovered-block");
                    }
                  }
                }
              }
            },
          }).start();

          listen({
            element: block,
            type: "click",
            callbackFunction: () => {
              if (!player.selectedShip) return;

              const selectedShip = player.selectedShip;
              const blockX = Number(block.dataset.x);
              const blockY = Number(block.dataset.y);

              const blockElementsX = document.querySelectorAll(
                `div[data-x="${blockX}"]`
              );
              const blockElementsY = document.querySelectorAll(
                `div[data-y="${blockY}"]`
              );

              // skips the whole deploying and styling process when overlapping ship will occur or ship will be deployed beyond the grid
              if (errorDetected(player, selectedShip, blockX, blockY)) {
                return;
              }

              GAME.deployShip(player.name, selectedShip, {
                x: blockX,
                y: blockY,
              });

              for (let i = 0; i < selectedShip.length; i++) {
                if (selectedShip.orientation === "horizontal") {
                  for (let j = 0; j < blockElementsX.length; j++) {
                    if (
                      blockElementsX[j].dataset.y == blockY + i &&
                      blockElementsX[j].dataset.x == blockX
                    ) {
                      blockElementsX[j].classList.add("occupied");
                    }
                  }
                } else if (selectedShip.orientation === "vertical") {
                  for (let j = 0; j < blockElementsY.length; j++) {
                    if (
                      blockElementsY[j].dataset.x == blockX + i &&
                      blockElementsY[j].dataset.y == blockY
                    ) {
                      blockElementsY[j].classList.add("occupied");
                    }
                  }
                }
              }
            },
          }).start();

          display(container, block);
        }
      }
      return container;
    },
  };
}

function errorDetected(player, selectedShip, blockX, blockY) {
  if (selectedShip.orientation === "horizontal") {
    if (blockY + selectedShip.length > 10) return true;
    for (let k = 0; k < selectedShip.length; k++) {
      if (player.getGrid()[blockX][blockY + k].shipId !== null) {
        return true;
      }
    }
  } else if (selectedShip.orientation === "vertical") {
    if (blockX + selectedShip.length > 10) return true;
    for (let k = 0; k < selectedShip.length; k++) {
      if (player.getGrid()[blockX + k][blockY].shipId !== null) {
        return true;
      }
    }
  }

  return false;
}

import display from "../../modules/ui/display";
import createElement from "../../modules/ui/createElement";
import GAME from "../../class/GAME";
import listen from "../../modules/ui/listen";

export default function battleBoard(player) {
  const container = createElement({
    type: "div",
    className: "player_board",
    dataset: [{ property: "user", value: player.name }],
  });

  let playerGrid = player.getGrid();
  if (player.name === GAME.playerTwo.name) {
    console.log("run");
    GAME.deployComputerShip();
    playerGrid = GAME.playerTwo.getGrid();
  }

  return {
    element: () => {
      for (let i = 0; i < playerGrid.length; i++) {
        for (let j = 0; j < playerGrid.length; j++) {
          const block = createElement({
            type: "div",
            className: "block",
            dataset: [
              { property: "x", value: i },
              { property: "y", value: j },
            ],
          });

          if (playerGrid[i][j].shipId !== null) {
            if (player.name === GAME.playerOne.name) {
              block.classList.add("occupied");
            } else {
              // block.classList.add("occupied");
            }
          }

          if (player.name === GAME.playerTwo.name) {
            listen({
              element: block,
              type: "click",
              callbackFunction: () => {
                console.log(block.dataset.x, block.dataset.y);
                GAME.attack({ x: block.dataset.x, y: block.dataset.y });
                const bxy =
                  GAME.playerTwo.getGrid()[block.dataset.x][block.dataset.y];
                if (bxy.destroyed) {
                  if (bxy.shipId !== null) {
                    switch (bxy.shipId) {
                      case 0:
                        block.style.backgroundColor = "#cbce15";
                        break;
                      case 1:
                        block.style.backgroundColor = "#153dce";
                        break;
                      case 2:
                        block.style.backgroundColor = "#ce15c2";
                        break;
                      case 3:
                        block.style.backgroundColor = "#239443";
                        break;
                      case 4:
                        block.style.backgroundColor = "#ce1515";
                        break;
                      case 5:
                        block.style.backgroundColor = "#f3f3f3";
                        break;
                    }
                  } else {
                    block.style.backgroundColor = "#333";
                  }

                  block.classList.remove("occupied");
                  if (GAME.winner) {
                    alert(GAME.winner);
                  }
                }
              },
            }).start();
          }
          display(container, block);
        }
      }

      return container;
    },
  };
}

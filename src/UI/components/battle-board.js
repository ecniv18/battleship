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
                }

                computerAttack(attackedBlocks);
                updatePlayerOneBoardUI();
                if (GAME.winner) {
                  alert(GAME.winner);
                  return;
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

const attackedBlocks = [];
function computerAttack() {
  if (GAME.winner) {
    alert(GAME.winner);
    return;
  }
  const randX = Math.floor(Math.random() * 10);
  const randY = Math.floor(Math.random() * 10);

  if (attackedBlocks.includes(`${randX}${randY}`)) {
    computerAttack();
  }

  GAME.turn = GAME.playerTwo.name;
  GAME.attack({ x: Number(randX), y: Number(randY) });
  GAME.turn = GAME.playerOne.name;
  attackedBlocks.push(`${randX}${randY}`);
}

function updatePlayerOneBoardUI(
  container = document.querySelector(`.player_board[data-user="player"]`)
) {
  const player = GAME.playerOne;
  const grid = player.getGrid();

  container.innerHTML = "";
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const block = createElement({
        type: "div",
        className: "block",
        dataset: [
          { property: "x", value: i },
          { property: "y", value: j },
        ],
      });

      const bxy = grid[block.dataset.x][block.dataset.y];

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
      } else if (bxy.shipId !== null) {
        block.style.backgroundColor = "#7c0343";
      }

      display(container, block);
    }
  }
}

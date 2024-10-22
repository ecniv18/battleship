import createElement from "../../modules/ui/createElement";
import display from "../../modules/ui/display";
import GAME from "../../class/GAME";

export default function scoreBoard() {
  const playerOne = GAME.playerOne;
  const playerTwo = GAME.playerTwo;

  let shipCounterOne = playerOne.ships.reduce((acc, curr) => {
    if (!curr.destroyed) {
      acc += 1;
    }
    return acc;
  }, 0);

  let shipCounterTwo = playerTwo.ships.reduce((acc, curr) => {
    if (!curr.destroyed) {
      acc += 1;
    }
    return acc;
  }, 0);

  const container = createElement({
    type: "div",
    className: "score_board",
  });
  const containerOne = createElement({
    type: "div",
    className: "player_one-container",
  });
  const containerTwo = createElement({
    type: "div",
    className: "player_two-container",
  });

  const nameOne = createElement({
    type: "h2",
    className: "player_one-name",
    innerText: playerOne.name,
  });
  const nameTwo = createElement({
    type: "h2",
    className: "player_two-name",
    innerText: playerTwo.name,
  });

  const counterLabelOne = createElement({
    type: "p",
    className: "player_one-counter-label",
    innerText: "Ships",
  });

  const counterLabeTwo = createElement({
    type: "p",
    className: "player_two-counter-label",
    innerText: "Ships",
  });
  const counterOne = createElement({
    type: "span",
    className: "player_one-counter",
    innerText: shipCounterOne ?? 0,
  });

  const counterTwo = createElement({
    type: "span",
    className: "player_two-counter",
    innerText: shipCounterTwo ?? 0,
  });

  return {
    element: () => {
      display(counterLabelOne, counterOne);
      display(counterLabeTwo, counterTwo);
      display(containerOne, [nameOne, counterLabelOne]);
      display(containerTwo, [nameTwo, counterLabeTwo]);
      display(container, [containerOne, containerTwo]);
      return container;
    },
  };
}

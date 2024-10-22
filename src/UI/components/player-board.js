import createElement from "../../modules/ui/createElement";
import display from "../../modules/ui/display";

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
          display(container, block);
        }
      }
      return container;
    },
  };
}

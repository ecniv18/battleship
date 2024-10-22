import createElement from "../../modules/ui/createElement";
import display from "../../modules/ui/display";

export default function ship(ship) {
  let container = createElement({
    type: "button",
    className: "ship",
    dataset: [
      {
        property: "id",
        value: ship.id,
      },
      {
        property: "selected",
        value: ship.selected,
      },
      {
        property: "placed",
        value: ship.placed,
      },
    ],
  });

  return {
    element: () => {
      for (let i = 0; i < ship.length; i++) {
        const block = createElement({
          type: "div",
          className: "ship-block",
        });

        display(container, block);
      }
      return container;
    },
  };
}

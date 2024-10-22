import createElement from "../modules/ui/createElement";
import display from "../modules/ui/display";
import listen from "../modules/ui/listen";

export const Home = home();

function home() {
  const container = createElement({
    type: "article",
    className: "greeting",
  });

  const msg = createElement({
    type: "h1",
    className: "greeting-msg",
    innerText: "The Battleship Game",
  });

  const startButton = createElement({
    type: "button",
    className: "greeting-start_btn",
    innerText: "Start Game",
  });

  const element = () => {
    display(container, [msg, startButton]);
    return container;
  };

  const clickListener = (callbackFunction, mode = "start") => {
    if (mode === "start") {
      listen({ element: startButton, type: "click", callbackFunction }).start();
    } else if (mode === "stop") {
      listen({ element: startButton, type: "click", callbackFunction }).stop();
    }
  };

  return {
    element,
    clickListener,
  };
}

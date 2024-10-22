export default function listen({ element, type, callbackFunction }) {
  const start = () => {
    element.addEventListener(type, callbackFunction);
  };

  const stop = () => {
    element.removeEventListener(type, callbackFunction);
  };

  return {
    start,
    stop,
  };
}

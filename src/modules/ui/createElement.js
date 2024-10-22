export default function createElement({
  type,
  className,
  classList,
  id,
  innerText,
  innerHTML,
  dataset,
}) {
  const element = document.createElement(type);

  if (className) element.className = className;
  if (classList) {
    if (Array.isArray(classList)) {
      classList.forEach((c) => element.classList.add(c));
    }
  }
  if (id) element.id = id;
  if (innerText) element.innerText = innerText;
  if (innerHTML) element.innerHTML = innerHTML;
  if (dataset) {
    dataset.forEach((data) => {
      element.dataset[data.property] = data.value;
    });
  }

  return element;
}

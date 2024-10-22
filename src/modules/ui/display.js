export default function display(parent, children, clear = false) {
  if (clear) parent.innerHTML = "";
  if (Array.isArray(children)) {
    children.forEach((child) => parent.appendChild(child));
  } else {
    parent.appendChild(children);
  }
}

export function myCreateElement(parentId, tagName, attributes) {
  let parent = document.getElementById(parentId);
  let elem = document.createElement(tagName);
  if (attributes) {
    elem = setAttributes(elem, attributes);
  }

  if (tagName === "label") {
    let nextSibling = document.querySelector(`#${attributes.for}`);
    parent.insertBefore(elem, nextSibling);
    return elem;
  }
  // console.log(elem);
  parent.appendChild(elem);
  return elem;
}

function setAttributes(el, attrs) {
  for (let [key, value] of Object.entries(attrs)) {
    if (key === "innerHTML") {
      el.innerHTML = value;
      continue;
    }
    el.setAttribute(key, value);
  }
  return el;
}

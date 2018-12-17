import contactForm from "./contactForm"

const domComponent = {
  createDomElement({ elementType, content = null, cssClass = "", attributes = {} }) {
    const element = document.createElement(elementType);
    element.textContent = content;
    
    if (cssClass) {
      element.classList.add(cssClass);
    }

    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    return element;
  },
    
  };
  export default domComponent

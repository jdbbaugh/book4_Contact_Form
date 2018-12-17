import contactForm from "./contactForm"
import contactList from "./contactList"
import contact from "./contact"

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
    
    if (elementType === "button" && content === "Delete Contact") {
      element.addEventListener("click", contactList.deleteContactButton);
    }

    if (elementType === "button" && content === "Show All Contacts") {
      element.addEventListener("click", contactList.showContactsButton);
    }
    
    if (elementType === "button" && content === "Collapse Contact List") {
      element.addEventListener("click", contactList.collapseContactsButton)
    }

    return element;
  },
    
  };
  export default domComponent

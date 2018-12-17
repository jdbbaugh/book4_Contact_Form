import contact from "./contact.js"
import contactCollection from "./contactCollection"
import domComponent from "./domComponent";


// component that displays all contacts. It should import the Contact component and the ContactCollection component.

const contactList = {
  displayContacts () {
    const targetContainer = document.querySelector(".output");
    targetContainer.appendChild(domComponent.createDomElement({
      elementType: "div",
      cssClass: "contact-container"
    }))
    targetContainer.appendChild(domComponent.createDomElement({
      elementType: "button",
      content: "Show All Contacts",
      cssClass: "show-contacts-button",
    }))

    // let showContacts = document.querySelector(".show-contacts-button");
    // showContacts.addEventListener("click", this.showContactsButton);
  },
  showContactsButton () {
    
    contactCollection.getAllFoods()
    .then(allContacts => {
      let contactsFragment = document.createDocumentFragment();
      allContacts.forEach(people => {
        let contactHTML = contact.contactBuilder(people);
        contactsFragment.appendChild(contactHTML);
        // console.log(contactHTML);
        const appendToDom = document.querySelector(".contact-container");
        appendToDom.appendChild(contactHTML);
        // console.log(people.id)
      })
    });
    let removeContactButton = document.querySelector(".show-contacts-button");
    removeContactButton.parentNode.removeChild(removeContactButton);
    document.querySelector(".output").appendChild(domComponent.createDomElement({
      elementType: "button",
      content: "Collapse Contact List",
      cssClass: "collapse-search"
    }))
  },
  deleteContactButton () {
    // console.log(event.target.className);
    contactCollection.deleteContact(event.target.className)
  },
  collapseContactsButton () {
    // console.log("collapse logged");
    const collapseContactContainer = document.querySelector(".contact-container");
    collapseContactContainer.parentNode.removeChild(collapseContactContainer);

    const getRidofCollapseButton = document.querySelector(".collapse-search");
    getRidofCollapseButton.parentNode.removeChild(getRidofCollapseButton);

    const rebuildContainer = document.querySelector(".output");
    rebuildContainer.appendChild(domComponent.createDomElement({
      elementType: "div",
      cssClass: "contact-container"
    }))
    
    rebuildContainer.appendChild(domComponent.createDomElement({
      elementType: "button",
      content: "Show All Contacts",
      cssClass: "show-contacts-button"
    }))
    
  }

}

export default contactList
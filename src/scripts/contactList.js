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

    let showContacts = document.querySelector(".show-contacts-button");
    showContacts.addEventListener("click", this.showContactsButton);
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
  },
  deleteContactButton () {
    // console.log(event.target.className);
    contactCollection.deleteContact(event.target.className)
  }

}

export default contactList
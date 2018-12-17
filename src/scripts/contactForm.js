// COMPLETED component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
import contactCollection from "./contactCollection"
import domComponent from "./domComponent";
const contactForm = {
  buildForm () {
    const foundationalContainer = document.querySelector(".output");
    const contactCategories = ["name", "phone-number", "address"]
    foundationalContainer.appendChild(domComponent.createDomElement({
      elementType: "form",
      attributes: {
        id: "form-container",
        class: "form"
      }
    }));
    const targetForm = document.getElementById("form-container");
    contactCategories.forEach(category => {
      targetForm.appendChild(domComponent.createDomElement({
        elementType: "p",
        content: `${category}:`
      }))
      targetForm.appendChild(domComponent.createDomElement({
        elementType: "input",
        cssClass: `${category}-input`,
      }))
    })
    targetForm.appendChild(domComponent.createDomElement({
      elementType: "button",
      content: "Save Contact",
      cssClass: "contact-save-button"
    }))
    const saveButton = document.querySelector(".contact-save-button");
    saveButton.addEventListener("click", this.saveContactToJson);
  },
  saveContactToJson () {
    let contactName = document.querySelector(".name-input");
    let contactPhone = document.querySelector(".phone-number-input");
    let contactAddress = document.querySelector(".address-input");
    // console.log(contactName.value, contactPhone.value, contactAddress.value);
    let newContact = {
      name: contactName.value,
      phone: contactPhone.value,
      address: contactAddress.value
    };
    // console.log(newContact);
    contactCollection.saveNewContact(newContact);
  }
};

export default contactForm
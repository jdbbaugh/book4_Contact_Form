import contactList from "./contactList";
import domComponent from "./domComponent";
// component that displays a person's name, phone number, and address.
const contact = {
  contactBuilder (peoplesInfo) {
    const postHere = document.createElement("article");
    postHere.setAttribute("class", `contact-${peoplesInfo.id}`)

    let contactName = document.createElement("h3");
    contactName.textContent = peoplesInfo.name;

    let contactAddress = document.createElement("p");
    contactAddress.textContent = peoplesInfo.address;

    let contactPhone = document.createElement("p");
    contactPhone.textContent = peoplesInfo.phone;

    postHere.appendChild(contactName);
    postHere.appendChild(contactAddress);
    postHere.appendChild(contactPhone);

    postHere.appendChild(domComponent.createDomElement({
      elementType: "button",
      content: "Delete Contact",
      cssClass: peoplesInfo.id
    }))

    return postHere;
  },
}

export default contact
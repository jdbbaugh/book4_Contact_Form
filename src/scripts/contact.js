import contactList from "./contactList";
import domComponent from "./domComponent";
// component that displays a person's name, phone number, and address.
const contact = {
  contactBuilder (peoplesInfo) {
    const postHere = document.createElement("article");

    let contactName = document.createElement("h3");
    contactName.textContent = peoplesInfo.name;

    let contactAddress = document.createElement("p");
    contactAddress.textContent = peoplesInfo.address

    let contactPhone = document.createElement("p");
    contactPhone.textContent = peoplesInfo.phone

    postHere.appendChild(contactName);
    postHere.appendChild(contactAddress);
    postHere.appendChild(contactPhone);

    return postHere;
  },
}

export default contact
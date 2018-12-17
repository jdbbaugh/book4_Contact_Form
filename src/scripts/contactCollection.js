const contactCollection = {
  // component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
  getAllFoods() {
    return fetch("http://localhost:8088/contacts")
    .then(response => response.json())
  },
  saveNewContact(contact) {
    // console.log("hello",contact);
    // Default options are marked with *
      return fetch("http://localhost:8088/contacts", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          // referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(contact), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
  }
}

export default contactCollection
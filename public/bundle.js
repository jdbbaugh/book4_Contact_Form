(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactList = _interopRequireDefault(require("./contactList"));

var _domComponent = _interopRequireDefault(require("./domComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// component that displays a person's name, phone number, and address.
const contact = {
  contactBuilder(peoplesInfo) {
    const postHere = document.createElement("article");
    postHere.setAttribute("class", `contact-${peoplesInfo.id}`);
    let contactName = document.createElement("h3");
    contactName.textContent = peoplesInfo.name;
    let contactAddress = document.createElement("p");
    contactAddress.textContent = peoplesInfo.address;
    let contactPhone = document.createElement("p");
    contactPhone.textContent = peoplesInfo.phone;
    postHere.appendChild(contactName);
    postHere.appendChild(contactAddress);
    postHere.appendChild(contactPhone);
    postHere.appendChild(_domComponent.default.createDomElement({
      elementType: "button",
      content: "Delete Contact",
      cssClass: peoplesInfo.id
    }));
    return postHere;
  }

};
var _default = contact;
exports.default = _default;

},{"./contactList":4,"./domComponent":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const contactCollection = {
  // component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
  getAllFoods() {
    return fetch("http://localhost:8088/contacts").then(response => response.json());
  },

  saveNewContact(contact) {
    // console.log("hello",contact);
    // Default options are marked with *
    return fetch("http://localhost:8088/contacts", {
      method: "POST",
      // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json; charset=utf-8" // "Content-Type": "application/x-www-form-urlencoded",

      },
      // referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(contact) // body data type must match "Content-Type" header

    }).then(response => response.json()); // parses response to JSON
  },

  deleteContact(contactToDelete) {
    fetch(`http://localhost:8088/contacts/${contactToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: contactToDelete
      })
    }).then(res => res.text()).then(res => alert(`you deleted ${contactToDelete}`));
    let contactToRemove = document.querySelector(`.contact-${contactToDelete}`);
    contactToRemove.parentNode.removeChild(contactToRemove);
  }

};
var _default = contactCollection;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

var _domComponent = _interopRequireDefault(require("./domComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// COMPLETED component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
const contactForm = {
  buildForm() {
    const foundationalContainer = document.querySelector(".output");
    const contactCategories = ["name", "phone-number", "address"];
    foundationalContainer.appendChild(_domComponent.default.createDomElement({
      elementType: "form",
      attributes: {
        id: "form-container",
        class: "form"
      }
    }));
    const targetForm = document.getElementById("form-container");
    contactCategories.forEach(category => {
      targetForm.appendChild(_domComponent.default.createDomElement({
        elementType: "p",
        content: `${category}:`
      }));
      targetForm.appendChild(_domComponent.default.createDomElement({
        elementType: "input",
        cssClass: `${category}-input`
      }));
    });
    targetForm.appendChild(_domComponent.default.createDomElement({
      elementType: "button",
      content: "Save Contact",
      cssClass: "contact-save-button"
    }));
    const saveButton = document.querySelector(".contact-save-button");
    saveButton.addEventListener("click", this.saveContactToJson);
  },

  saveContactToJson() {
    let contactName = document.querySelector(".name-input");
    let contactPhone = document.querySelector(".phone-number-input");
    let contactAddress = document.querySelector(".address-input"); // console.log(contactName.value, contactPhone.value, contactAddress.value);

    let newContact = {
      name: contactName.value,
      phone: contactPhone.value,
      address: contactAddress.value
    }; // console.log(newContact);

    _contactCollection.default.saveNewContact(newContact);
  }

};
var _default = contactForm;
exports.default = _default;

},{"./contactCollection":2,"./domComponent":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contact = _interopRequireDefault(require("./contact.js"));

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

var _domComponent = _interopRequireDefault(require("./domComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// component that displays all contacts. It should import the Contact component and the ContactCollection component.
const contactList = {
  displayContacts() {
    const targetContainer = document.querySelector(".output");
    targetContainer.appendChild(_domComponent.default.createDomElement({
      elementType: "div",
      cssClass: "contact-container"
    }));
    targetContainer.appendChild(_domComponent.default.createDomElement({
      elementType: "button",
      content: "Show All Contacts",
      cssClass: "show-contacts-button"
    })); // let showContacts = document.querySelector(".show-contacts-button");
    // showContacts.addEventListener("click", this.showContactsButton);
  },

  showContactsButton() {
    _contactCollection.default.getAllFoods().then(allContacts => {
      let contactsFragment = document.createDocumentFragment();
      allContacts.forEach(people => {
        let contactHTML = _contact.default.contactBuilder(people);

        contactsFragment.appendChild(contactHTML); // console.log(contactHTML);

        const appendToDom = document.querySelector(".contact-container");
        appendToDom.appendChild(contactHTML); // console.log(people.id)
      });
    });

    let removeContactButton = document.querySelector(".show-contacts-button");
    removeContactButton.parentNode.removeChild(removeContactButton);
    document.querySelector(".output").appendChild(_domComponent.default.createDomElement({
      elementType: "button",
      content: "Collapse Contact List",
      cssClass: "collapse-search"
    }));
  },

  deleteContactButton() {
    // console.log(event.target.className);
    _contactCollection.default.deleteContact(event.target.className);
  },

  collapseContactsButton() {
    // console.log("collapse logged");
    const collapseContactContainer = document.querySelector(".contact-container");
    collapseContactContainer.parentNode.removeChild(collapseContactContainer);
    const getRidofCollapseButton = document.querySelector(".collapse-search");
    getRidofCollapseButton.parentNode.removeChild(getRidofCollapseButton);
    const rebuildContainer = document.querySelector(".output");
    rebuildContainer.appendChild(_domComponent.default.createDomElement({
      elementType: "div",
      cssClass: "contact-container"
    }));
    rebuildContainer.appendChild(_domComponent.default.createDomElement({
      elementType: "button",
      content: "Show All Contacts",
      cssClass: "show-contacts-button"
    }));
  }

};
var _default = contactList;
exports.default = _default;

},{"./contact.js":1,"./contactCollection":2,"./domComponent":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactForm = _interopRequireDefault(require("./contactForm"));

var _contactList = _interopRequireDefault(require("./contactList"));

var _contact = _interopRequireDefault(require("./contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const domComponent = {
  createDomElement({
    elementType,
    content = null,
    cssClass = "",
    attributes = {}
  }) {
    const element = document.createElement(elementType);
    element.textContent = content;

    if (cssClass) {
      element.classList.add(cssClass);
    }

    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    if (elementType === "button" && content === "Delete Contact") {
      element.addEventListener("click", _contactList.default.deleteContactButton);
    }

    if (elementType === "button" && content === "Show All Contacts") {
      element.addEventListener("click", _contactList.default.showContactsButton);
    }

    if (elementType === "button" && content === "Collapse Contact List") {
      element.addEventListener("click", _contactList.default.collapseContactsButton);
    }

    return element;
  }

};
var _default = domComponent;
exports.default = _default;

},{"./contact":1,"./contactForm":3,"./contactList":4}],6:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList"));

var _contactForm = _interopRequireDefault(require("./contactForm"));

var _contact = _interopRequireDefault(require("./contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import the ContactList component and the ContactForm component.
_contactForm.default.buildForm();

_contactList.default.displayContacts();

},{"./contact":1,"./contactForm":3,"./contactList":4}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7QUFDQTs7OztBQUNBO0FBQ0EsTUFBTSxPQUFPLEdBQUc7QUFDZCxFQUFBLGNBQWMsQ0FBRSxXQUFGLEVBQWU7QUFDM0IsVUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBakI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxZQUFULENBQXNCLE9BQXRCLEVBQWdDLFdBQVUsV0FBVyxDQUFDLEVBQUcsRUFBekQ7QUFFQSxRQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFsQjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosR0FBMEIsV0FBVyxDQUFDLElBQXRDO0FBRUEsUUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBckI7QUFDQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLEdBQTZCLFdBQVcsQ0FBQyxPQUF6QztBQUVBLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQW5CO0FBQ0EsSUFBQSxZQUFZLENBQUMsV0FBYixHQUEyQixXQUFXLENBQUMsS0FBdkM7QUFFQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLFdBQXJCO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxDQUFxQixjQUFyQjtBQUNBLElBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsWUFBckI7QUFFQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLHNC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QWhCO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixHQUFzQixPQUF0Qjs7QUFFQSxRQUFJLFFBQUosRUFBYztBQUNaLE1BQUEsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsUUFBdEI7QUFDRDs7QUFFRCxTQUFLLElBQUksR0FBVCxJQUFnQixVQUFoQixFQUE0QjtBQUMxQixNQUFBLE9BQU8sQ0FBQyxZQUFSLENBQXFCLEdBQXJCLEVBQTBCLFVBQVUsQ0FBQyxHQUFELENBQXBDO0FBQ0Q7O0FBRUQsUUFBSSxXQUFXLEtBQUssUUFBaEIsSUFBNEIsT0FBTyxLQUFLLGdCQUE1QyxFQUE4RDtBQUM1RCxNQUFBLE9BQU8sQ0FBQyxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxxQkFBWSxtQkFBOUM7QUFDRDs7QUFFRCxRQUFJLFdBQVcsS0FBSyxRQUFoQixJQUE0QixPQUFPLEtBQUssbUJBQTVDLEVBQWlFO0FBQy9ELE1BQUEsT0FBTyxDQUFDLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLHFCQUFZLGtCQUE5QztBQUNEOztBQUVELFFBQUksV0FBVyxLQUFLLFFBQWhCLElBQTRCLE9BQU8sS0FBSyx1QkFBNUMsRUFBcUU7QUFDbkUsTUFBQSxPQUFPLENBQUMsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MscUJBQVksc0JBQTlDO0FBQ0Q7O0FBRUQsV0FBTyxPQUFQO0FBQ0Q7O0FBMUJrQixDQUFyQjtlQTZCaUIsWTs7Ozs7O0FDaENqQjs7QUFDQTs7QUFDQTs7OztBQUhBO0FBTUEscUJBQVksU0FBWjs7QUFDQSxxQkFBWSxlQUFaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0XCI7XG5pbXBvcnQgZG9tQ29tcG9uZW50IGZyb20gXCIuL2RvbUNvbXBvbmVudFwiO1xuLy8gY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBwZXJzb24ncyBuYW1lLCBwaG9uZSBudW1iZXIsIGFuZCBhZGRyZXNzLlxuY29uc3QgY29udGFjdCA9IHtcbiAgY29udGFjdEJ1aWxkZXIgKHBlb3BsZXNJbmZvKSB7XG4gICAgY29uc3QgcG9zdEhlcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcbiAgICBwb3N0SGVyZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgY29udGFjdC0ke3Blb3BsZXNJbmZvLmlkfWApXG5cbiAgICBsZXQgY29udGFjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgY29udGFjdE5hbWUudGV4dENvbnRlbnQgPSBwZW9wbGVzSW5mby5uYW1lO1xuXG4gICAgbGV0IGNvbnRhY3RBZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgY29udGFjdEFkZHJlc3MudGV4dENvbnRlbnQgPSBwZW9wbGVzSW5mby5hZGRyZXNzO1xuXG4gICAgbGV0IGNvbnRhY3RQaG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvbnRhY3RQaG9uZS50ZXh0Q29udGVudCA9IHBlb3BsZXNJbmZvLnBob25lO1xuXG4gICAgcG9zdEhlcmUuYXBwZW5kQ2hpbGQoY29udGFjdE5hbWUpO1xuICAgIHBvc3RIZXJlLmFwcGVuZENoaWxkKGNvbnRhY3RBZGRyZXNzKTtcbiAgICBwb3N0SGVyZS5hcHBlbmRDaGlsZChjb250YWN0UGhvbmUpO1xuXG4gICAgcG9zdEhlcmUuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBjb250ZW50OiBcIkRlbGV0ZSBDb250YWN0XCIsXG4gICAgICBjc3NDbGFzczogcGVvcGxlc0luZm8uaWRcbiAgICB9KSlcblxuICAgIHJldHVybiBwb3N0SGVyZTtcbiAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdCIsImNvbnN0IGNvbnRhY3RDb2xsZWN0aW9uID0ge1xuICAvLyBjb21wb25lbnQgdGhhdCBsb2FkcyBleGlzdGluZyBjb250YWN0cyBmcm9tIHN0b3JhZ2UsIGFuZCBzYXZlcyBuZXcgb25lcy4gRWFjaCBuZXcgY29udGFjdCBzaG91bGQgaGF2ZSBhbiBhdXRvLWdlbmVyYXRlZCBpZGVudGlmaWVyLlxuICBnZXRBbGxGb29kcygpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIilcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gIH0sXG4gIHNhdmVOZXdDb250YWN0KGNvbnRhY3QpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvXCIsY29udGFjdCk7XG4gICAgLy8gRGVmYXVsdCBvcHRpb25zIGFyZSBtYXJrZWQgd2l0aCAqXG4gICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgLy8gXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdCksIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpOyAvLyBwYXJzZXMgcmVzcG9uc2UgdG8gSlNPTlxuICB9LFxuICBkZWxldGVDb250YWN0IChjb250YWN0VG9EZWxldGUpIHtcbiAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzLyR7Y29udGFjdFRvRGVsZXRlfWAsIHtcbiAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxuICBib2R5OiBKU09OLnN0cmluZ2lmeSh7aWQ6IGNvbnRhY3RUb0RlbGV0ZX0pXG59KVxuLnRoZW4ocmVzID0+IHJlcy50ZXh0KCkpXG4udGhlbihyZXMgPT4gYWxlcnQoYHlvdSBkZWxldGVkICR7Y29udGFjdFRvRGVsZXRlfWApKVxubGV0IGNvbnRhY3RUb1JlbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb250YWN0LSR7Y29udGFjdFRvRGVsZXRlfWApXG5jb250YWN0VG9SZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjb250YWN0VG9SZW1vdmUpO1xuXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdENvbGxlY3Rpb24iLCIvLyBDT01QTEVURUQgY29tcG9uZW50IHRoYXQsIHdoZW4gZmlsbGVkIG91dCBhbmQgYSBzdWJtaXQgYnV0dG9uIGlzIHByZXNzZWQsIGFkZHMgYSBuZXcgY29udGFjdCB0byBzdG9yYWdlLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXG5pbXBvcnQgY29udGFjdENvbGxlY3Rpb24gZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIlxuaW1wb3J0IGRvbUNvbXBvbmVudCBmcm9tIFwiLi9kb21Db21wb25lbnRcIjtcbmNvbnN0IGNvbnRhY3RGb3JtID0ge1xuICBidWlsZEZvcm0gKCkge1xuICAgIGNvbnN0IGZvdW5kYXRpb25hbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0XCIpO1xuICAgIGNvbnN0IGNvbnRhY3RDYXRlZ29yaWVzID0gW1wibmFtZVwiLCBcInBob25lLW51bWJlclwiLCBcImFkZHJlc3NcIl1cbiAgICBmb3VuZGF0aW9uYWxDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiZm9ybVwiLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBpZDogXCJmb3JtLWNvbnRhaW5lclwiLFxuICAgICAgICBjbGFzczogXCJmb3JtXCJcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgY29uc3QgdGFyZ2V0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS1jb250YWluZXJcIik7XG4gICAgY29udGFjdENhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICB0YXJnZXRGb3JtLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgICAgZWxlbWVudFR5cGU6IFwicFwiLFxuICAgICAgICBjb250ZW50OiBgJHtjYXRlZ29yeX06YFxuICAgICAgfSkpXG4gICAgICB0YXJnZXRGb3JtLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgY3NzQ2xhc3M6IGAke2NhdGVnb3J5fS1pbnB1dGAsXG4gICAgICB9KSlcbiAgICB9KVxuICAgIHRhcmdldEZvcm0uYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBjb250ZW50OiBcIlNhdmUgQ29udGFjdFwiLFxuICAgICAgY3NzQ2xhc3M6IFwiY29udGFjdC1zYXZlLWJ1dHRvblwiXG4gICAgfSkpXG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFjdC1zYXZlLWJ1dHRvblwiKTtcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNhdmVDb250YWN0VG9Kc29uKTtcbiAgfSxcbiAgc2F2ZUNvbnRhY3RUb0pzb24gKCkge1xuICAgIGxldCBjb250YWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dFwiKTtcbiAgICBsZXQgY29udGFjdFBob25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5waG9uZS1udW1iZXItaW5wdXRcIik7XG4gICAgbGV0IGNvbnRhY3RBZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRyZXNzLWlucHV0XCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKGNvbnRhY3ROYW1lLnZhbHVlLCBjb250YWN0UGhvbmUudmFsdWUsIGNvbnRhY3RBZGRyZXNzLnZhbHVlKTtcbiAgICBsZXQgbmV3Q29udGFjdCA9IHtcbiAgICAgIG5hbWU6IGNvbnRhY3ROYW1lLnZhbHVlLFxuICAgICAgcGhvbmU6IGNvbnRhY3RQaG9uZS52YWx1ZSxcbiAgICAgIGFkZHJlc3M6IGNvbnRhY3RBZGRyZXNzLnZhbHVlXG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhuZXdDb250YWN0KTtcbiAgICBjb250YWN0Q29sbGVjdGlvbi5zYXZlTmV3Q29udGFjdChuZXdDb250YWN0KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm0iLCJpbXBvcnQgY29udGFjdCBmcm9tIFwiLi9jb250YWN0LmpzXCJcbmltcG9ydCBjb250YWN0Q29sbGVjdGlvbiBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiXG5pbXBvcnQgZG9tQ29tcG9uZW50IGZyb20gXCIuL2RvbUNvbXBvbmVudFwiO1xuXG5cbi8vIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFsbCBjb250YWN0cy4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXG5cbmNvbnN0IGNvbnRhY3RMaXN0ID0ge1xuICBkaXNwbGF5Q29udGFjdHMgKCkge1xuICAgIGNvbnN0IHRhcmdldENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0XCIpO1xuICAgIHRhcmdldENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21Db21wb25lbnQuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJkaXZcIixcbiAgICAgIGNzc0NsYXNzOiBcImNvbnRhY3QtY29udGFpbmVyXCJcbiAgICB9KSlcbiAgICB0YXJnZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBjb250ZW50OiBcIlNob3cgQWxsIENvbnRhY3RzXCIsXG4gICAgICBjc3NDbGFzczogXCJzaG93LWNvbnRhY3RzLWJ1dHRvblwiLFxuICAgIH0pKVxuXG4gICAgLy8gbGV0IHNob3dDb250YWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hvdy1jb250YWN0cy1idXR0b25cIik7XG4gICAgLy8gc2hvd0NvbnRhY3RzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNob3dDb250YWN0c0J1dHRvbik7XG4gIH0sXG4gIHNob3dDb250YWN0c0J1dHRvbiAoKSB7XG4gICAgXG4gICAgY29udGFjdENvbGxlY3Rpb24uZ2V0QWxsRm9vZHMoKVxuICAgIC50aGVuKGFsbENvbnRhY3RzID0+IHtcbiAgICAgIGxldCBjb250YWN0c0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgYWxsQ29udGFjdHMuZm9yRWFjaChwZW9wbGUgPT4ge1xuICAgICAgICBsZXQgY29udGFjdEhUTUwgPSBjb250YWN0LmNvbnRhY3RCdWlsZGVyKHBlb3BsZSk7XG4gICAgICAgIGNvbnRhY3RzRnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29udGFjdEhUTUwpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250YWN0SFRNTCk7XG4gICAgICAgIGNvbnN0IGFwcGVuZFRvRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWN0LWNvbnRhaW5lclwiKTtcbiAgICAgICAgYXBwZW5kVG9Eb20uYXBwZW5kQ2hpbGQoY29udGFjdEhUTUwpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwZW9wbGUuaWQpXG4gICAgICB9KVxuICAgIH0pO1xuICAgIGxldCByZW1vdmVDb250YWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaG93LWNvbnRhY3RzLWJ1dHRvblwiKTtcbiAgICByZW1vdmVDb250YWN0QnV0dG9uLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlQ29udGFjdEJ1dHRvbik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBjb250ZW50OiBcIkNvbGxhcHNlIENvbnRhY3QgTGlzdFwiLFxuICAgICAgY3NzQ2xhc3M6IFwiY29sbGFwc2Utc2VhcmNoXCJcbiAgICB9KSlcbiAgfSxcbiAgZGVsZXRlQ29udGFjdEJ1dHRvbiAoKSB7XG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSk7XG4gICAgY29udGFjdENvbGxlY3Rpb24uZGVsZXRlQ29udGFjdChldmVudC50YXJnZXQuY2xhc3NOYW1lKVxuICB9LFxuICBjb2xsYXBzZUNvbnRhY3RzQnV0dG9uICgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNvbGxhcHNlIGxvZ2dlZFwiKTtcbiAgICBjb25zdCBjb2xsYXBzZUNvbnRhY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhY3QtY29udGFpbmVyXCIpO1xuICAgIGNvbGxhcHNlQ29udGFjdENvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNvbGxhcHNlQ29udGFjdENvbnRhaW5lcik7XG5cbiAgICBjb25zdCBnZXRSaWRvZkNvbGxhcHNlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb2xsYXBzZS1zZWFyY2hcIik7XG4gICAgZ2V0Umlkb2ZDb2xsYXBzZUJ1dHRvbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGdldFJpZG9mQ29sbGFwc2VCdXR0b24pO1xuXG4gICAgY29uc3QgcmVidWlsZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0XCIpO1xuICAgIHJlYnVpbGRDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiZGl2XCIsXG4gICAgICBjc3NDbGFzczogXCJjb250YWN0LWNvbnRhaW5lclwiXG4gICAgfSkpXG4gICAgXG4gICAgcmVidWlsZENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21Db21wb25lbnQuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJidXR0b25cIixcbiAgICAgIGNvbnRlbnQ6IFwiU2hvdyBBbGwgQ29udGFjdHNcIixcbiAgICAgIGNzc0NsYXNzOiBcInNob3ctY29udGFjdHMtYnV0dG9uXCJcbiAgICB9KSlcbiAgICBcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RMaXN0IiwiaW1wb3J0IGNvbnRhY3RGb3JtIGZyb20gXCIuL2NvbnRhY3RGb3JtXCJcbmltcG9ydCBjb250YWN0TGlzdCBmcm9tIFwiLi9jb250YWN0TGlzdFwiXG5pbXBvcnQgY29udGFjdCBmcm9tIFwiLi9jb250YWN0XCJcblxuY29uc3QgZG9tQ29tcG9uZW50ID0ge1xuICBjcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGUsIGNvbnRlbnQgPSBudWxsLCBjc3NDbGFzcyA9IFwiXCIsIGF0dHJpYnV0ZXMgPSB7fSB9KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgIFxuICAgIGlmIChjc3NDbGFzcykge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbWVudFR5cGUgPT09IFwiYnV0dG9uXCIgJiYgY29udGVudCA9PT0gXCJEZWxldGUgQ29udGFjdFwiKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb250YWN0TGlzdC5kZWxldGVDb250YWN0QnV0dG9uKTtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudFR5cGUgPT09IFwiYnV0dG9uXCIgJiYgY29udGVudCA9PT0gXCJTaG93IEFsbCBDb250YWN0c1wiKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb250YWN0TGlzdC5zaG93Q29udGFjdHNCdXR0b24pO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbWVudFR5cGUgPT09IFwiYnV0dG9uXCIgJiYgY29udGVudCA9PT0gXCJDb2xsYXBzZSBDb250YWN0IExpc3RcIikge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY29udGFjdExpc3QuY29sbGFwc2VDb250YWN0c0J1dHRvbilcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcbiAgICBcbiAgfTtcbiAgZXhwb3J0IGRlZmF1bHQgZG9tQ29tcG9uZW50XG4iLCIvLyBpbXBvcnQgdGhlIENvbnRhY3RMaXN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RGb3JtIGNvbXBvbmVudC5cbmltcG9ydCBjb250YWN0TGlzdCBmcm9tIFwiLi9jb250YWN0TGlzdFwiXG5pbXBvcnQgY29udGFjdEZvcm0gZnJvbSBcIi4vY29udGFjdEZvcm1cIlxuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiO1xuXG5cbmNvbnRhY3RGb3JtLmJ1aWxkRm9ybSgpXG5jb250YWN0TGlzdC5kaXNwbGF5Q29udGFjdHMoKSJdfQ==

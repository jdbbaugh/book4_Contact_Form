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
    }));
    let showContacts = document.querySelector(".show-contacts-button");
    showContacts.addEventListener("click", this.showContactsButton);
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
  },

  deleteContactButton() {
    // console.log(event.target.className);
    _contactCollection.default.deleteContact(event.target.className);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7QUFDQTs7OztBQUNBO0FBQ0EsTUFBTSxPQUFPLEdBQUc7QUFDZCxFQUFBLGNBQWMsQ0FBRSxXQUFGLEVBQWU7QUFDM0IsVUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBakI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxZQUFULENBQXNCLE9BQXRCLEVBQWdDLFdBQVUsV0FBVyxDQUFDLEVBQUcsRUFBekQ7QUFFQSxRQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFsQjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosR0FBMEIsV0FBVyxDQUFDLElBQXRDO0FBRUEsUUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBckI7QUFDQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLEdBQTZCLFdBQVcsQ0FBQyxPQUF6QztBQUVBLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQW5CO0FBQ0EsSUFBQSxZQUFZLENBQUMsV0FBYixHQUEyQixXQUFXLENBQUMsS0FBdkM7QUFFQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLFdBQXJCO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxDQUFxQixjQUFyQjtBQUNBLElBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsWUFBckI7QUFFQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLHNC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SUFBQSxPQUFPLEdBQUcsSUFBekI7QUFBK0IsSUFBQSxRQUFRLEdBQUcsRUFBMUM7QUFBOEMsSUFBQSxVQUFVLEdBQUc7QUFBM0QsR0FBRCxFQUFrRTtBQUNoRixVQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixDQUFoQjtBQUNBLElBQUEsT0FBTyxDQUFDLFdBQVIsR0FBc0IsT0FBdEI7O0FBRUEsUUFBSSxRQUFKLEVBQWM7QUFDWixNQUFBLE9BQU8sQ0FBQyxTQUFSLENBQWtCLEdBQWxCLENBQXNCLFFBQXRCO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJLEdBQVQsSUFBZ0IsVUFBaEIsRUFBNEI7QUFDMUIsTUFBQSxPQUFPLENBQUMsWUFBUixDQUFxQixHQUFyQixFQUEwQixVQUFVLENBQUMsR0FBRCxDQUFwQztBQUNEOztBQUVELFFBQUksV0FBVyxLQUFLLFFBQWhCLElBQTRCLE9BQU8sS0FBSyxnQkFBNUMsRUFBOEQ7QUFDNUQsTUFBQSxPQUFPLENBQUMsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MscUJBQVksbUJBQTlDO0FBQ0Q7O0FBQ0QsV0FBTyxPQUFQO0FBQ0Q7O0FBakJrQixDQUFyQjtlQW9CaUIsWTs7Ozs7O0FDdkJqQjs7QUFDQTs7QUFDQTs7OztBQUhBO0FBTUEscUJBQVksU0FBWjs7QUFDQSxxQkFBWSxlQUFaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0XCI7XG5pbXBvcnQgZG9tQ29tcG9uZW50IGZyb20gXCIuL2RvbUNvbXBvbmVudFwiO1xuLy8gY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBwZXJzb24ncyBuYW1lLCBwaG9uZSBudW1iZXIsIGFuZCBhZGRyZXNzLlxuY29uc3QgY29udGFjdCA9IHtcbiAgY29udGFjdEJ1aWxkZXIgKHBlb3BsZXNJbmZvKSB7XG4gICAgY29uc3QgcG9zdEhlcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcbiAgICBwb3N0SGVyZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgY29udGFjdC0ke3Blb3BsZXNJbmZvLmlkfWApXG5cbiAgICBsZXQgY29udGFjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgY29udGFjdE5hbWUudGV4dENvbnRlbnQgPSBwZW9wbGVzSW5mby5uYW1lO1xuXG4gICAgbGV0IGNvbnRhY3RBZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgY29udGFjdEFkZHJlc3MudGV4dENvbnRlbnQgPSBwZW9wbGVzSW5mby5hZGRyZXNzO1xuXG4gICAgbGV0IGNvbnRhY3RQaG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvbnRhY3RQaG9uZS50ZXh0Q29udGVudCA9IHBlb3BsZXNJbmZvLnBob25lO1xuXG4gICAgcG9zdEhlcmUuYXBwZW5kQ2hpbGQoY29udGFjdE5hbWUpO1xuICAgIHBvc3RIZXJlLmFwcGVuZENoaWxkKGNvbnRhY3RBZGRyZXNzKTtcbiAgICBwb3N0SGVyZS5hcHBlbmRDaGlsZChjb250YWN0UGhvbmUpO1xuXG4gICAgcG9zdEhlcmUuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBjb250ZW50OiBcIkRlbGV0ZSBDb250YWN0XCIsXG4gICAgICBjc3NDbGFzczogcGVvcGxlc0luZm8uaWRcbiAgICB9KSlcblxuICAgIHJldHVybiBwb3N0SGVyZTtcbiAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdCIsImNvbnN0IGNvbnRhY3RDb2xsZWN0aW9uID0ge1xuICAvLyBjb21wb25lbnQgdGhhdCBsb2FkcyBleGlzdGluZyBjb250YWN0cyBmcm9tIHN0b3JhZ2UsIGFuZCBzYXZlcyBuZXcgb25lcy4gRWFjaCBuZXcgY29udGFjdCBzaG91bGQgaGF2ZSBhbiBhdXRvLWdlbmVyYXRlZCBpZGVudGlmaWVyLlxuICBnZXRBbGxGb29kcygpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIilcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gIH0sXG4gIHNhdmVOZXdDb250YWN0KGNvbnRhY3QpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvXCIsY29udGFjdCk7XG4gICAgLy8gRGVmYXVsdCBvcHRpb25zIGFyZSBtYXJrZWQgd2l0aCAqXG4gICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgLy8gXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdCksIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpOyAvLyBwYXJzZXMgcmVzcG9uc2UgdG8gSlNPTlxuICB9LFxuICBkZWxldGVDb250YWN0IChjb250YWN0VG9EZWxldGUpIHtcbiAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzLyR7Y29udGFjdFRvRGVsZXRlfWAsIHtcbiAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxuICBib2R5OiBKU09OLnN0cmluZ2lmeSh7aWQ6IGNvbnRhY3RUb0RlbGV0ZX0pXG59KVxuLnRoZW4ocmVzID0+IHJlcy50ZXh0KCkpXG4udGhlbihyZXMgPT4gYWxlcnQoYHlvdSBkZWxldGVkICR7Y29udGFjdFRvRGVsZXRlfWApKVxubGV0IGNvbnRhY3RUb1JlbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb250YWN0LSR7Y29udGFjdFRvRGVsZXRlfWApXG5jb250YWN0VG9SZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjb250YWN0VG9SZW1vdmUpO1xuXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdENvbGxlY3Rpb24iLCIvLyBDT01QTEVURUQgY29tcG9uZW50IHRoYXQsIHdoZW4gZmlsbGVkIG91dCBhbmQgYSBzdWJtaXQgYnV0dG9uIGlzIHByZXNzZWQsIGFkZHMgYSBuZXcgY29udGFjdCB0byBzdG9yYWdlLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXG5pbXBvcnQgY29udGFjdENvbGxlY3Rpb24gZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIlxuaW1wb3J0IGRvbUNvbXBvbmVudCBmcm9tIFwiLi9kb21Db21wb25lbnRcIjtcbmNvbnN0IGNvbnRhY3RGb3JtID0ge1xuICBidWlsZEZvcm0gKCkge1xuICAgIGNvbnN0IGZvdW5kYXRpb25hbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0XCIpO1xuICAgIGNvbnN0IGNvbnRhY3RDYXRlZ29yaWVzID0gW1wibmFtZVwiLCBcInBob25lLW51bWJlclwiLCBcImFkZHJlc3NcIl1cbiAgICBmb3VuZGF0aW9uYWxDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiZm9ybVwiLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBpZDogXCJmb3JtLWNvbnRhaW5lclwiLFxuICAgICAgICBjbGFzczogXCJmb3JtXCJcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgY29uc3QgdGFyZ2V0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS1jb250YWluZXJcIik7XG4gICAgY29udGFjdENhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICB0YXJnZXRGb3JtLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgICAgZWxlbWVudFR5cGU6IFwicFwiLFxuICAgICAgICBjb250ZW50OiBgJHtjYXRlZ29yeX06YFxuICAgICAgfSkpXG4gICAgICB0YXJnZXRGb3JtLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgY3NzQ2xhc3M6IGAke2NhdGVnb3J5fS1pbnB1dGAsXG4gICAgICB9KSlcbiAgICB9KVxuICAgIHRhcmdldEZvcm0uYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBjb250ZW50OiBcIlNhdmUgQ29udGFjdFwiLFxuICAgICAgY3NzQ2xhc3M6IFwiY29udGFjdC1zYXZlLWJ1dHRvblwiXG4gICAgfSkpXG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFjdC1zYXZlLWJ1dHRvblwiKTtcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNhdmVDb250YWN0VG9Kc29uKTtcbiAgfSxcbiAgc2F2ZUNvbnRhY3RUb0pzb24gKCkge1xuICAgIGxldCBjb250YWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dFwiKTtcbiAgICBsZXQgY29udGFjdFBob25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5waG9uZS1udW1iZXItaW5wdXRcIik7XG4gICAgbGV0IGNvbnRhY3RBZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRyZXNzLWlucHV0XCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKGNvbnRhY3ROYW1lLnZhbHVlLCBjb250YWN0UGhvbmUudmFsdWUsIGNvbnRhY3RBZGRyZXNzLnZhbHVlKTtcbiAgICBsZXQgbmV3Q29udGFjdCA9IHtcbiAgICAgIG5hbWU6IGNvbnRhY3ROYW1lLnZhbHVlLFxuICAgICAgcGhvbmU6IGNvbnRhY3RQaG9uZS52YWx1ZSxcbiAgICAgIGFkZHJlc3M6IGNvbnRhY3RBZGRyZXNzLnZhbHVlXG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhuZXdDb250YWN0KTtcbiAgICBjb250YWN0Q29sbGVjdGlvbi5zYXZlTmV3Q29udGFjdChuZXdDb250YWN0KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm0iLCJpbXBvcnQgY29udGFjdCBmcm9tIFwiLi9jb250YWN0LmpzXCJcbmltcG9ydCBjb250YWN0Q29sbGVjdGlvbiBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiXG5pbXBvcnQgZG9tQ29tcG9uZW50IGZyb20gXCIuL2RvbUNvbXBvbmVudFwiO1xuXG4vLyBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhbGwgY29udGFjdHMuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxuXG5jb25zdCBjb250YWN0TGlzdCA9IHtcbiAgZGlzcGxheUNvbnRhY3RzICgpIHtcbiAgICBjb25zdCB0YXJnZXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dFwiKTtcbiAgICB0YXJnZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiZGl2XCIsXG4gICAgICBjc3NDbGFzczogXCJjb250YWN0LWNvbnRhaW5lclwiXG4gICAgfSkpXG4gICAgdGFyZ2V0Q29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImJ1dHRvblwiLFxuICAgICAgY29udGVudDogXCJTaG93IEFsbCBDb250YWN0c1wiLFxuICAgICAgY3NzQ2xhc3M6IFwic2hvdy1jb250YWN0cy1idXR0b25cIixcbiAgICB9KSlcblxuICAgIGxldCBzaG93Q29udGFjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNob3ctY29udGFjdHMtYnV0dG9uXCIpO1xuICAgIHNob3dDb250YWN0cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zaG93Q29udGFjdHNCdXR0b24pO1xuICB9LFxuICBzaG93Q29udGFjdHNCdXR0b24gKCkge1xuICAgIFxuICAgIGNvbnRhY3RDb2xsZWN0aW9uLmdldEFsbEZvb2RzKClcbiAgICAudGhlbihhbGxDb250YWN0cyA9PiB7XG4gICAgICBsZXQgY29udGFjdHNGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgIGFsbENvbnRhY3RzLmZvckVhY2gocGVvcGxlID0+IHtcbiAgICAgICAgbGV0IGNvbnRhY3RIVE1MID0gY29udGFjdC5jb250YWN0QnVpbGRlcihwZW9wbGUpO1xuICAgICAgICBjb250YWN0c0ZyYWdtZW50LmFwcGVuZENoaWxkKGNvbnRhY3RIVE1MKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29udGFjdEhUTUwpO1xuICAgICAgICBjb25zdCBhcHBlbmRUb0RvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFjdC1jb250YWluZXJcIik7XG4gICAgICAgIGFwcGVuZFRvRG9tLmFwcGVuZENoaWxkKGNvbnRhY3RIVE1MKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGVvcGxlLmlkKVxuICAgICAgfSlcbiAgICB9KTtcbiAgfSxcbiAgZGVsZXRlQ29udGFjdEJ1dHRvbiAoKSB7XG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSk7XG4gICAgY29udGFjdENvbGxlY3Rpb24uZGVsZXRlQ29udGFjdChldmVudC50YXJnZXQuY2xhc3NOYW1lKVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdExpc3QiLCJpbXBvcnQgY29udGFjdEZvcm0gZnJvbSBcIi4vY29udGFjdEZvcm1cIlxuaW1wb3J0IGNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0XCJcbmltcG9ydCBjb250YWN0IGZyb20gXCIuL2NvbnRhY3RcIlxuXG5jb25zdCBkb21Db21wb25lbnQgPSB7XG4gIGNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZSwgY29udGVudCA9IG51bGwsIGNzc0NsYXNzID0gXCJcIiwgYXR0cmlidXRlcyA9IHt9IH0pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgXG4gICAgaWYgKGNzc0NsYXNzKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxuICAgIFxuICAgIGlmIChlbGVtZW50VHlwZSA9PT0gXCJidXR0b25cIiAmJiBjb250ZW50ID09PSBcIkRlbGV0ZSBDb250YWN0XCIpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNvbnRhY3RMaXN0LmRlbGV0ZUNvbnRhY3RCdXR0b24pO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcbiAgICBcbiAgfTtcbiAgZXhwb3J0IGRlZmF1bHQgZG9tQ29tcG9uZW50XG4iLCIvLyBpbXBvcnQgdGhlIENvbnRhY3RMaXN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RGb3JtIGNvbXBvbmVudC5cbmltcG9ydCBjb250YWN0TGlzdCBmcm9tIFwiLi9jb250YWN0TGlzdFwiXG5pbXBvcnQgY29udGFjdEZvcm0gZnJvbSBcIi4vY29udGFjdEZvcm1cIlxuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiO1xuXG5cbmNvbnRhY3RGb3JtLmJ1aWxkRm9ybSgpXG5jb250YWN0TGlzdC5kaXNwbGF5Q29udGFjdHMoKSJdfQ==

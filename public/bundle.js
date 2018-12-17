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
    let contactName = document.createElement("h3");
    contactName.textContent = peoplesInfo.name;
    let contactAddress = document.createElement("p");
    contactAddress.textContent = peoplesInfo.address;
    let contactPhone = document.createElement("p");
    contactPhone.textContent = peoplesInfo.phone;
    postHere.appendChild(contactName);
    postHere.appendChild(contactAddress);
    postHere.appendChild(contactPhone);
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

        contactsFragment.appendChild(contactHTML);
        console.log(contactHTML);
        const appendToDom = document.querySelector(".contact-container");
        appendToDom.appendChild(contactHTML);
      });
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7QUFDQTs7OztBQUNBO0FBQ0EsTUFBTSxPQUFPLEdBQUc7QUFDZCxFQUFBLGNBQWMsQ0FBRSxXQUFGLEVBQWU7QUFDM0IsVUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBakI7QUFFQSxRQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFsQjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosR0FBMEIsV0FBVyxDQUFDLElBQXRDO0FBRUEsUUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBckI7QUFDQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLEdBQTZCLFdBQVcsQ0FBQyxPQUF6QztBQUVBLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQW5CO0FBQ0EsSUFBQSxZQUFZLENBQUMsV0FBYixHQUEyQixXQUFXLENBQUMsS0FBdkM7QUFFQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLFdBQXJCO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxDQUFxQixjQUFyQjtBQUNBLElBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsWUFBckI7QUFFQSxXQUFPLFFBQVA7QUFDRDs7QUFsQmEsQ0FBaEI7ZUFxQmUsTzs7Ozs7Ozs7OztBQ3hCZixNQUFNLGlCQUFpQixHQUFHO0FBQ3hCO0FBQ0EsRUFBQSxXQUFXLEdBQUc7QUFD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LEtBVkQ7QUFXRDs7QUE3QmlCLENBQXBCO2VBa0NlLFc7Ozs7Ozs7Ozs7O0FDeENmOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxZQUFZLEdBQUc7QUFDbkIsRUFBQSxnQkFBZ0IsQ0FBQztBQUFFLElBQUEsV0FBRjtBQUFlLElBQUEsT0FBTyxHQUFHLElBQXpCO0FBQStCLElBQUEsUUFBUSxHQUFHLEVBQTFDO0FBQThDLElBQUEsVUFBVSxHQUFHO0FBQTNELEdBQUQsRUFBa0U7QUFDaEYsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBaEI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLE9BQXRCOztBQUVBLFFBQUksUUFBSixFQUFjO0FBQ1osTUFBQSxPQUFPLENBQUMsU0FBUixDQUFrQixHQUFsQixDQUFzQixRQUF0QjtBQUNEOztBQUVELFNBQUssSUFBSSxHQUFULElBQWdCLFVBQWhCLEVBQTRCO0FBQzFCLE1BQUEsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsR0FBckIsRUFBMEIsVUFBVSxDQUFDLEdBQUQsQ0FBcEM7QUFDRDs7QUFDRCxXQUFPLE9BQVA7QUFDRDs7QUFia0IsQ0FBckI7ZUFnQmlCLFk7Ozs7OztBQ25CakI7O0FBQ0E7O0FBQ0E7Ozs7QUFIQTtBQU1BLHFCQUFZLFNBQVo7O0FBQ0EscUJBQVksZUFBWiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBjb250YWN0TGlzdCBmcm9tIFwiLi9jb250YWN0TGlzdFwiO1xuaW1wb3J0IGRvbUNvbXBvbmVudCBmcm9tIFwiLi9kb21Db21wb25lbnRcIjtcbi8vIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGEgcGVyc29uJ3MgbmFtZSwgcGhvbmUgbnVtYmVyLCBhbmQgYWRkcmVzcy5cbmNvbnN0IGNvbnRhY3QgPSB7XG4gIGNvbnRhY3RCdWlsZGVyIChwZW9wbGVzSW5mbykge1xuICAgIGNvbnN0IHBvc3RIZXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XG5cbiAgICBsZXQgY29udGFjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgY29udGFjdE5hbWUudGV4dENvbnRlbnQgPSBwZW9wbGVzSW5mby5uYW1lO1xuXG4gICAgbGV0IGNvbnRhY3RBZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgY29udGFjdEFkZHJlc3MudGV4dENvbnRlbnQgPSBwZW9wbGVzSW5mby5hZGRyZXNzXG5cbiAgICBsZXQgY29udGFjdFBob25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgY29udGFjdFBob25lLnRleHRDb250ZW50ID0gcGVvcGxlc0luZm8ucGhvbmVcblxuICAgIHBvc3RIZXJlLmFwcGVuZENoaWxkKGNvbnRhY3ROYW1lKTtcbiAgICBwb3N0SGVyZS5hcHBlbmRDaGlsZChjb250YWN0QWRkcmVzcyk7XG4gICAgcG9zdEhlcmUuYXBwZW5kQ2hpbGQoY29udGFjdFBob25lKTtcblxuICAgIHJldHVybiBwb3N0SGVyZTtcbiAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdCIsImNvbnN0IGNvbnRhY3RDb2xsZWN0aW9uID0ge1xuICAvLyBjb21wb25lbnQgdGhhdCBsb2FkcyBleGlzdGluZyBjb250YWN0cyBmcm9tIHN0b3JhZ2UsIGFuZCBzYXZlcyBuZXcgb25lcy4gRWFjaCBuZXcgY29udGFjdCBzaG91bGQgaGF2ZSBhbiBhdXRvLWdlbmVyYXRlZCBpZGVudGlmaWVyLlxuICBnZXRBbGxGb29kcygpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIilcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gIH0sXG4gIHNhdmVOZXdDb250YWN0KGNvbnRhY3QpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvXCIsY29udGFjdCk7XG4gICAgLy8gRGVmYXVsdCBvcHRpb25zIGFyZSBtYXJrZWQgd2l0aCAqXG4gICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgLy8gXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdCksIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpOyAvLyBwYXJzZXMgcmVzcG9uc2UgdG8gSlNPTlxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RDb2xsZWN0aW9uIiwiLy8gQ09NUExFVEVEIGNvbXBvbmVudCB0aGF0LCB3aGVuIGZpbGxlZCBvdXQgYW5kIGEgc3VibWl0IGJ1dHRvbiBpcyBwcmVzc2VkLCBhZGRzIGEgbmV3IGNvbnRhY3QgdG8gc3RvcmFnZS4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxuaW1wb3J0IGNvbnRhY3RDb2xsZWN0aW9uIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCJcbmltcG9ydCBkb21Db21wb25lbnQgZnJvbSBcIi4vZG9tQ29tcG9uZW50XCI7XG5jb25zdCBjb250YWN0Rm9ybSA9IHtcbiAgYnVpbGRGb3JtICgpIHtcbiAgICBjb25zdCBmb3VuZGF0aW9uYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dFwiKTtcbiAgICBjb25zdCBjb250YWN0Q2F0ZWdvcmllcyA9IFtcIm5hbWVcIiwgXCJwaG9uZS1udW1iZXJcIiwgXCJhZGRyZXNzXCJdXG4gICAgZm91bmRhdGlvbmFsQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImZvcm1cIixcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaWQ6IFwiZm9ybS1jb250YWluZXJcIixcbiAgICAgICAgY2xhc3M6IFwiZm9ybVwiXG4gICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnN0IHRhcmdldEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm0tY29udGFpbmVyXCIpO1xuICAgIGNvbnRhY3RDYXRlZ29yaWVzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xuICAgICAgdGFyZ2V0Rm9ybS5hcHBlbmRDaGlsZChkb21Db21wb25lbnQuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICAgIGVsZW1lbnRUeXBlOiBcInBcIixcbiAgICAgICAgY29udGVudDogYCR7Y2F0ZWdvcnl9OmBcbiAgICAgIH0pKVxuICAgICAgdGFyZ2V0Rm9ybS5hcHBlbmRDaGlsZChkb21Db21wb25lbnQuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICAgIGVsZW1lbnRUeXBlOiBcImlucHV0XCIsXG4gICAgICAgIGNzc0NsYXNzOiBgJHtjYXRlZ29yeX0taW5wdXRgLFxuICAgICAgfSkpXG4gICAgfSlcbiAgICB0YXJnZXRGb3JtLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImJ1dHRvblwiLFxuICAgICAgY29udGVudDogXCJTYXZlIENvbnRhY3RcIixcbiAgICAgIGNzc0NsYXNzOiBcImNvbnRhY3Qtc2F2ZS1idXR0b25cIlxuICAgIH0pKVxuICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhY3Qtc2F2ZS1idXR0b25cIik7XG4gICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zYXZlQ29udGFjdFRvSnNvbik7XG4gIH0sXG4gIHNhdmVDb250YWN0VG9Kc29uICgpIHtcbiAgICBsZXQgY29udGFjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtaW5wdXRcIik7XG4gICAgbGV0IGNvbnRhY3RQaG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvbmUtbnVtYmVyLWlucHV0XCIpO1xuICAgIGxldCBjb250YWN0QWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkcmVzcy1pbnB1dFwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhjb250YWN0TmFtZS52YWx1ZSwgY29udGFjdFBob25lLnZhbHVlLCBjb250YWN0QWRkcmVzcy52YWx1ZSk7XG4gICAgbGV0IG5ld0NvbnRhY3QgPSB7XG4gICAgICBuYW1lOiBjb250YWN0TmFtZS52YWx1ZSxcbiAgICAgIHBob25lOiBjb250YWN0UGhvbmUudmFsdWUsXG4gICAgICBhZGRyZXNzOiBjb250YWN0QWRkcmVzcy52YWx1ZVxuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2cobmV3Q29udGFjdCk7XG4gICAgY29udGFjdENvbGxlY3Rpb24uc2F2ZU5ld0NvbnRhY3QobmV3Q29udGFjdCk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RGb3JtIiwiaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdC5qc1wiXG5pbXBvcnQgY29udGFjdENvbGxlY3Rpb24gZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIlxuaW1wb3J0IGRvbUNvbXBvbmVudCBmcm9tIFwiLi9kb21Db21wb25lbnRcIjtcblxuLy8gY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYWxsIGNvbnRhY3RzLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cblxuY29uc3QgY29udGFjdExpc3QgPSB7XG4gIGRpc3BsYXlDb250YWN0cyAoKSB7XG4gICAgY29uc3QgdGFyZ2V0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRcIik7XG4gICAgdGFyZ2V0Q29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImRpdlwiLFxuICAgICAgY3NzQ2xhc3M6IFwiY29udGFjdC1jb250YWluZXJcIlxuICAgIH0pKVxuICAgIHRhcmdldENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21Db21wb25lbnQuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJidXR0b25cIixcbiAgICAgIGNvbnRlbnQ6IFwiU2hvdyBBbGwgQ29udGFjdHNcIixcbiAgICAgIGNzc0NsYXNzOiBcInNob3ctY29udGFjdHMtYnV0dG9uXCIsXG4gICAgfSkpXG5cbiAgICBsZXQgc2hvd0NvbnRhY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaG93LWNvbnRhY3RzLWJ1dHRvblwiKTtcbiAgICBzaG93Q29udGFjdHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2hvd0NvbnRhY3RzQnV0dG9uKTtcbiAgfSxcbiAgc2hvd0NvbnRhY3RzQnV0dG9uICgpIHtcbiAgICBcbiAgICBjb250YWN0Q29sbGVjdGlvbi5nZXRBbGxGb29kcygpXG4gICAgLnRoZW4oYWxsQ29udGFjdHMgPT4ge1xuICAgICAgbGV0IGNvbnRhY3RzRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBhbGxDb250YWN0cy5mb3JFYWNoKHBlb3BsZSA9PiB7XG4gICAgICAgIGxldCBjb250YWN0SFRNTCA9IGNvbnRhY3QuY29udGFjdEJ1aWxkZXIocGVvcGxlKTtcbiAgICAgICAgY29udGFjdHNGcmFnbWVudC5hcHBlbmRDaGlsZChjb250YWN0SFRNTCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbnRhY3RIVE1MKTtcbiAgICAgICAgY29uc3QgYXBwZW5kVG9Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhY3QtY29udGFpbmVyXCIpO1xuICAgICAgICBhcHBlbmRUb0RvbS5hcHBlbmRDaGlsZChjb250YWN0SFRNTCk7XG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBjb250YWN0TGlzdCIsImltcG9ydCBjb250YWN0Rm9ybSBmcm9tIFwiLi9jb250YWN0Rm9ybVwiXG5pbXBvcnQgY29udGFjdExpc3QgZnJvbSBcIi4vY29udGFjdExpc3RcIlxuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiXG5cbmNvbnN0IGRvbUNvbXBvbmVudCA9IHtcbiAgY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlLCBjb250ZW50ID0gbnVsbCwgY3NzQ2xhc3MgPSBcIlwiLCBhdHRyaWJ1dGVzID0ge30gfSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICBcbiAgICBpZiAoY3NzQ2xhc3MpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG4gICAgXG4gIH07XG4gIGV4cG9ydCBkZWZhdWx0IGRvbUNvbXBvbmVudFxuIiwiLy8gaW1wb3J0IHRoZSBDb250YWN0TGlzdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Rm9ybSBjb21wb25lbnQuXG5pbXBvcnQgY29udGFjdExpc3QgZnJvbSBcIi4vY29udGFjdExpc3RcIlxuaW1wb3J0IGNvbnRhY3RGb3JtIGZyb20gXCIuL2NvbnRhY3RGb3JtXCJcbmltcG9ydCBjb250YWN0IGZyb20gXCIuL2NvbnRhY3RcIjtcblxuXG5jb250YWN0Rm9ybS5idWlsZEZvcm0oKVxuY29udGFjdExpc3QuZGlzcGxheUNvbnRhY3RzKCkiXX0=

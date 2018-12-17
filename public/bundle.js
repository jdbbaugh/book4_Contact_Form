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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7QUFDQTs7OztBQUNBO0FBQ0EsTUFBTSxPQUFPLEdBQUc7QUFDZCxFQUFBLGNBQWMsQ0FBRSxXQUFGLEVBQWU7QUFDM0IsVUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBakI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxZQUFULENBQXNCLE9BQXRCLEVBQWdDLFdBQVUsV0FBVyxDQUFDLEVBQUcsRUFBekQ7QUFFQSxRQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFsQjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosR0FBMEIsV0FBVyxDQUFDLElBQXRDO0FBRUEsUUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBckI7QUFDQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLEdBQTZCLFdBQVcsQ0FBQyxPQUF6QztBQUVBLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQW5CO0FBQ0EsSUFBQSxZQUFZLENBQUMsV0FBYixHQUEyQixXQUFXLENBQUMsS0FBdkM7QUFFQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLFdBQXJCO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxDQUFxQixjQUFyQjtBQUNBLElBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsWUFBckI7QUFFQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLHNC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SSxXQUFXLEdBQUcsaUJBQVEsY0FBUixDQUF1QixNQUF2QixDQUFsQjs7QUFDQSxRQUFBLGdCQUFnQixDQUFDLFdBQWpCLENBQTZCLFdBQTdCO0FBQ0EsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFdBQVo7QUFDQSxjQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixvQkFBdkIsQ0FBcEI7QUFDQSxRQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLFdBQXhCO0FBQ0QsT0FORDtBQU9ELEtBVkQ7QUFXRDs7QUE3QmlCLENBQXBCO2VBa0NlLFc7Ozs7Ozs7Ozs7O0FDeENmOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxZQUFZLEdBQUc7QUFDbkIsRUFBQSxnQkFBZ0IsQ0FBQztBQUFFLElBQUEsV0FBRjtBQUFlLElBQUEsT0FBTyxHQUFHLElBQXpCO0FBQStCLElBQUEsUUFBUSxHQUFHLEVBQTFDO0FBQThDLElBQUEsVUFBVSxHQUFHO0FBQTNELEdBQUQsRUFBa0U7QUFDaEYsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBaEI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLE9BQXRCOztBQUVBLFFBQUksUUFBSixFQUFjO0FBQ1osTUFBQSxPQUFPLENBQUMsU0FBUixDQUFrQixHQUFsQixDQUFzQixRQUF0QjtBQUNEOztBQUVELFNBQUssSUFBSSxHQUFULElBQWdCLFVBQWhCLEVBQTRCO0FBQzFCLE1BQUEsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsR0FBckIsRUFBMEIsVUFBVSxDQUFDLEdBQUQsQ0FBcEM7QUFDRDs7QUFDRCxXQUFPLE9BQVA7QUFDRDs7QUFia0IsQ0FBckI7ZUFnQmlCLFk7Ozs7OztBQ25CakI7O0FBQ0E7O0FBQ0E7Ozs7QUFIQTtBQU1BLHFCQUFZLFNBQVo7O0FBQ0EscUJBQVksZUFBWiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBjb250YWN0TGlzdCBmcm9tIFwiLi9jb250YWN0TGlzdFwiO1xuaW1wb3J0IGRvbUNvbXBvbmVudCBmcm9tIFwiLi9kb21Db21wb25lbnRcIjtcbi8vIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGEgcGVyc29uJ3MgbmFtZSwgcGhvbmUgbnVtYmVyLCBhbmQgYWRkcmVzcy5cbmNvbnN0IGNvbnRhY3QgPSB7XG4gIGNvbnRhY3RCdWlsZGVyIChwZW9wbGVzSW5mbykge1xuICAgIGNvbnN0IHBvc3RIZXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XG4gICAgcG9zdEhlcmUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYGNvbnRhY3QtJHtwZW9wbGVzSW5mby5pZH1gKVxuXG4gICAgbGV0IGNvbnRhY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIGNvbnRhY3ROYW1lLnRleHRDb250ZW50ID0gcGVvcGxlc0luZm8ubmFtZTtcblxuICAgIGxldCBjb250YWN0QWRkcmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvbnRhY3RBZGRyZXNzLnRleHRDb250ZW50ID0gcGVvcGxlc0luZm8uYWRkcmVzcztcblxuICAgIGxldCBjb250YWN0UGhvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBjb250YWN0UGhvbmUudGV4dENvbnRlbnQgPSBwZW9wbGVzSW5mby5waG9uZTtcblxuICAgIHBvc3RIZXJlLmFwcGVuZENoaWxkKGNvbnRhY3ROYW1lKTtcbiAgICBwb3N0SGVyZS5hcHBlbmRDaGlsZChjb250YWN0QWRkcmVzcyk7XG4gICAgcG9zdEhlcmUuYXBwZW5kQ2hpbGQoY29udGFjdFBob25lKTtcblxuICAgIHBvc3RIZXJlLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImJ1dHRvblwiLFxuICAgICAgY29udGVudDogXCJEZWxldGUgQ29udGFjdFwiLFxuICAgICAgY3NzQ2xhc3M6IHBlb3BsZXNJbmZvLmlkXG4gICAgfSkpXG5cbiAgICByZXR1cm4gcG9zdEhlcmU7XG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3QiLCJjb25zdCBjb250YWN0Q29sbGVjdGlvbiA9IHtcbiAgLy8gY29tcG9uZW50IHRoYXQgbG9hZHMgZXhpc3RpbmcgY29udGFjdHMgZnJvbSBzdG9yYWdlLCBhbmQgc2F2ZXMgbmV3IG9uZXMuIEVhY2ggbmV3IGNvbnRhY3Qgc2hvdWxkIGhhdmUgYW4gYXV0by1nZW5lcmF0ZWQgaWRlbnRpZmllci5cbiAgZ2V0QWxsRm9vZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICB9LFxuICBzYXZlTmV3Q29udGFjdChjb250YWN0KSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJoZWxsb1wiLGNvbnRhY3QpO1xuICAgIC8vIERlZmF1bHQgb3B0aW9ucyBhcmUgbWFya2VkIHdpdGggKlxuICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIsIHtcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyBuby1yZWZlcnJlciwgKmNsaWVudFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3QpLCAvLyBib2R5IGRhdGEgdHlwZSBtdXN0IG1hdGNoIFwiQ29udGVudC1UeXBlXCIgaGVhZGVyXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTsgLy8gcGFyc2VzIHJlc3BvbnNlIHRvIEpTT05cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb250YWN0Q29sbGVjdGlvbiIsIi8vIENPTVBMRVRFRCBjb21wb25lbnQgdGhhdCwgd2hlbiBmaWxsZWQgb3V0IGFuZCBhIHN1Ym1pdCBidXR0b24gaXMgcHJlc3NlZCwgYWRkcyBhIG5ldyBjb250YWN0IHRvIHN0b3JhZ2UuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cbmltcG9ydCBjb250YWN0Q29sbGVjdGlvbiBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiXG5pbXBvcnQgZG9tQ29tcG9uZW50IGZyb20gXCIuL2RvbUNvbXBvbmVudFwiO1xuY29uc3QgY29udGFjdEZvcm0gPSB7XG4gIGJ1aWxkRm9ybSAoKSB7XG4gICAgY29uc3QgZm91bmRhdGlvbmFsQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRcIik7XG4gICAgY29uc3QgY29udGFjdENhdGVnb3JpZXMgPSBbXCJuYW1lXCIsIFwicGhvbmUtbnVtYmVyXCIsIFwiYWRkcmVzc1wiXVxuICAgIGZvdW5kYXRpb25hbENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21Db21wb25lbnQuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJmb3JtXCIsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGlkOiBcImZvcm0tY29udGFpbmVyXCIsXG4gICAgICAgIGNsYXNzOiBcImZvcm1cIlxuICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zdCB0YXJnZXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtLWNvbnRhaW5lclwiKTtcbiAgICBjb250YWN0Q2F0ZWdvcmllcy5mb3JFYWNoKGNhdGVnb3J5ID0+IHtcbiAgICAgIHRhcmdldEZvcm0uYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgICBlbGVtZW50VHlwZTogXCJwXCIsXG4gICAgICAgIGNvbnRlbnQ6IGAke2NhdGVnb3J5fTpgXG4gICAgICB9KSlcbiAgICAgIHRhcmdldEZvcm0uYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgICBlbGVtZW50VHlwZTogXCJpbnB1dFwiLFxuICAgICAgICBjc3NDbGFzczogYCR7Y2F0ZWdvcnl9LWlucHV0YCxcbiAgICAgIH0pKVxuICAgIH0pXG4gICAgdGFyZ2V0Rm9ybS5hcHBlbmRDaGlsZChkb21Db21wb25lbnQuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJidXR0b25cIixcbiAgICAgIGNvbnRlbnQ6IFwiU2F2ZSBDb250YWN0XCIsXG4gICAgICBjc3NDbGFzczogXCJjb250YWN0LXNhdmUtYnV0dG9uXCJcbiAgICB9KSlcbiAgICBjb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWN0LXNhdmUtYnV0dG9uXCIpO1xuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2F2ZUNvbnRhY3RUb0pzb24pO1xuICB9LFxuICBzYXZlQ29udGFjdFRvSnNvbiAoKSB7XG4gICAgbGV0IGNvbnRhY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYW1lLWlucHV0XCIpO1xuICAgIGxldCBjb250YWN0UGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBob25lLW51bWJlci1pbnB1dFwiKTtcbiAgICBsZXQgY29udGFjdEFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZHJlc3MtaW5wdXRcIik7XG4gICAgLy8gY29uc29sZS5sb2coY29udGFjdE5hbWUudmFsdWUsIGNvbnRhY3RQaG9uZS52YWx1ZSwgY29udGFjdEFkZHJlc3MudmFsdWUpO1xuICAgIGxldCBuZXdDb250YWN0ID0ge1xuICAgICAgbmFtZTogY29udGFjdE5hbWUudmFsdWUsXG4gICAgICBwaG9uZTogY29udGFjdFBob25lLnZhbHVlLFxuICAgICAgYWRkcmVzczogY29udGFjdEFkZHJlc3MudmFsdWVcbiAgICB9O1xuICAgIC8vIGNvbnNvbGUubG9nKG5ld0NvbnRhY3QpO1xuICAgIGNvbnRhY3RDb2xsZWN0aW9uLnNhdmVOZXdDb250YWN0KG5ld0NvbnRhY3QpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb250YWN0Rm9ybSIsImltcG9ydCBjb250YWN0IGZyb20gXCIuL2NvbnRhY3QuanNcIlxuaW1wb3J0IGNvbnRhY3RDb2xsZWN0aW9uIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCJcbmltcG9ydCBkb21Db21wb25lbnQgZnJvbSBcIi4vZG9tQ29tcG9uZW50XCI7XG5cbi8vIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFsbCBjb250YWN0cy4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXG5cbmNvbnN0IGNvbnRhY3RMaXN0ID0ge1xuICBkaXNwbGF5Q29udGFjdHMgKCkge1xuICAgIGNvbnN0IHRhcmdldENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0XCIpO1xuICAgIHRhcmdldENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21Db21wb25lbnQuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJkaXZcIixcbiAgICAgIGNzc0NsYXNzOiBcImNvbnRhY3QtY29udGFpbmVyXCJcbiAgICB9KSlcbiAgICB0YXJnZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBjb250ZW50OiBcIlNob3cgQWxsIENvbnRhY3RzXCIsXG4gICAgICBjc3NDbGFzczogXCJzaG93LWNvbnRhY3RzLWJ1dHRvblwiLFxuICAgIH0pKVxuXG4gICAgbGV0IHNob3dDb250YWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hvdy1jb250YWN0cy1idXR0b25cIik7XG4gICAgc2hvd0NvbnRhY3RzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNob3dDb250YWN0c0J1dHRvbik7XG4gIH0sXG4gIHNob3dDb250YWN0c0J1dHRvbiAoKSB7XG4gICAgXG4gICAgY29udGFjdENvbGxlY3Rpb24uZ2V0QWxsRm9vZHMoKVxuICAgIC50aGVuKGFsbENvbnRhY3RzID0+IHtcbiAgICAgIGxldCBjb250YWN0c0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgYWxsQ29udGFjdHMuZm9yRWFjaChwZW9wbGUgPT4ge1xuICAgICAgICBsZXQgY29udGFjdEhUTUwgPSBjb250YWN0LmNvbnRhY3RCdWlsZGVyKHBlb3BsZSk7XG4gICAgICAgIGNvbnRhY3RzRnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29udGFjdEhUTUwpO1xuICAgICAgICBjb25zb2xlLmxvZyhjb250YWN0SFRNTCk7XG4gICAgICAgIGNvbnN0IGFwcGVuZFRvRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWN0LWNvbnRhaW5lclwiKTtcbiAgICAgICAgYXBwZW5kVG9Eb20uYXBwZW5kQ2hpbGQoY29udGFjdEhUTUwpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udGFjdExpc3QiLCJpbXBvcnQgY29udGFjdEZvcm0gZnJvbSBcIi4vY29udGFjdEZvcm1cIlxuaW1wb3J0IGNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0XCJcbmltcG9ydCBjb250YWN0IGZyb20gXCIuL2NvbnRhY3RcIlxuXG5jb25zdCBkb21Db21wb25lbnQgPSB7XG4gIGNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZSwgY29udGVudCA9IG51bGwsIGNzc0NsYXNzID0gXCJcIiwgYXR0cmlidXRlcyA9IHt9IH0pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgXG4gICAgaWYgKGNzc0NsYXNzKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuICAgIFxuICB9O1xuICBleHBvcnQgZGVmYXVsdCBkb21Db21wb25lbnRcbiIsIi8vIGltcG9ydCB0aGUgQ29udGFjdExpc3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdEZvcm0gY29tcG9uZW50LlxuaW1wb3J0IGNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0XCJcbmltcG9ydCBjb250YWN0Rm9ybSBmcm9tIFwiLi9jb250YWN0Rm9ybVwiXG5pbXBvcnQgY29udGFjdCBmcm9tIFwiLi9jb250YWN0XCI7XG5cblxuY29udGFjdEZvcm0uYnVpbGRGb3JtKClcbmNvbnRhY3RMaXN0LmRpc3BsYXlDb250YWN0cygpIl19

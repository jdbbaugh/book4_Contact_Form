(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// component that displays a person's name, phone number, and address.
const contact = {};
var _default = contact;
exports.default = _default;

},{}],2:[function(require,module,exports){
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

// component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
const contactForm = {
  buildForm() {
    const foundationalContainer = document.querySelector(".output");
    const contactCategories = ["name", "phone-number", "address"];
    foundationalContainer.appendChild(_domComponent.default.createDomElement({
      elementType: "div",
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

    contactName.value = "";
    contactPhone.value = "";
    contactAddress.value = "";
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// component that displays all contacts. It should import the Contact component and the ContactCollection component.
const contactList = {};
var _default = contactList;
exports.default = _default;

},{"./contact.js":1,"./contactCollection":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactForm = _interopRequireDefault(require("./contactForm"));

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

},{"./contactForm":3}],6:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList"));

var _contactForm = _interopRequireDefault(require("./contactForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import the ContactList component and the ContactForm component.
_contactForm.default.buildForm();

},{"./contactForm":3,"./contactList":4}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0EsTUFBTSxPQUFPLEdBQUcsRUFBaEI7ZUFJZSxPOzs7Ozs7Ozs7O0FDTGYsTUFBTSxpQkFBaUIsR0FBRztBQUN4QjtBQUNBLEVBQUEsV0FBVyxHQUFHO0FBQ1osV0FBTyxLQUFLLENBQUMsZ0NBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUQsR0FMdUI7O0FBTXhCLEVBQUEsY0FBYyxDQUFDLE9BQUQsRUFBVTtBQUN0QjtBQUNBO0FBQ0UsV0FBTyxLQUFLLENBQUMsZ0NBQUQsRUFBbUM7QUFDM0MsTUFBQSxNQUFNLEVBQUUsTUFEbUM7QUFDM0I7QUFDaEIsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0IsaUNBRFgsQ0FFTDs7QUFGSyxPQUZrQztBQU0zQztBQUNBLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZixDQVBxQyxDQU9aOztBQVBZLEtBQW5DLENBQUwsQ0FTTixJQVRNLENBU0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBVFgsQ0FBUCxDQUhvQixDQVlnQjtBQUN2Qzs7QUFuQnVCLENBQTFCO2VBc0JlLGlCOzs7Ozs7Ozs7OztBQ3JCZjs7QUFDQTs7OztBQUZBO0FBR0EsTUFBTSxXQUFXLEdBQUc7QUFDbEIsRUFBQSxTQUFTLEdBQUk7QUFDWCxVQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNB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QWhCLEVBQTRCO0FBQzFCLE1BQUEsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsR0FBckIsRUFBMEIsVUFBVSxDQUFDLEdBQUQsQ0FBcEM7QUFDRDs7QUFDRCxXQUFPLE9BQVA7QUFDRDs7QUFia0IsQ0FBckI7ZUFnQmlCLFk7Ozs7OztBQ2pCakI7O0FBQ0E7Ozs7QUFGQTtBQUtBLHFCQUFZLFNBQVoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhIHBlcnNvbidzIG5hbWUsIHBob25lIG51bWJlciwgYW5kIGFkZHJlc3MuXG5jb25zdCBjb250YWN0ID0ge1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3QiLCJjb25zdCBjb250YWN0Q29sbGVjdGlvbiA9IHtcbiAgLy8gY29tcG9uZW50IHRoYXQgbG9hZHMgZXhpc3RpbmcgY29udGFjdHMgZnJvbSBzdG9yYWdlLCBhbmQgc2F2ZXMgbmV3IG9uZXMuIEVhY2ggbmV3IGNvbnRhY3Qgc2hvdWxkIGhhdmUgYW4gYXV0by1nZW5lcmF0ZWQgaWRlbnRpZmllci5cbiAgZ2V0QWxsRm9vZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICB9LFxuICBzYXZlTmV3Q29udGFjdChjb250YWN0KSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJoZWxsb1wiLGNvbnRhY3QpO1xuICAgIC8vIERlZmF1bHQgb3B0aW9ucyBhcmUgbWFya2VkIHdpdGggKlxuICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIsIHtcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyBuby1yZWZlcnJlciwgKmNsaWVudFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3QpLCAvLyBib2R5IGRhdGEgdHlwZSBtdXN0IG1hdGNoIFwiQ29udGVudC1UeXBlXCIgaGVhZGVyXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTsgLy8gcGFyc2VzIHJlc3BvbnNlIHRvIEpTT05cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb250YWN0Q29sbGVjdGlvbiIsIi8vIGNvbXBvbmVudCB0aGF0LCB3aGVuIGZpbGxlZCBvdXQgYW5kIGEgc3VibWl0IGJ1dHRvbiBpcyBwcmVzc2VkLCBhZGRzIGEgbmV3IGNvbnRhY3QgdG8gc3RvcmFnZS4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxuaW1wb3J0IGNvbnRhY3RDb2xsZWN0aW9uIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCJcbmltcG9ydCBkb21Db21wb25lbnQgZnJvbSBcIi4vZG9tQ29tcG9uZW50XCI7XG5jb25zdCBjb250YWN0Rm9ybSA9IHtcbiAgYnVpbGRGb3JtICgpIHtcbiAgICBjb25zdCBmb3VuZGF0aW9uYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dFwiKTtcbiAgICBjb25zdCBjb250YWN0Q2F0ZWdvcmllcyA9IFtcIm5hbWVcIiwgXCJwaG9uZS1udW1iZXJcIiwgXCJhZGRyZXNzXCJdXG4gICAgZm91bmRhdGlvbmFsQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImRpdlwiLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBpZDogXCJmb3JtLWNvbnRhaW5lclwiLFxuICAgICAgICBjbGFzczogXCJmb3JtXCJcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgY29uc3QgdGFyZ2V0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS1jb250YWluZXJcIik7XG4gICAgY29udGFjdENhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICB0YXJnZXRGb3JtLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgICAgZWxlbWVudFR5cGU6IFwicFwiLFxuICAgICAgICBjb250ZW50OiBgJHtjYXRlZ29yeX06YFxuICAgICAgfSkpXG4gICAgICB0YXJnZXRGb3JtLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudC5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgY3NzQ2xhc3M6IGAke2NhdGVnb3J5fS1pbnB1dGAsXG4gICAgICB9KSlcbiAgICB9KVxuICAgIHRhcmdldEZvcm0uYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50LmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBjb250ZW50OiBcIlNhdmUgQ29udGFjdFwiLFxuICAgICAgY3NzQ2xhc3M6IFwiY29udGFjdC1zYXZlLWJ1dHRvblwiXG4gICAgfSkpXG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFjdC1zYXZlLWJ1dHRvblwiKTtcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNhdmVDb250YWN0VG9Kc29uKTtcbiAgfSxcbiAgc2F2ZUNvbnRhY3RUb0pzb24gKCkge1xuICAgIGxldCBjb250YWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS1pbnB1dFwiKTtcbiAgICBsZXQgY29udGFjdFBob25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5waG9uZS1udW1iZXItaW5wdXRcIik7XG4gICAgbGV0IGNvbnRhY3RBZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRyZXNzLWlucHV0XCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKGNvbnRhY3ROYW1lLnZhbHVlLCBjb250YWN0UGhvbmUudmFsdWUsIGNvbnRhY3RBZGRyZXNzLnZhbHVlKTtcbiAgICBsZXQgbmV3Q29udGFjdCA9IHtcbiAgICAgIG5hbWU6IGNvbnRhY3ROYW1lLnZhbHVlLFxuICAgICAgcGhvbmU6IGNvbnRhY3RQaG9uZS52YWx1ZSxcbiAgICAgIGFkZHJlc3M6IGNvbnRhY3RBZGRyZXNzLnZhbHVlXG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhuZXdDb250YWN0KTtcbiAgICBjb250YWN0Q29sbGVjdGlvbi5zYXZlTmV3Q29udGFjdChuZXdDb250YWN0KTtcbiAgICBjb250YWN0TmFtZS52YWx1ZSA9IFwiXCI7XG4gICAgY29udGFjdFBob25lLnZhbHVlID0gXCJcIjtcbiAgICBjb250YWN0QWRkcmVzcy52YWx1ZSA9IFwiXCI7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RGb3JtIiwiaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdC5qc1wiXG5pbXBvcnQgY29udGFjdENvbGxlY3Rpb24gZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIlxuXG4vLyBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhbGwgY29udGFjdHMuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxuXG5jb25zdCBjb250YWN0TGlzdCA9IHtcblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RMaXN0IiwiaW1wb3J0IGNvbnRhY3RGb3JtIGZyb20gXCIuL2NvbnRhY3RGb3JtXCJcblxuY29uc3QgZG9tQ29tcG9uZW50ID0ge1xuICBjcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGUsIGNvbnRlbnQgPSBudWxsLCBjc3NDbGFzcyA9IFwiXCIsIGF0dHJpYnV0ZXMgPSB7fSB9KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgIFxuICAgIGlmIChjc3NDbGFzcykge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcbiAgICBcbiAgfTtcbiAgZXhwb3J0IGRlZmF1bHQgZG9tQ29tcG9uZW50XG4iLCIvLyBpbXBvcnQgdGhlIENvbnRhY3RMaXN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RGb3JtIGNvbXBvbmVudC5cbmltcG9ydCBjb250YWN0TGlzdCBmcm9tIFwiLi9jb250YWN0TGlzdFwiXG5pbXBvcnQgY29udGFjdEZvcm0gZnJvbSBcIi4vY29udGFjdEZvcm1cIlxuXG5cbmNvbnRhY3RGb3JtLmJ1aWxkRm9ybSgpIl19

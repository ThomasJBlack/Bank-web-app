import { myCreateElement } from "./helpers/myCreateElement.js";
import { setUser, user } from "./login.js";

export async function register(main) {
  // html setup
  main.querySelector("#parentId").remove(); // remove container and all children
  let parent = myCreateElement(main.id, "div", { id: "parentId" }); // recreate fresh container

  const registerForm = createForm(parent);

  (await parent).onsubmit = registerToApiCallback;
}

function createForm(parent) {
  let form = myCreateElement(parent.id, "form", {
    id: "registerFormId",
  });
  let userSection = myCreateElement(form.id, "p", { id: "userP" });
  let userInput = myCreateElement(userSection.id, "input", {
    id: "userInputId",
    name: "user",
    type: "text",
    minlength: "8",
    pattern: "^[a-zA-Z0-9]*$",
    required: true,
  });

  let userLabel = myCreateElement(userSection.id, "label", {
    id: "userLabelId",
    type: "text",
    innerHTML: "Username:",
    for: "userInputId",
  });
  // validation
  userInput.onblur = () => {
    if (!userInput.checkValidity()) {
      userInput.style.border = "thin solid red";
      // alert(document.querySelector("userErrorBoxId") === null); // true
      if (document.querySelector("#userErrorBoxId") === null) {
        let userErrorBox = myCreateElement("userP", "div", {
          id: "userErrorBoxId",
        });
      }
      console.log(userInput);
      myCreateElement("userErrorBoxId", "div", {
        id: "error",
        innerHTML:
          "Username must be at least 8 characters long and only letters or numbers",
      });
    } else {
      userInput.style.border = "thin solid green";
      // remove the box of errors. (might have more then one error in it)

      if (document.querySelector("#userErrorBoxId") !== null) {
        document.querySelector("#userErrorBoxId").remove();
      }
    }
  };

  // currency input
  let currencySection = myCreateElement(form.id, "p", { id: "currencyP" });
  let currencySelect = myCreateElement(currencySection.id, "select", {
    id: "currencySelectId",
    name: "currency",
    required: true,
  });
  let dollorOption = myCreateElement(currencySelect.id, "option", {
    innerHTML: "$",
  });
  let poundOption = myCreateElement(currencySelect.id, "option", {
    innerHTML: "£",
  });
  let euroOption = myCreateElement(currencySelect.id, "option", {
    innerHTML: "€",
  });
  let rubleOption = myCreateElement(currencySelect.id, "option", {
    innerHTML: "₽",
  });
  let shekelOption = myCreateElement(currencySelect.id, "option", {
    innerHTML: "₪",
  });
  let currencyLabel = myCreateElement(currencySection.id, "label", {
    id: "currencyLabelId",
    type: "text",
    innerHTML: "Currency:",
    for: "currencySelectId",
  });

  // description input
  let descriptionSection = myCreateElement(form.id, "p", {
    id: "descriptionP",
  });
  let descriptionInput = myCreateElement(descriptionSection.id, "textarea", {
    id: "descriptionId",
    name: "description",
    placeholder: "What is this account for?",
    required: true,
  });
  let descriptionLabel = myCreateElement(descriptionSection.id, "label", {
    for: "descriptionId",
    innerHTML: "Description: ",
  });
  // validation
  descriptionInput.onblur = () => {
    if (!descriptionInput.checkValidity()) {
      descriptionInput.style.border = "thin solid red";
      // alert(document.querySelector("userErrorBoxId") === null); // true
      if (document.querySelector("#descriptionErrorBoxId") === null) {
        let descriptionErrorBox = myCreateElement("descriptionP", "div", {
          id: "descriptionErrorBoxId",
        });
      }
      myCreateElement("descriptionErrorBoxId", "div", {
        id: "error",
        innerHTML: "Please enter a description of this account.",
      });
    } else {
      descriptionInput.style.border = "thin solid green";
      // remove the box of errors. (might have more then one error in it)

      if (document.querySelector("#descriptionErrorBoxId") !== null) {
        document.querySelector("#descriptionErrorBoxId").remove();
      }
    }
  };

  // balance input
  let balanceSection = myCreateElement(form.id, "p", {
    id: "balanceP",
  });
  let balanceInput = myCreateElement(balanceSection.id, "input", {
    id: "balanceId",
    name: "balance",
    type: "number",
    min: "50",
    placeholder: "50+",
    step: "0.01",
    required: true,
  });
  let balanceLabel = myCreateElement(balanceSection.id, "label", {
    for: "balanceId",
    innerHTML: "Initial balance: ",
  });
  // validation
  balanceInput.onblur = () => {
    if (!balanceInput.checkValidity()) {
      balanceInput.style.border = "thin solid red";
      // alert(document.querySelector("userErrorBoxId") === null); // true
      if (document.querySelector("#balanceErrorBoxId") === null) {
        let descriptionErrorBox = myCreateElement("balanceP", "div", {
          id: "balanceErrorBoxId",
        });
      }
      myCreateElement("balanceErrorBoxId", "div", {
        id: "error",
        innerHTML:
          "Balance must be at least 50. Only numbers with two floating numbers! e.g. 50.75.",
      });
    } else {
      balanceInput.style.border = "thin solid green";
      // remove the box of errors. (might have more then one error in it)

      if (document.querySelector("#balanceErrorBoxId") !== null) {
        document.querySelector("#balanceErrorBoxId").remove();
      }
    }
  };

  // submit button
  let submitButton = myCreateElement(form.id, "button", {
    innerHTML: "Register",
  });
}

async function registerToApiCallback(event) {
  // event handling
  event.preventDefault();
  console.log("Event prevented");
  // data prep
  const form = document.querySelector("#registerFormId");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const jsonData = JSON.stringify(data);
  //send request to api
  let userData = createAccount(jsonData);

  userData = JSON.parse(userData);
  setUser(userData);
}

async function createAccount(account) {
  console.log(account);
  try {
    const response = await fetch("//localhost:5000/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: account,
    });
    return await response.json();
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

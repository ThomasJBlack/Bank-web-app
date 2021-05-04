import { myCreateElement } from "./helpers/myCreateElement.js";

export let user;

export async function login(main) {
  main.querySelector("#parentId").remove(); // remove container and all children
  let parent = myCreateElement(main.id, "div", { id: "parentId" }); // recreate fresh container

  const loginForm = createForm(parent);

  (await parent).onsubmit = registerToApiCallback;
}

function createForm(parent) {
  let form = myCreateElement(parent.id, "form", {
    id: "loginFormId",
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
  // submit button
  let submitButton = myCreateElement(form.id, "button", {
    innerHTML: "Login",
  });
}

async function registerToApiCallback(event) {
  // event handling
  event.preventDefault();
  console.log("Event prevented");
  // data prep
  const form = document.querySelector("#loginFormId");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  //send request to api
  setUser(data);
}
export async function setUser(data) {
  user = await getAccount(data.user);
}

async function getAccount(account) {
  try {
    console.log(account);
    const response = await fetch(`//localhost:5000/api/accounts/${account}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

import { myCreateElement } from "./helpers/myCreateElement.js";

export async function homePage(main) {
  // html setup
  main.querySelector("#parentId").remove(); // remove container and all children
  let parent = myCreateElement(main.id, "div", {
    id: "parentId",
    innerHTML:
      "Welcome to the home page!\nSelect an action to take from above.",
  }); // recreate fresh container
}

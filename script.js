const search = document.querySelector("input");
const button = document.querySelector("button");
const ul = document.querySelector("ul");

button.addEventListener("click", (event) => {
  event.preventDefault();
  let newTask = document.createElement("LI");
  newTask.textContent = search.value;
  ul.append(newTask);
  search.value = "";
});


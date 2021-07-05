tasks = null;
myAddForm = document.querySelector("#form-div form");
let showHide = document.querySelector("#showHide");
form_div = document.querySelector("#form-div");
p = document.querySelector("#content-wrapper");

const getAllTasks = () => {
  try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!Array.isArray(tasks)) throw new Error();
  } catch (e) {
    tasks = [];
  }
};
const createCustomElements = function (
  parent,
  elementTag,
  classes,
  textContent,
  attributes
) {
  myNewElement = document.createElement(elementTag);
  myNewElement.classList = classes;
  myNewElement.textContent = textContent;
  attributes.forEach((attr) => {
    myNewElement.setAttribute(attr.attrName, attr.attrValue);
  });
  parent.appendChild(myNewElement);
  return myNewElement;
};
changeStatus = (index) => {
  let allDivs = document.querySelectorAll(".x");
  allDivs[index].classList.toggle("bg-warning");
  allDivs[index].classList.toggle("bg-primary");
  tasks[index].status = !tasks[index].status;
  saveAllTasks(tasks);
};
showSingleTask = (element, i) => {
  const mainDiv = createCustomElements(p, "div", "col-4 p-3 y", "", []);
  const mainDiv2 = createCustomElements(
    mainDiv,
    "div",
    "border border-3 border-primary m-3 p-3 x",
    "",
    []
  );
  element.status
    ? mainDiv2.classList.add("bg-warning")
    : mainDiv2.classList.add("bg-primary");
  createCustomElements(mainDiv2, "h3", "", element.taskTitle, []);
  createCustomElements(mainDiv2, "span", "", element.taskType, []);
  createCustomElements(mainDiv2, "p", "", element.taskContent, []);
  btn1 = createCustomElements(
    mainDiv2,
    "button",
    "btn btn-danger mx-2",
    "delete",
    []
  );
  btn1.addEventListener("click", function (e) {
    deletebtn(element.ind, e);
  });
  btn2 = createCustomElements(
    mainDiv2,
    "button",
    "btn btn-warning mx-2",
    "edit",
    []
  );
  btn2.addEventListener("click", function (e) {
    editTask(e, element);
  });
  btn3 = createCustomElements(
    mainDiv2,
    "button",
    "btn btn-primary mx-2",
    "change status",
    []
  );
  btn3.addEventListener("click", function (e) {
    changeStatus(i);
  });
};

showAllTasks = () => {
  p.innerHTML = "";
  tasks.forEach((element, i) => {
    showSingleTask(element, i);
  });
};
getAllTasks();
showAllTasks();
saveAllTasks = () => {
  console.log("from save");
  console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
deletebtn = (ind, e) => {
  e.target.parentNode.parentNode.remove();
  tasks = tasks.filter((el) => el.ind != ind);
  saveAllTasks(tasks);
};

addTask = (task) => {
  tasks.length == 0
    ? (task.ind = 0)
    : (task.ind = tasks[tasks.length - 1].ind + 1);
  tasks.push(task);
  saveAllTasks();
  myAddForm.reset();
  toggleForm();
  showSingleTask(task, tasks.length - 1);
};

editTask = (e, element) => {
  let parentNode = e.target.parentNode;
  let header = parentNode.querySelector("h3").innerText;
  let type = parentNode.querySelector("span").innerText;
  let paragraph = parentNode.querySelector("p").innerText;
  let editButton = parentNode.getElementsByTagName("button")[1];

  if (form_div.getElementsByTagName("input")[0].value == "") {
    if (editButton.innerText == "edit") {
      editButton.innerText = "close";
      form_div.getElementsByTagName("input")[0].value = header;
      form_div.getElementsByTagName("textarea")[0].value = paragraph;
      form_div.getElementsByTagName("select")[0].value = type;
      form_div.getElementsByTagName("input")[1].value = form_div
        .querySelector("#addTask")
        .classList.add("d-none");
      const saveChanges = createCustomElements(
        form_div,
        "button",
        "btn btn-success mx-2",
        "Save Changes",
        []
      );
      saveChanges.addEventListener("click", (e) => {});
      const ignoreEdit = createCustomElements(
        form_div,
        "button",
        "btn btn-danger mx-2",
        "Ignore Edit",
        []
      );
      ignoreEdit.addEventListener("click", () => {
        editButton.innerText = "edit";
        ignoreIdet();
      });
      toggleForm();
    }
  } else if (editButton.textContent == "close") {
    editButton.innerText = "edit";
    ignoreIdet();
  }
};

function ignoreIdet() {
  form_div.getElementsByTagName("input")[0].value = "";
  form_div.getElementsByTagName("textarea")[0].value = "";
  form_div.getElementsByTagName("select")[0].value = "";
  form_div.querySelector("#addTask").classList.remove("d-none");
  form_div.querySelector(".btn-success").remove();
  form_div.querySelector(".btn-danger").remove();
  toggleForm();
}

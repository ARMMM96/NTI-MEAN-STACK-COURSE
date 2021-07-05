let formHeads = [
  "taskTitle",
  "taskType",
  "taskContent",
  "startDate",
  "dueDate",
];
showHide.addEventListener("click", toggleForm);

function toggleForm() {
  form_div.classList.toggle("d-none");
  this.textContent == "Show"
    ? (this.textContent = "Hide")
    : (this.textContent = "Show");
}

myAddForm.addEventListener("submit", submintTask);

function submintTask(e) {
  e.preventDefault();
  let task = { status: false };
  formHeads.forEach((h) => {
    task[h] = this.elements[h].value;
  });
  console.log(task);
  addTask(task);
}

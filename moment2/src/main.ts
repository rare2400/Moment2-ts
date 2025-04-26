/**
 * Moment 2 Laboration To Do-list
 * Av Ramona Reinholdz
 */

//importerar todolist och css-fil
import { ToDoList } from "./todolist";
import "./css/style.css";

//använder klassen ToDoList
const todoList = new ToDoList();

//hämtar element från DOM
const form = document.getElementById("todo-form") as HTMLFormElement;
const taskInput = document.getElementById("task") as HTMLInputElement;
const priorityInput = document.getElementById("priority") as HTMLSelectElement;
const todoUl = document.getElementById("todo-list") as HTMLUListElement;
const errMessage = document.getElementById("error") as HTMLParagraphElement;

//Funktion för att rendera todos i listan
function renderToDos(): void {
  //Rensa listan innan rendering
  todoUl.innerHTML = "";

  //Hämta todos från todoList
  const toDos = todoList.getToDos();

  //Om inga todos finns, visa meddelande
  toDos.forEach((todo, index) => {
    const li = document.createElement("li");

    const liTask = document.createElement("span");
    liTask.textContent = `${todo.task} - Prioritet: ${todo.priority}`;
    if (todo.completed) {
      liTask.style.textDecoration = "line-through";
    }
    const completeButton = document.createElement("button");
    completeButton.textContent = 'Klar';
    completeButton.classList.add('complete-btn');
    completeButton.onclick = () => {
      todoList.markTodoCompleted(index);
      renderToDos();
    };

    li.appendChild(liTask);
    li.appendChild(completeButton);
    todoUl.appendChild(li);
  });

}

//Eventlyssnare för formuläret
form.addEventListener("submit", (event) => {
  event.preventDefault();

  //Hämta värden från formuläret
  const task = taskInput.value;
  const priority = parseInt(priorityInput.value);

  //lägger till todo via klassen
  const correctInput = todoList.addToDo(task, priority)

  //validera inmatning i formuläret
  if (correctInput) {
    //rendera todo-lista, nollställ formulär och rensa eventuellt felmeddelande
    renderToDos();
    form.reset();
    errMessage.textContent = "";
  } else {
    //felmeddelanden vid fel inmatning
    if (task === "" && (priority <= 1 || priority >= 3)) {
      errMessage.textContent = "Fyll i uppgift och prioritet!";
    } else if (task === "") {
      errMessage.textContent = "Fyll i vad du vill göra!";
    } else if (priority <= 1 || priority >= 3) {
      errMessage.textContent = "Välj prioritet från hög till låg!";
    }
  }
});

//Initial rendering of todos
renderToDos();
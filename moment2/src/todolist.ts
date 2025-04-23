/**
 * Moment 2 Laboration To Do-list
 * Av Ramona Reinholdz
 */

//interface för ToDo med uppgift, status (klar/inte klar) och prioritet
export interface ToDo {
  task: string;
  completed: boolean;
  priority: number;
}

//klass för todo-listan
export class ToDoList {
  //privat array för todos
  private toDos: ToDo[] = [];

  //konstruktor som laddar in localStorage
  constructor() {
    this.loadFromLocalStorage();
  }

  //lägg till todo i listan
  addToDo(task: string, priority: number): boolean {
    //Kontrollera uppgifts-input
    if(task === "") {
      console.error("Fyll i uppgift!");
      return false;
    }

    //Kontroll av priotiets-input
    if(priority < 1 || priority > 3) {
      console.error("Du måste välja prioritet!");
      return false;
    }

    //kontrollerar todon
    const newToDo: ToDo = {
      task: task,
      completed: false,
      priority: priority
    };


    //Lägger till todo-objektet, sparar till localStorage och returnerar true
    this.toDos.push(newToDo);
    this.saveToLocalStorage();
    return true;
  }


  //Markera todo som klar
  markTodoCompleted(todoIndex: number): void {
    if (todoIndex >= 0 && todoIndex < this.toDos.length) {
      //markera todo som färdig
      this.toDos[todoIndex].completed = true;
      this.saveToLocalStorage();
    } else {
      console.error("Fel index");
    }
  }

  //returnera listan av todos
  getToDos(): ToDo[] {
    return this.toDos;
  }

  //sparar listan till localStorage
  saveToLocalStorage(): void {
    localStorage.setItem("toDos", JSON.stringify(this.toDos));
  }

  //laddar listan från localStorage
  loadFromLocalStorage(): void {
    const savedToDos = localStorage.getItem("toDos");
    if (savedToDos) {
      this.toDos = JSON.parse(savedToDos);
    }
  }
}
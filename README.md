# Moment 2 - TypeScript
Av Ramona Reinholdz

Detta är en enkel "att-göra"-applikation där användaren kan:

- Lägga till ny "att göra"
- Tilldela prioritet till varje uppgift (hög till låg/1 till 3)
- Se tillagda uppgifter i en lista
- Markera "att göra" som klara
- Spara listan i webbläsarens LocalStorage
- Rensa hela listan när alla uppgifter är klara

## Verktyg

- **TypeScript** – struktur med interface, object och funktioner
- **HTML/CSS** – layout och utseende
- **LocalStorage** – lagring i webbläsaren
- **Vite** – automatiserad utveklingsmiljö

## Funktionalitet

### todolist.ts - interface & klass
Interfacet `ToDo` definierar strukturen för varje "att göra":
```ts
export interface ToDo {
  task: string;
  completed: boolean;
  priority: number;
}
```

`ToDoList`-klassen innehåller funktioner som behövs för att göra en "att göra"-lista:
```ts
addToDo(task, priority) // Lägger till ny "att göra" med validering

markTodoCompleted(index) // Markerar en uppgift som avklarad

getToDos() // Returnerar listan av uppgifter

saveToLocalStorage() // Sparar listan till LocalStorage

loadFromLocalStorage() // Laddar "att göra"-listan från LocalStorage vid sidladdning

clearAll() // Rensar hela listan (även i LocalStorage)
```

### main.ts - DOM-hantering
Använder eventlyssnare och DOM-manipulation tillsammans med klassen från `ToDoList` för att
skriva ut "att göra" listan på webbsidan, `main.ts` gör detta:
- Läser in formulärdata och validerar innan uppgift läggs till
- Ger utskrivet felmeddelande om input i formuläret är ogiltigt
- Renderar "att göra"-listan vid varje ändring
- Visar "Klar"-knappar och en "Rensa"-knapp när allt är avklarat

#### Validering
Kontrollerar input och option i select-elementet, är något värde ogiltigt skrivs ett felmeddelande ut i DOM.

```ts
  if (correctInput) {
    renderToDos();
    form.reset();
    errMessage.textContent = "";
  } else {
    if (task === "" && (priority <= 1 || priority >= 3)) {
      errMessage.textContent = "Fyll i uppgift och prioritet!";
    } else if (task === "") {
      errMessage.textContent = "Fyll i vad du vill göra!";
    } else if (priority <= 1 || priority >= 3) {
      errMessage.textContent = "Välj prioritet från hög till låg!";
    }
  }
```



## Installera projekt
1. Klona projekt:
```
Git clone https://github.com/rare2400/Moment1.2-TypeScript.git
```

2. Installera paket:
```
npm install
```

3. Starta utvecklingsserver:
```
npm run dev
```

4. Öppna [http://localhost:5173/](http://localhost:5173/) i webbläsaren

5. Bygg projekt
```
npm run build
```

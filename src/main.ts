import counter$ from "./@counter";
import editShowToggle$ from "./@edit-show-toggle";

const app = document.getElementById("app");

const counterOne$ = counter$({ initialCount: 0 });
const counterTwo$ = counter$({ initialCount: 100 });

const editShowToggleOne$ = editShowToggle$();
const editShowToggleTwo$ = editShowToggle$();

app?.replaceChildren(
  counterOne$,
  counterTwo$,
  editShowToggleOne$,
  editShowToggleTwo$
);

export default app;

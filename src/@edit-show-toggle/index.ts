import { handleMessage, Message, message, State } from "./@model";
import createEdit$ from "./@edit";
import createShowFragment$ from "./@show";

export default function create$() {
  const it$ = document.createElement("div");
  let edit$ = document.createTextNode("");
  let show$ = document.createTextNode("");
  it$.replaceChildren(edit$, show$);

  // render with initial state
  const initialState: State = { type: "edit", value: "" };
  let mostRecentState: State = initialState;
  let updateEditValue: (value: string) => void;
  const renderEdit$ = (value: string) => {
    const { it$: edit$, updateValue } = createEdit$({
      value,
      handleSave: () => dispatch(message.toShow()),
      handleValueUpdate: (newValue) => dispatch(message.updateValue(newValue)),
    });
    it$.replaceChildren(edit$);
    updateEditValue = updateValue;
  };
  const renderShow$ = (value: string) => {
    const show$ = createShowFragment$({
      value,
      handleEdit: () => dispatch(message.toEdit()),
    });
    it$.replaceChildren(show$);
  };
  render(initialState);

  // render with state
  const dispatch = (message: Message) => {
    const newState = handleMessage(message, mostRecentState);
    mostRecentState = newState;

    console.log(message, newState);
    switch (message.type) {
      case "update value": {
        updateEditValue(message.value);
        break;
      }
      default: {
        render(newState);
        break;
      }
    }
  };

  function render(newState: State) {
    const editShowToggle$ = it$;
    switch (newState.type) {
      case "edit": {
        renderEdit$(newState.value);
        return;
      }
      case "show": {
        renderShow$(newState.value);
        return;
      }
    }
  }

  return it$;
}

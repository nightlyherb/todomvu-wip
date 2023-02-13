import { handleMessage, Message, message, State } from "./@model";
import createEdit$ from "./@edit";
import createShow$ from "./@show";

export default function create$() {
  const it$ = document.createElement("div");

  // render methods
  let renderEditValue$: (value: string) => void;
  const renderEdit$ = (value: string) => {
    const { it$: edit$, updateValue } = createEdit$({
      value,
      handleSave: () => dispatch(message.toShow()),
      handleValueUpdate: (newValue) => dispatch(message.updateValue(newValue)),
    });
    it$.replaceChildren(edit$);
    renderEditValue$ = updateValue;
  };

  const renderShow$ = (value: string) => {
    const show$ = createShow$({
      value,
      handleEdit: () => dispatch(message.toEdit()),
    });
    it$.replaceChildren(show$);
  };

  // initial render
  const initialState: State = { type: "edit", value: "" };
  renderEdit$(initialState.value);

  // state updates
  let mostRecentState: State = initialState;

  // render with state
  const dispatch = (message: Message) => {
    const newState = handleMessage(message, mostRecentState);
    mostRecentState = newState;

    switch (message.type) {
      case "update value": {
        renderEditValue$(message.value);
        break;
      }
      case "change to edit state": {
        renderEdit$(newState.value);
        return;
      }
      case "change to show state": {
        renderShow$(newState.value);
        return;
      }
    }
  };

  return it$;
}

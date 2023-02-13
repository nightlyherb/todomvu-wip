export default function create$(props: {
  value: string;
  handleSave: () => void;
  handleValueUpdate: (newValue: string) => void;
}) {
  const input$ = document.createElement("input");
  input$.oninput = (event) => {
    if (event.currentTarget == null) {
      return;
    }
    const value = (event.currentTarget as HTMLInputElement).value;
    props.handleValueUpdate(value);
  };

  const updateValue = (value: string) => {
    input$.value = value;
  };
  updateValue(props.value);

  const save$ = document.createElement("button");
  save$.textContent = "Save";
  save$.onclick = props.handleSave;

  const it$ = document.createDocumentFragment();
  it$.replaceChildren(save$, input$);

  return {
    it$,
    updateValue,
  };
}

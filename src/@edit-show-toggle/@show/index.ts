export default function create$(props: {
  value: string;
  handleEdit: () => void;
}) {
  const value$ = document.createElement("span");
  value$.textContent = props.value;

  const edit$ = document.createElement("button");
  edit$.textContent = "Edit";
  edit$.onclick = props.handleEdit;

  const it$ = document.createDocumentFragment();
  it$.replaceChildren(value$, edit$);
  return it$;
}

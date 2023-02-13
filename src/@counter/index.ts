import { getNextState, Message, message, State, state } from "./@model";

export default function create$(props: { initialCount: number }) {
  const increment$ = document.createElement("button");
  increment$.textContent = "+";
  increment$.onclick = () => dispatch(message.increment());

  const decrement$ = document.createElement("button");
  decrement$.textContent = "-";
  decrement$.onclick = () => dispatch(message.decrement());

  let value$ = createValue$(props.initialCount);

  const counter$ = document.createElement("div");
  counter$.replaceChildren(decrement$, value$, increment$);

  // invariant: lastState keeps the latest state
  let lastState = state.value(props.initialCount);
  function dispatch(message: Message): void {
    const newState = getNextState(message, lastState);
    updateView(message, newState);
    // invariant: lastState keeps the latest state
    lastState = newState;
  }

  // invariant: value$ keeps the latest value
  function updateView(_message: Message, newState: State) {
    const newValue$ = createValue$(newState.value);
    counter$.replaceChildren(decrement$, newValue$, increment$);
    // invariant: value$ keeps the latest value
    value$ = newValue$;
  }
  return counter$;
}

function createValue$(value: number) {
  const value$ = document.createElement("span");
  value$.textContent = String(value);
  return value$;
}

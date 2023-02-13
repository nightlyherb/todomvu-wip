export const message = {
  increment() {
    return { type: "increment" } as const;
  },
  decrement() {
    return { type: "decrement" } as const;
  },
};

export type Message = ReturnType<typeof message[keyof typeof message]>;

export const state = {
  value(value: number) {
    return { value };
  },
};

export type State = ReturnType<typeof state[keyof typeof state]>;

const increment = (oldState: State) => state.value(oldState.value + 1);
const decrement = (oldState: State) => state.value(oldState.value - 1);

export function getNextState(message: Message, oldState: State): State {
  switch (message.type) {
    case "increment":
      return increment(oldState);
    case "decrement":
      return decrement(oldState);
  }
}

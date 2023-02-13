export const state = {
  edit(value: string) {
    return { type: "edit", value } as const;
  },
  show(value: string) {
    return { type: "show", value } as const;
  },
};
export type State = ReturnType<typeof state[keyof typeof state]>;

export const message = {
  updateValue(newValue: string) {
    return { type: "update value", value: newValue } as const;
  },
  toEdit() {
    return { type: "change to edit state" } as const;
  },
  toShow() {
    return { type: "change to show state" } as const;
  },
};
export type Message = ReturnType<typeof message[keyof typeof message]>;

export function handleMessage(message: Message, oldState: State): State {
  switch (message.type) {
    case "change to edit state": {
      return state.edit(oldState.value);
    }
    case "change to show state": {
      return state.show(oldState.value);
    }
    case "update value": {
      return { ...oldState, value: message.value };
    }
  }
}

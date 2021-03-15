const TURN_INIT = "TURN_INIT" as const;
const TURN_NEXT = "TURN_NEXT" as const;
const TURN_END_GAME = "TURN_END_GAME" as const;

export const initTurn = () => {
  return {
    type: TURN_INIT,
  };
};

export const nextTurn = () => {
  return {
    type: TURN_NEXT,
  };
};

export const endTurn = () => {
  return {
    type: TURN_END_GAME,
  };
};

const INITIAL_STATE: number = 0;

export const turnReducer = (state: number = INITIAL_STATE, action: { type: string }) => {
  switch (action.type) {
    case TURN_INIT:
      return 1;
    case TURN_NEXT:
      return state === 1 ? 2 : 1;
    case TURN_END_GAME:
      return 0;
    default:
      return state;
  }
};

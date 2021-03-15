import { Ibingo, Ibingocell, Ibingoplayer } from "interfaces/index";
import { shuffleArray, convertTo2d } from "utils/array";
import { BINGO_ANSWER } from "constants/index";

const BINGO_SELECT_NUMBER = "BINGO_SELECT_NUMBER" as const;
const BINGO_START_GAME = "BINGO_START_GAME" as const;
const BINGO_END_GAME = "BINGO_END_GAME" as const;

export const selectNumber = (number: number) => {
  return {
    type: BINGO_SELECT_NUMBER,
    payload: number,
  };
};

export const startGame = () => {
  return {
    type: BINGO_START_GAME,
  };
};

export const endGame = () => {
  return {
    type: BINGO_END_GAME,
  };
};

const initialStateGenerator = (): Ibingo => {
  return {
    1: {
      isTurn: false,
      board: Array.from(new Array(5), () => new Array(5).fill(null)),
      completed: [],
    },
    2: {
      isTurn: false,
      board: Array.from(new Array(5), () => new Array(5).fill(null)),
      completed: [],
    },
  };
};

const getNewbingoPlayer = (player: Ibingoplayer, newnumber: number): Ibingoplayer => {
  const isTurn = !player.isTurn;
  const board = player.board.slice();
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j]!.num === newnumber) board[i][j]!.isSelected = true;
    }
  }
  const completed = [...player.completed];
  const flatted = board.flatMap((val: Ibingocell[] | null[]) => val);
  for (let i = 0; i < BINGO_ANSWER.indexes.length; i++) {
    if (completed.includes(i)) continue;
    const cells = BINGO_ANSWER.indexes[i].map((index) => flatted[index]);
    if (cells.every((cell) => cell?.isSelected)) completed.push(i);
  }

  return { isTurn, board, completed };
};

const INITIAL_STATE: Ibingo = initialStateGenerator();

export const bingoReducer = (state: Ibingo = INITIAL_STATE, action: { type: string; payload?: number }) => {
  switch (action.type) {
    case BINGO_SELECT_NUMBER:
      const newBingostate = { ...state };
      for (let i = 1; i <= 2; i++) {
        newBingostate[i] = getNewbingoPlayer(state[i], action.payload as number);
      }
      return newBingostate;
    case BINGO_START_GAME:
      const bingoNumbers = Array.from(new Array(25), (_, i: number) => i + 1);
      const newState: Ibingo = initialStateGenerator();
      for (let player = 1; player <= 2; player++) {
        const shuffled = shuffleArray(bingoNumbers);
        const bingoCells = shuffled.map((num: number) => {
          return { num, isSelected: false };
        });
        const converted = convertTo2d(bingoCells, 5);
        newState[player].board = converted;
        newState[player].completed = [];
        newState[player].isTurn = player === 1;
      }
      return newState as Ibingo;
    case BINGO_END_GAME:
      return INITIAL_STATE;
    default:
      return state;
  }
};

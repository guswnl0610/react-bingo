import { Ibingo } from "interfaces/index";
import { shuffleArray, convertTo2d } from "utils/array";

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

const INITIAL_STATE: Ibingo = {
  1: Array.from(new Array(5), () => new Array(5).fill(null)),
  2: Array.from(new Array(5), () => new Array(5).fill(null)),
};

export const bingoReducer = (state: Ibingo = INITIAL_STATE, action: { type: string; payload?: number }) => {
  switch (action.type) {
    case BINGO_SELECT_NUMBER:
      const new1pBingoBoard = [...state[1]];
      const new2pBingoBoard = [...state[2]];
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (new1pBingoBoard[i][j]!.num === action.payload) new1pBingoBoard[i][j]!.isSelected = true;
          if (new2pBingoBoard[i][j]!.num === action.payload) new2pBingoBoard[i][j]!.isSelected = true;
        }
      }
      return { 1: new1pBingoBoard, 2: new2pBingoBoard };
    case BINGO_START_GAME:
      const bingoNumbers = Array.from(new Array(25), (_, i: number) => i + 1);
      const newState = {} as Ibingo;
      for (let player = 1; player <= 2; player++) {
        const shuffled = shuffleArray(bingoNumbers);
        const bingoCells = shuffled.map((num: number) => {
          return { num, isSelected: false };
        });
        const converted = convertTo2d(bingoCells, 5);
        newState[player] = converted;
      }
      return newState;
    case BINGO_END_GAME:
      return INITIAL_STATE;
    default:
      return state;
  }
};

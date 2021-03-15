export interface Ibingo {
  [k: string]: Ibingoplayer;
  1: Ibingoplayer;
  2: Ibingoplayer;
}

export interface Ibingoplayer {
  isTurn: boolean;
  board: null[][] | Ibingocell[][];
  completed: number[];
}

export interface Ibingocell {
  num: number;
  isSelected: boolean;
}

export interface Ibingo {
  [k: string]: null[][] | Ibingocell[][];
  1: null[][] | Ibingocell[][];
  2: null[][] | Ibingocell[][];
}

export interface Ibingocell {
  num: number;
  isSelected: boolean;
}

export const shuffleArray = <T>([...arr]: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const convertTo2d = <T>([...arr]: T[], size: number): T[][] => {
  const newArr = Array.from(new Array(size), () => new Array(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      newArr[i][j] = arr[i * size + j];
    }
  }
  return newArr;
};

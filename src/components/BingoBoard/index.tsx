import React, { memo } from "react";
import styled from "styled-components";
import BingoCell from "components/BingoCell";
import { Ibingocell } from "interfaces";
import { BINGO_ANSWER } from "constants/index";

interface IBingoBoard {
  board: Ibingocell[][] | null[][];
  player: string;
  completed: number[];
}

interface Ipaintedcell extends Ibingocell {
  isCompleted?: boolean;
}

function BingoBoard({ board, player, completed }: IBingoBoard) {
  const paintCompletedLines = (_board: Ibingocell[][] | null[][]) => {
    const flatted: (Ipaintedcell | null)[] = _board.flatMap((val: Ibingocell[] | null[]) => val);
    if (!flatted[0]) return flatted;
    completed.forEach((completedLineidx: number) => {
      BINGO_ANSWER.indexes[completedLineidx].forEach((idx) => {
        flatted[idx]!.isCompleted = true;
      });
    });
    return flatted;
  };

  return (
    <BingoBoardWrapper>
      {paintCompletedLines(board).map((cell, idx) => (
        <BingoCell key={idx} cell={cell} player={player} isCompleted={!!cell?.isCompleted} />
      ))}
    </BingoBoardWrapper>
  );
}

const BingoBoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 7rem);
  grid-template-rows: repeat(5, 7rem);
  margin: 1rem 3rem;
`;

export default memo(BingoBoard);

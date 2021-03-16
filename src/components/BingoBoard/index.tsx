import React, { memo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "store";
import BingoCell from "components/BingoCell";
import { Ibingocell } from "interfaces";
import { BINGO_ANSWER } from "constants/index";

interface IBingoBoard {
  player: string;
}

interface Ipaintedcell extends Ibingocell {
  isCompleted?: boolean;
}

function BingoBoard({ player }: IBingoBoard) {
  const bingoStatus = useSelector((state: RootState) => state.bingoReducer);

  const paintCompletedLines = (_board: Ibingocell[][] | null[][], _completed: number[]) => {
    const flatted: (Ipaintedcell | null)[] = _board.flatMap((val: Ibingocell[] | null[]) => val);
    if (!flatted[0]) return flatted;
    _completed.forEach((completedLineidx: number) => {
      BINGO_ANSWER.indexes[completedLineidx].forEach((idx) => {
        flatted[idx]!.isCompleted = true;
      });
    });
    return flatted;
  };

  return (
    <BingoBoardWrapper>
      {paintCompletedLines(bingoStatus[player].board, bingoStatus[player].completed).map((cell, idx) => (
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

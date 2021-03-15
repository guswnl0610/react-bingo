import React, { memo } from "react";
import styled from "styled-components";
import BingoCell from "components/BingoCell";
import { Ibingocell } from "interfaces";

interface IBingoBoard {
  board: Ibingocell[][] | null[][];
  player: string;
  onCellClick: (player: string, cell: Ibingocell | null) => void;
}

function BingoBoard({ board, player, onCellClick }: IBingoBoard) {
  return (
    <BingoBoardWrapper>
      {board.map((cellrow: Ibingocell[] | null[]) =>
        cellrow.map((cell: Ibingocell | null, idx: number) => {
          return <BingoCell key={idx} cell={cell} player={player} onCellClick={onCellClick} />;
        })
      )}
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

import React, { memo } from "react";
import styled from "styled-components";
import { Ibingocell } from "interfaces";

interface IBingoCell {
  cell: Ibingocell | null;
  player: string;
  onCellClick: (player: string, cell: Ibingocell | null) => void;
}

function BingoCell({ cell, player, onCellClick }: IBingoCell) {
  return (
    <BingoCellButton onClick={() => onCellClick(player, cell)} isSelected={cell ? cell.isSelected : false}>
      {cell ? cell.num : ""}
    </BingoCellButton>
  );
}

const BingoCellButton = styled.button<{ isSelected: boolean }>`
  border: 1px solid ${({ theme }) => theme.gray};
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.gray : "white")};
`;

export default memo(BingoCell);

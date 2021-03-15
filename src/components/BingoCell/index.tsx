import React, { memo } from "react";
import styled from "styled-components";
import { Ibingocell } from "interfaces";

interface IBingoCell {
  cell: Ibingocell | null;
  player: string;
  onCellClick: (player: string, cell: Ibingocell | null) => void;
  isCompleted: boolean;
}

function BingoCell({ cell, player, onCellClick, isCompleted }: IBingoCell) {
  return (
    <BingoCellButton
      onClick={() => onCellClick(player, cell)}
      isSelected={cell ? cell.isSelected : false}
      isCompleted={isCompleted}>
      {cell ? cell.num : ""}
    </BingoCellButton>
  );
}

const BingoCellButton = styled.button<{ isSelected: boolean; isCompleted: boolean }>`
  border: 1px solid ${({ theme }) => theme.gray};
  background-color: ${({ theme, isSelected, isCompleted }) => {
    if (isCompleted) return theme.primary_light;
    return isSelected ? theme.gray : "white";
  }};
`;

export default memo(BingoCell);

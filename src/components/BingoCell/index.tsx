import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Ibingocell, Ibingo } from "interfaces";
import { selectNumber } from "store/bingo";
import { RootState } from "store";

interface IBingoCell {
  cell: Ibingocell | null;
  player: string;
  isCompleted: boolean;
}

function BingoCell({ cell, player, isCompleted }: IBingoCell) {
  const bingoStatus: Ibingo = useSelector((state: RootState) => state.bingoReducer);
  const dispatch = useDispatch();

  const handleCellClick = () => {
    if (!cell || cell.isSelected) return;
    if (bingoStatus.turn !== Number(player)) return alert("잘못된 차례입니다");
    dispatch(selectNumber(cell.num));
  };

  return (
    <BingoCellButton onClick={handleCellClick} isSelected={cell ? cell.isSelected : false} isCompleted={isCompleted}>
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

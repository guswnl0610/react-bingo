import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Ibingocell } from "interfaces";
import { nextTurn } from "store/turn";
import { selectNumber } from "store/bingo";
import { RootState } from "store";

interface IBingoCell {
  cell: Ibingocell | null;
  player: string;
  isCompleted: boolean;
}

function BingoCell({ cell, player, isCompleted }: IBingoCell) {
  const turn = useSelector((state: RootState) => state.turnReducer);
  const dispatch = useDispatch();

  const handleCellClick = () => {
    if (!cell || cell.isSelected) return;
    if (turn !== Number(player)) return alert("잘못된 차례입니다");
    dispatch(selectNumber(cell.num));
    dispatch(nextTurn());
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

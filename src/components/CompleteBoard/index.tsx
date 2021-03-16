import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BINGO_ANSWER } from "constants/index";

interface ICompleteBoard {
  player: string;
}

function CompleteBoard({ player }: ICompleteBoard) {
  const bingoStatus = useSelector((state: RootState) => state.bingoReducer);

  const getCompletedLabels = useCallback((_completed: number[]): string[] => {
    return _completed.map((index) => BINGO_ANSWER.labels[index]);
  }, []);

  return (
    <>
      {getCompletedLabels(bingoStatus[player].completed).map((label, idx) => (
        <CompletedLine key={idx}>{label}</CompletedLine>
      ))}
    </>
  );
}

const CompletedLine = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
`;

export default memo(CompleteBoard);

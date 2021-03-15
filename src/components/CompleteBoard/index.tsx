import React, { memo } from "react";
import styled from "styled-components";

interface ICompleteBoard {
  labels: string[];
}

function CompleteBoard({ labels }: ICompleteBoard) {
  return (
    <>
      {labels.map((label, idx) => (
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

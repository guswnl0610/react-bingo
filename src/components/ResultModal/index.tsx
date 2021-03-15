import React, { memo } from "react";
import styled from "styled-components";

interface IResultModal {
  winner: number;
  onConfirmClick: () => void;
}

function ResultModal({ winner, onConfirmClick }: IResultModal) {
  return (
    <ResultModalBackground>
      <ResultModalWrapper>
        {winner <= 2 ? `${winner}P가 빙고를 완성했습니다` : `무승부입니다`}
        <ConfirmButton onClick={onConfirmClick}>확인</ConfirmButton>
      </ResultModalWrapper>
    </ResultModalBackground>
  );
}

const ResultModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ResultModalWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background-color: white;
  border-radius: 2rem;
  font-size: 2rem;
`;

const ConfirmButton = styled.button`
  padding: 0.8rem 1.5rem;
  margin-top: 2rem;
`;

export default memo(ResultModal);

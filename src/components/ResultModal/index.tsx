import React from "react";
import styled from "styled-components";

function ResultModal() {
  return <ResultModalBackground></ResultModalBackground>;
}

const ResultModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

export default ResultModal;

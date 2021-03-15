import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import BingoBoard from "components/BingoBoard";
import CompleteBoard from "components/CompleteBoard";
import ResultModal from "components/ResultModal";
import { startGame, endGame } from "store/bingo";
import { Ibingo, Ibingocell } from "interfaces";
import { RootState } from "store";
import { BINGO_ANSWER } from "constants/index";

function App() {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [winner, setWinner] = useState<number>(0);
  const bingoStatus: Ibingo = useSelector((state: RootState) => state.bingoReducer);
  const dispatch = useDispatch();

  const handleStartClick = useCallback(() => {
    dispatch(startGame());
    setIsGameStarted(true);
  }, []);

  const getCompletedLabels = useCallback((_completed: number[]): string[] => {
    return _completed.map((index) => BINGO_ANSWER.labels[index]);
  }, []);

  const resetGame = useCallback(() => {
    dispatch(endGame());
    setIsGameStarted(false);
    setWinner(0);
  }, []);

  useEffect(() => {
    if (!isGameStarted) return;
    const completed1p = bingoStatus[1].completed.length;
    const completed2p = bingoStatus[2].completed.length;
    if (!(completed1p >= 5 || completed2p >= 5)) return;
    if (completed1p >= 5 && completed2p >= 5) setWinner(3);
    else if (completed1p < completed2p) setWinner(2);
    else setWinner(1);
  }, [bingoStatus]);

  return (
    <FlexColWrapper>
      <GameStartButton onClick={handleStartClick}>{isGameStarted ? "게임 재시작" : "게임 시작"}</GameStartButton>
      <BoardWrapper>
        {Object.keys(bingoStatus).map((player) => (
          <FlexColWrapper key={player}>
            <PlayerIdentifier currentTurn={bingoStatus[player].isTurn}>{player}P</PlayerIdentifier>
            <BingoBoard
              board={bingoStatus[player].board as null[][] | Ibingocell[][]}
              player={player}
              completed={bingoStatus[player].completed}
            />
            <CompleteBoard labels={getCompletedLabels(bingoStatus[player].completed)} />
          </FlexColWrapper>
        ))}
      </BoardWrapper>
      {!!winner && <ResultModal winner={winner} onConfirmClick={resetGame} />}
    </FlexColWrapper>
  );
}

const FlexColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameStartButton = styled.button`
  padding: 1rem 1.2rem;
`;

const PlayerIdentifier = styled.h2<{ currentTurn: boolean }>`
  color: ${({ currentTurn, theme }) => (currentTurn ? theme.primary : theme.darkgray)};
`;

const BoardWrapper = styled.main`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

export default App;

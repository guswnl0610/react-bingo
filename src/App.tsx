import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import BingoBoard from "components/BingoBoard";
import CompleteBoard from "components/CompleteBoard";
import ResultModal from "components/ResultModal";
import { startGame, selectNumber, endGame } from "store/bingo";
import { Ibingo, Ibingocell } from "interfaces";
import { BINGO_ANSWER } from "constants/index";

interface Icompleted {
  [k: string]: number[];
  1: number[];
  2: number[];
}

function App() {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [winner, setWinner] = useState<number>(0);
  const [turn, setTurn] = useState<number>(0);
  const [completed, setCompleted] = useState<Icompleted>({ 1: [], 2: [] });
  const bingoStatus: Ibingo = useSelector((state: RootState) => state.bingoReducer);
  const dispatch = useDispatch();

  const handleStartClick = useCallback(() => {
    dispatch(startGame());
    setIsGameStarted(true);
    setTurn(1);
    setCompleted({ 1: [], 2: [] });
  }, []);

  const handleCellClick = useCallback(
    (player: string, cell: Ibingocell | null) => {
      if (!cell || cell.isSelected) return;
      if (Number(player) !== turn) return alert("잘못된 차례입니다");
      dispatch(selectNumber(cell.num));
      turn === 1 ? setTurn(2) : setTurn(1);
    },
    [turn]
  );

  const getNewCompleted = useCallback((board: Ibingocell[][], prevCompleted: number[]): number[] => {
    const newCompleted: number[] = [...prevCompleted];
    const flatted = board.flatMap((val) => val);
    for (let i = 0; i < BINGO_ANSWER.indexes.length; i++) {
      if (newCompleted.includes(i)) continue;
      const cells = BINGO_ANSWER.indexes[i].map((index) => flatted[index]);
      if (cells.every((cell) => cell.isSelected)) newCompleted.push(i);
    }
    return newCompleted;
  }, []);

  const getCompletedLabels = useCallback((_completed: number[]): string[] => {
    return _completed.map((index) => BINGO_ANSWER.labels[index]);
  }, []);

  const resetGame = useCallback(() => {
    dispatch(endGame());
    setCompleted({ 1: [], 2: [] });
    setIsGameStarted(false);
    setWinner(0);
    setTurn(0);
  }, []);

  useEffect(() => {
    if (!isGameStarted) return;
    const newCompleted: Icompleted = { 1: [], 2: [] };
    for (let player = 1; player <= 2; player++) {
      newCompleted[player] = getNewCompleted(bingoStatus[player] as Ibingocell[][], completed[player]);
    }
    setCompleted(newCompleted);
  }, [bingoStatus]);

  useEffect(() => {
    if (!(completed[1].length >= 5 || completed[2].length >= 5)) return;
    if (completed[1].length > completed[2].length) setWinner(1);
    else if (completed[1].length < completed[2].length) setWinner(2);
    else setWinner(3);
  }, [completed]);

  return (
    <FlexColWrapper>
      <GameStartButton onClick={handleStartClick}>{isGameStarted ? "게임 재시작" : "게임 시작"}</GameStartButton>
      <BoardWrapper>
        {Object.keys(bingoStatus).map((player) => (
          <FlexColWrapper key={player}>
            <PlayerIdentifier currentTurn={Number(player) === turn}>{player}P</PlayerIdentifier>
            <BingoBoard
              board={bingoStatus[player]}
              player={player}
              completed={completed[player]}
              onCellClick={handleCellClick}
            />
            <CompleteBoard labels={getCompletedLabels(completed[player])} />
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

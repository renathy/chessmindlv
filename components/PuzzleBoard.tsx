'use client';

import { Chess } from 'chess.js';
import { useMemo, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Puzzle } from '@/lib/types';

interface PuzzleBoardProps {
  puzzle: Puzzle;
}

export function PuzzleBoard({ puzzle }: PuzzleBoardProps) {
  const chess = useMemo(() => new Chess(puzzle.fen), [puzzle.fen]);
  const [fen, setFen] = useState(puzzle.fen);
  const [attempt, setAttempt] = useState<string[]>([]);
  const [message, setMessage] = useState('Make the best move.');

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = chess.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
    if (!move) {
      return false;
    }

    const playedUci = `${move.from}${move.to}${move.promotion ?? ''}`;
    const nextAttempt = [...attempt, playedUci];
    setAttempt(nextAttempt);
    setFen(chess.fen());

    const expected = puzzle.solution[nextAttempt.length - 1];
    if (playedUci !== expected) {
      setMessage(`Not best. Hint: ${puzzle.hint}`);
      return true;
    }

    if (nextAttempt.length === puzzle.solution.length) {
      setMessage('Correct! Puzzle solved.');
    } else {
      setMessage('Good move. Continue the line.');
    }

    return true;
  };

  const onReset = () => {
    setFen(puzzle.fen);
    setAttempt([]);
    setMessage('Make the best move.');
  };

  return (
    <article className="card">
      <h3>{puzzle.title}</h3>
      <Chessboard id={puzzle.id} position={fen} onPieceDrop={onDrop} />
      <p>{message}</p>
      <button className="btn btn-muted" onClick={onReset}>
        Reset puzzle
      </button>
    </article>
  );
}

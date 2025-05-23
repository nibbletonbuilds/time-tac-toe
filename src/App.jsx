import { useState } from "react";

function Square ({ value, squareOnClick }) {

	return (
		<button className="square"
				onClick={squareOnClick}
		>
			{ value }
		</button>
	);
}

function findWinner (squares) {

	// checking diagonals for a winnner:

	if (squares[0] && squares[0] == squares[4] && squares[4] == squares[8])	// main diagonal;
	{
		return squares[0];
	}
	if (squares[2] && squares[2] == squares[4] && squares[4] == squares[6])	// opposite diagonal;
	{
		return squares[2];
	}

	// checking rows and columns for a winner:
	
	let firstElement;

	// checking columns:
	for (let i = 0; i < 3; ++i)
	{
		firstElement = squares[i];
		if (firstElement == squares[i + 3] && firstElement == squares[i + 6])
		{
			if (firstElement)
			{
				return firstElement;
			}
		}
	}

	// checking rows:
	for (let i = 0; i < 9; i += 3)
	{
		firstElement = squares[i];
		if (firstElement == squares[i + 1] && firstElement == squares[i + 2])
		{
			if (firstElement)
			{
				return firstElement;
			}
		}
	}
	
	return null;	// when no winner;
} 

function Board() {

	const [crossIsNext, setCrossIsNext] = useState (true);
	const [squares, setSquares] = useState (Array (9).fill (null));

	function handleClick (i)
	{
		const isWinnerExistAlready = findWinner (squares);
		if (squares[i] || isWinnerExistAlready)
		{
			return ;
		}

		const nextSquares = squares.slice();

		nextSquares[i] = crossIsNext ? "X" : "O";

		setSquares (nextSquares);
		setCrossIsNext (!crossIsNext);
	}

	const winner = findWinner (squares);
	
	let status;
	if (winner)
	{
		status = "Winner: " + winner;
	}
	else
	{
		status = "Next player: " + crossIsNext;
	}

	return (
		<>
			<div className="board-row">
				<Square value={squares[0]} squareOnClick={() => handleClick(0)} />
				<Square value={squares[1]} squareOnClick={() => handleClick(1)} />
				<Square value={squares[2]} squareOnClick={() => handleClick(2)} />
			</div>

			<div className="board-row">
				<Square value={squares[3]} squareOnClick={() => handleClick(3)} />
				<Square value={squares[4]} squareOnClick={() => handleClick(4)} />
				<Square value={squares[5]} squareOnClick={() => handleClick(5)} />
			</div>

			<div className="board-row">
				<Square value={squares[6]} squareOnClick={() => handleClick(6)} />
				<Square value={squares[7]} squareOnClick={() => handleClick(7)} />
				<Square value={squares[8]} squareOnClick={() => handleClick(8)} />
			</div>
		</>
	);
}

export default Board;
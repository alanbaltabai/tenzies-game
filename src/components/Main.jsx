import Confetti from 'react-confetti';

import Die from './Die';

export default function Main(props) {
	const diceElements = props.dice.map((item) => (
		<Die
			key={item.id}
			value={item.value}
			isHeld={item.isHeld}
			holdDice={() => props.holdDice(item.id)}
		/>
	));

	return (
		<main className='main'>
			<h1 className='title'>Tenzies</h1>

			<p className='instructions'>
				{props.tenzies
					? `You won!`
					: `Click a die to hold its value. Roll until all dice are same.`}
			</p>

			<div className='dies'>{diceElements}</div>

			{props.tenzies ? (
				<button className='button' onClick={props.startNewGame}>
					New Game
				</button>
			) : (
				<button className='button' onClick={props.roll}>
					Roll
				</button>
			)}

			{props.tenzies && <Confetti width='560' height='560' />}
		</main>
	);
}
